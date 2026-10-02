# SPARQL examples

This directory holds the sample queries shown in the "example queries" panel
of the SPARQL playground (`/playground/sparql`). Every `.rq` file in this
directory (no subdirectories) is picked up automatically on build and added
to the frontend — there is nothing else to wire up in code.

## Adding a new example

Drop a new `.rq` file in here. It needs a few metadata comment lines at the
top, followed by a blank line, followed by the query itself:

```sparql
# title: Human-readable name shown in the examples list
# category: Group heading the example is sorted under
# tags: comma, separated, tags

PREFIX schema: <https://schema.org/>
SELECT * WHERE {
  ?dataset a schema:Dataset .
}
LIMIT 10
```

- `title` is required.
- `category` is optional; examples without one are grouped under "Miscellaneous Queries".
- `tags` is optional and currently just informational.
- Everything after the metadata header (and the blank line separating it from
  the query) is used verbatim as the query text, so the file is still a
  valid, runnable `.rq` file on its own (e.g. in `qlue-ls`-aware editors or
  `curl`), since `#` starts a comment in SPARQL too.

## How this gets into the site

`scripts/build-sparql-examples.js` runs as part of `npm run build` / `npm run start`
(see the `build:sparql-examples` script in `package.json`). It reads every
`.rq` file here, parses the metadata header, and writes
`src/components/sparql/examples.generated.json`, which the playground imports
directly. That generated file is git-ignored — edit the `.rq` files here, not
the generated JSON.
