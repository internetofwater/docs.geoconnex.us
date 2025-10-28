const fs = require("fs");
const path = require("path");

// this script fetches the SHACL shape from the internet and saves it to a local file
// so that it can be included statically in the docs but always be up-to-date

const SHACL_URL = "https://raw.githubusercontent.com/internetofwater/nabu/refs/heads/main/shacl_validator/shapes/geoconnex.ttl";
const OUTPUT_PATH = path.resolve("static/shapes/geoconnex.ttl");

async function main() {
  console.log(`Fetching SHACL shape from ${SHACL_URL}...`);
  const res = await fetch(SHACL_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  const text = await res.text();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, text);
  console.log(`✅ Saved SHACL shape to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
