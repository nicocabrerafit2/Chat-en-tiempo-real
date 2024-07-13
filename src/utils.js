import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export default { __dirname };
