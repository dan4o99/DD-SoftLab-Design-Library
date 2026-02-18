import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const themeTokensPath = resolve(
  currentDir,
  "../projects/dd-softlab-design-lib/src/lib/theming/theme-tokens.ts",
);
const outputPath = resolve(
  currentDir,
  "../projects/dd-softlab-design-lib/src/lib/theming/theme-tokens.generated.scss",
);

const source = readFileSync(themeTokensPath, "utf8");
const pairPattern =
  /name:\s*['\"]([^'\"]+)['\"][\s\S]*?variable:\s*['\"](--[^'\"]+)['\"]/g;
const tokenPairs = [];

for (const match of source.matchAll(pairPattern)) {
  const tokenName = match[1];
  const cssVariable = match[2];
  tokenPairs.push({ tokenName, cssVariable });
}

if (tokenPairs.length === 0) {
  throw new Error(`No token pairs were found in ${themeTokensPath}`);
}

const mapEntries = tokenPairs
  .map(({ tokenName, cssVariable }) => `  '${tokenName}': ${cssVariable},`)
  .join("\n");

const generatedScss = `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: projects/dd-softlab-design-lib/src/lib/theming/theme-tokens.ts

@use 'sass:map';

$dd-token-css-vars: (
${mapEntries}
);

@function toCssVar($token-name) {
  $css-var: map.get($dd-token-css-vars, $token-name);

  @if $css-var == null {
    @return var(#{$token-name});
  }

  @return var(#{$css-var});
}
`;

writeFileSync(outputPath, generatedScss, "utf8");
console.log(
  `Generated ${outputPath} with ${tokenPairs.length} token mappings.`,
);
