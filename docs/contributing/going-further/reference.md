---
title: Adding reference features
---

# Adding reference features to reference.geoconnex.us

[reference.geoconnex.us](https://reference.geoconnex.us/) can host community reference feature collections. Any group willing to steward a collection over time can propose one — the maintenance is a longer commitment than the initial publication.

## What a collection needs

**An identifier scheme.** Identifiers take the form `https://geoconnex.us/ref/{collection}/{id}`. An opaque local part is the safer choice, because one that carries no parseable meaning cannot be invalidated when whatever it encoded changes. Some collections do reuse a stable external code — FIPS for counties and states, HUC for hydrologic units — but that only holds where the code is centrally governed and is not renumbered.

**A commitment to uniqueness and permanence.** One identifier, one real-world feature, never reused and never removed. This is the one policy shared across all collections. See [Reference Features](/reference/reference_features).

**A documented maintenance policy.** How features qualify for an identifier, how representations improve, how supersession is decided and recorded, who does the work, and on what cadence. These answers depend on your feature type and belong in your collection's own documentation.

**Landing content.** Each feature needs a description that resolves, links to representations and related features, and states relationships between identifiers rather than between pages. See the [JSON-LD primer](/reference/data-formats/jsonld/primer/) and the [best practices registry](/reference/overview).

## Getting started

Open an issue in [geoconnex.us](https://github.com/internetofwater/geoconnex.us/issues) describing the feature type, the scope of the collection, and who will steward it. The [Geoconnex working group](/about/community) reviews proposals. The README in the [reference folder](https://github.com/internetofwater/geoconnex.us/tree/master/namespaces/ref) covers the mechanics of the namespace.

[ref_rivers](https://github.com/internetofwater/ref_rivers) and its [users manual](https://internetofwater.github.io/ref_rivers/) show a collection that has worked through these decisions in public.
