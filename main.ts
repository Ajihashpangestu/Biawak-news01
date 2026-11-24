import { access, copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const sourceImage = resolve(root, "entry.png");

try {
  await access(sourceImage);
} catch (error) {
  if (error instanceof Error && "code" in error && error.code === "ENOENT") {
    throw new Error(`Required source image is missing: ${sourceImage}`, { cause: error });
  }
  throw error;
}

await mkdir(outputDir, { recursive: true });
await copyFile(sourceImage, resolve(outputDir, "entry.png"));
