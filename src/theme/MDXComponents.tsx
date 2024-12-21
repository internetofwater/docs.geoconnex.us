// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents"
import { CustomCodeblock } from "../components/CustomCodeblock"

export default {
  // Re-use the default mapping
  ...MDXComponents,
  CustomCodeblock,
}