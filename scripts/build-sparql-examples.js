const fs = require("fs");
const path = require("path");

// Reads every .rq file in src/components/sparql/examples/ and bundles them
// into a single JSON file the SPARQL playground imports at build time.
// See src/components/sparql/examples/README.md for the file format.

const EXAMPLES_DIR = path.resolve("src/components/sparql/examples");
const OUTPUT_PATH = path.resolve("src/components/sparql/examples.generated.json");

const METADATA_LINE = /^#\s*([a-zA-Z]+):\s*(.*)$/;

function parseExample(fileName, contents) {
  const lines = contents.split(/\r?\n/);
  const metadata = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      break;
    }
    const match = line.match(METADATA_LINE);
    if (!match) break;
    metadata[match[1].toLowerCase()] = match[2].trim();
    i++;
  }

  const query = lines.slice(i).join("\n").trim();

  if (!metadata.title) {
    throw new Error(`${fileName}: missing required "# title: ..." metadata line`);
  }

  const tags = metadata.tags
    ? metadata.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return {
    title: metadata.title,
    category: metadata.category || "Miscellaneous Queries",
    tags,
    query,
  };
}

function main() {
  const files = fs
    .readdirSync(EXAMPLES_DIR)
    .filter((f) => f.endsWith(".rq"))
    .sort();

  if (files.length === 0) {
    throw new Error(`No .rq example files found in ${EXAMPLES_DIR}`);
  }

  const examples = files.map((fileName) => {
    const contents = fs.readFileSync(path.join(EXAMPLES_DIR, fileName), "utf8");
    return parseExample(fileName, contents);
  });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(examples, null, 2) + "\n");
  console.log(`✅ Wrote ${examples.length} SPARQL examples to ${OUTPUT_PATH}`);
}

main();
