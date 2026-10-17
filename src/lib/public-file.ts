import { existsSync } from "node:fs";
import { join } from "node:path";

/** Verifica, no build, se um arquivo existe em /public (ex.: "/logo.png"). */
export function publicFileExists(path: string): boolean {
  return existsSync(join(process.cwd(), "public", path.replace(/^\//, "")));
}
