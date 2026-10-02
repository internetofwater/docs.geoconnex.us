import React, { useEffect, useMemo, useRef, useState } from "react";
import Yasgui from "@zazuko/yasgui";
import "@zazuko/yasgui/build/yasgui.min.css";
import "leaflet/dist/leaflet.css";
import GeoPlugin from "yasgui-geo-tg";
import vocabCache from "./vocab.generated.json";
import {
  DEFAULT_QUERY,
  GEOCONNEX_PREFIXES,
  SPARQL_ENDPOINT,
  SPARQL_EXAMPLES,
  type SparqlExample,
} from "./constants";

let geoPluginRegistered = false;

function registerGeoPluginOnce() {
  if (geoPluginRegistered) return;
  geoPluginRegistered = true;
  Yasgui.Yasr.registerPlugin("geo", GeoPlugin);
}

let localVocabCompletersRegistered = false;

// YASQE's built-in "class"/"property" completers look up terms by calling
// out to lov.linkeddata.es (a public vocabulary registry) on every
// keystroke -- slow, sometimes errors outright, and doesn't know about
// Geoconnex-specific terms (hyf:, gsp:) anyway. Fork both completers to
// pull instead from vocab.generated.json: a local, offline snapshot of
// schema.org + HY_Features + GeoSPARQL class/property IRIs built by
// scripts/build-vocab-cache.js. Forking (rather than just overriding `get`)
// keeps the original completers' cursor-position/formatting logic intact.
function registerLocalVocabCompletersOnce() {
  if (localVocabCompletersRegistered) return;
  localVocabCompletersRegistered = true;

  // autoShow makes the suggestion list pop up as soon as the cursor is in a
  // valid spot (e.g. right after typing a prefix's ":"), instead of waiting
  // for an explicit keypress. That's only reasonable because lookups are now
  // a local, in-memory Trie search (see get() below) rather than a network
  // round-trip on every keystroke.
  //
  // dropExactMatch: once what's typed already matches a suggestion exactly
  // (e.g. the user has fully typed "gsp:asWKT"), don't keep listing that same
  // term as a "suggestion" -- only show it if there's something to add.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropExactMatch = (yasqeInstance: any, hints: { text: string }[]) => {
    const typed = yasqeInstance.getCompleteToken().string;
    return hints.filter((hint) => hint.text !== typed);
  };

  // Some real Geoconnex data uses a formally-declared *class* IRI as a
  // predicate in property paths (e.g. hyf:HY_IndirectPosition, in
  // `hyf:referencedPosition/hyf:HY_IndirectPosition/hyf:linearElement` --
  // millions of triples in the live graph actually use it that way). So the
  // "property" position completer offers classes too, not just formally
  // declared properties.
  const propertyCandidates = [...vocabCache.properties, ...vocabCache.classes];

  Yasgui.Yasqe.forkAutocompleter(
    "property",
    {
      name: "geoconnexProperty",
      bulk: true,
      autoShow: true,
      persistenceId: "geoconnexProperty",
      get: () => Promise.resolve(propertyCandidates),
      postprocessHints: dropExactMatch,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    false,
  );
  Yasgui.Yasqe.forkAutocompleter(
    "class",
    {
      name: "geoconnexClass",
      bulk: true,
      autoShow: true,
      persistenceId: "geoconnexClass",
      get: () => Promise.resolve(vocabCache.classes),
      postprocessHints: dropExactMatch,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    false,
  );
}

// yasgui-geo-tg reads `yasr.results.json`, a field @zazuko/yasr's Parser only
// exposes through its public getAsJson() method. Patch it onto each results
// object as soon as it's set (rather than forking the plugin) so it can find
// results the way it expects. This has to happen on YASR's "change" event,
// *before* its own first draw/plugin-compatibility pass -- patching
// afterwards (e.g. on Tab's "queryResponse") is too late to avoid an extra,
// duplicate render of the plugin selector bar.
function patchResultsForGeoPlugin(tab: ReturnType<Yasgui["getTab"]>) {
  tab?.getYasr()?.on("change", (yasr) => {
    const results = yasr.results as unknown as
      | { json?: unknown; getAsJson?: () => unknown }
      | undefined;
    if (results && results.json === undefined && typeof results.getAsJson === "function") {
      results.json = results.getAsJson();
    }
  });
}

// yasgui-geo-tg does try to fit the map to its results' bounds on draw, but
// since its Leaflet map is created inside a tab panel that's hidden (zero
// size) until you actually switch to the "Geo" tab, that first fit is
// computed against a stale/zero container size and ends up looking like it
// never happened -- you see the whole-world default view instead of your
// data. Redo the fit ourselves once the panel (and therefore the map
// container) is actually visible and has a real size.
function fitGeoMapOnDraw(tab: ReturnType<Yasgui["getTab"]>) {
  tab?.getYasr()?.on("drawn", (_yasr, plugin) => {
    const geoPlugin = plugin as unknown as {
      label?: string;
      map?: { invalidateSize: () => void; fitBounds: (bounds: unknown, opts: unknown) => void };
      lg?: { getBounds: () => { isValid: () => boolean } };
    };
    if (geoPlugin.label !== "Geo" || !geoPlugin.map || !geoPlugin.lg) return;

    setTimeout(() => {
      const bounds = geoPlugin.lg!.getBounds();
      geoPlugin.map!.invalidateSize();
      if (bounds.isValid()) {
        geoPlugin.map!.fitBounds(bounds, { padding: [20, 20], maxZoom: 14 });
      }
    }, 150);
  });
}

function groupByCategory(): Map<string, SparqlExample[]> {
  const groups = new Map<string, SparqlExample[]>();
  for (const example of SPARQL_EXAMPLES) {
    const list = groups.get(example.category) ?? [];
    list.push(example);
    groups.set(example.category, list);
  }
  return groups;
}

export default function SparqlQueryEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const yasguiRef = useRef<Yasgui | null>(null);
  const examplesByCategory = useMemo(groupByCategory, []);
  const [examplesOpen, setExamplesOpen] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    registerGeoPluginOnce();
    registerLocalVocabCompletersOnce();

    const yasgui = new Yasgui(containerRef.current, {
      requestConfig: { endpoint: SPARQL_ENDPOINT },
      yasr: { pluginOrder: ["table", "geo", "response"] },
      // Ctrl-Space (YASQE/CodeMirror's default autocomplete shortcut) is often
      // already claimed by the OS for input-language switching, so offer an
      // alternative key binding that always reaches the editor. CodeMirror
      // normalizes modifier order to "Shift-Ctrl-..." (matching its own
      // built-in bindings like Shift-Ctrl-K) -- "Ctrl-Shift-..." silently
      // never matches. (CodeMirror's own KeyMap type is too strict to
      // express this cleanly -- hence `any`.)
      yasqe: {
        extraKeys: {
          "Shift-Ctrl-Space": (cm: { autocomplete: () => void }) => cm.autocomplete(),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });
    yasguiRef.current = yasgui;

    const tab = yasgui.getTab() ?? yasgui.addTab(true);
    tab.setQuery(DEFAULT_QUERY);
    const yasqe = tab.getYasqe();
    yasqe.addPrefixes(GEOCONNEX_PREFIXES);
    // Swap the network-backed completers for the local, offline ones.
    yasqe.disableCompleter("property");
    yasqe.disableCompleter("class");
    yasqe.enableCompleter("geoconnexProperty");
    yasqe.enableCompleter("geoconnexClass");
    // The built-in "prefixes" completer suggests from a bundled list of
    // hundreds of generic, well-known prefixes (dc, foaf, skos, ...) that
    // Geoconnex never actually uses -- noisy and confusing here. The "Insert
    // Geoconnex Prefixes" button covers that need with the 5 prefixes that
    // actually matter for this graph.
    yasqe.disableCompleter("prefixes");
    patchResultsForGeoPlugin(tab);
    fitGeoMapOnDraw(tab);

    return () => yasgui.destroy();
  }, []);

  const loadExample = (query: string) => {
    const tab = yasguiRef.current?.getTab();
    if (!tab) return;
    tab.setQuery(query);
    tab.getYasqe().addPrefixes(GEOCONNEX_PREFIXES);
  };

  const insertGeoconnexPrefixes = () => {
    yasguiRef.current?.getTab()?.getYasqe().addPrefixes(GEOCONNEX_PREFIXES);
  };

  const toggleExamples = () => {
    setExamplesOpen((open) => !open);
    // The editor doesn't observe its container resizing on its own; nudge it
    // to re-measure once the collapse/expand transition finishes.
    setTimeout(() => yasguiRef.current?.getTab()?.getYasqe().refresh(), 220);
  };

  return (
    <div style={{ display: "flex", height: "80vh", border: "1px solid #ddd", borderRadius: "6px" }}>
      {/* YASQE shows a "Press CTRL - <spacebar> to autocomplete" banner whenever
          the cursor sits somewhere a completer could fire; we don't want it. */}
      <style>{`.yasqe .notificationContainer { display: none !important; }`}</style>
      <div
        style={{
          width: examplesOpen ? "280px" : "0px",
          flexShrink: 0,
          borderRight: examplesOpen ? "1px solid #ddd" : "none",
          overflow: "hidden",
          transition: "width 0.2s ease, border-color 0.2s ease",
        }}
      >
        <div style={{ width: "280px", height: "100%", overflowY: "auto", padding: "0.5rem" }}>
          <h4 style={{ margin: "0.5rem 0.5rem 1rem" }}>Example Queries</h4>
          {Array.from(examplesByCategory.entries()).map(([category, examples]) => (
            <div key={category} style={{ marginBottom: "1rem" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.8rem", color: "#666", padding: "0 0.5rem" }}>
                {category}
              </div>
              {examples.map((example) => (
                <button
                  key={example.title}
                  onClick={() => loadExample(example.query)}
                  title={example.query}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.4rem 0.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f0f4fb")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "none")}
                >
                  {example.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toggleExamples}
        title={examplesOpen ? "Hide example queries" : "Show example queries"}
        aria-label={examplesOpen ? "Hide example queries" : "Show example queries"}
        style={{
          flexShrink: 0,
          width: "18px",
          border: "none",
          borderRight: "1px solid #ddd",
          background: "#f5f5f5",
          cursor: "pointer",
          fontSize: "0.7rem",
          color: "#666",
        }}
      >
        {examplesOpen ? "‹" : "›"}
      </button>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.4rem 0.5rem",
            borderBottom: "1px solid #ddd",
            flexShrink: 0,
          }}
        >
          <button
            onClick={insertGeoconnexPrefixes}
            title="Insert the schema, gsp, hyf, rdf, and rdfs prefixes used by the Geoconnex graph"
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: "4px",
              border: "1px solid #3578e5",
              background: "transparent",
              color: "#3578e5",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            + Insert Geoconnex Prefixes
          </button>
        </div>
        <div ref={containerRef} style={{ flex: 1, minHeight: 0, overflow: "auto" }} />
      </div>
    </div>
  );
}
