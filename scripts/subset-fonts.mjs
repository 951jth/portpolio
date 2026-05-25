import { readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync, statSync } from "node:fs";
import subsetFont from "subset-font";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const sourceDirs = ["src"];
const sourceExtensions = new Set([".css", ".ts", ".tsx"]);
const fontDir = join(root, "public", "assets", "fonts");
const fontSourceDir = join(root, "scripts", "font-sources");
const visibleCharacterPattern =
  /[\p{Script=Hangul}A-Za-z0-9 .,!?()&|/\-:+~%➡️©]/gu;

function listSourceFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return listSourceFiles(path);
    }
    if (entry.isFile() && sourceExtensions.has(extname(path))) {
      return [path];
    }
    return [];
  });
}

async function collectText() {
  const files = sourceDirs.flatMap((dir) => listSourceFiles(join(root, dir)));
  const content = await Promise.all(
    files.map((file) => readFile(file, "utf8")),
  );
  const characters = content
    .join("\n")
    .match(visibleCharacterPattern)
    ?.sort()
    .join("");

  return [...new Set(characters ?? "")].join("");
}

async function writeSubset(sourceFile, targetFile, text) {
  const input = await readFile(join(fontSourceDir, sourceFile));
  const output = await subsetFont(input, text, {
    targetFormat: "woff2",
  });
  const targetPath = join(fontDir, targetFile);
  await writeFile(targetPath, output);
  const size = statSync(targetPath).size;
  console.log(`${targetFile}: ${(size / 1024).toFixed(1)} KiB`);
}

const text = await collectText();

await writeSubset(
  "PretendardVariable.woff2",
  "PretendardVariableSubset.woff2",
  text,
);

const doHyeonInput = await readFile(
  join(fontSourceDir, "DoHyeon-Regular.ttf"),
);
const doHyeonOutput = await subsetFont(doHyeonInput, text, {
  targetFormat: "woff2",
});
const doHyeonTargetPath = join(fontDir, "DoHyeonSubset.woff2");
await writeFile(doHyeonTargetPath, doHyeonOutput);
console.log(
  `DoHyeonSubset.woff2: ${(statSync(doHyeonTargetPath).size / 1024).toFixed(
    1,
  )} KiB`,
);
