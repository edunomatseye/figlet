import { globSync } from "node:fs";
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("a", { recursive: true });
mkdirSync("b", { recursive: true });

writeFileSync("a/apple.ts", "console.log('apple');");
writeFileSync("b/banana.ts", "console.log('banana');");
writeFileSync("b/cherry.js", "console.log('cherry');");
writeFileSync("b/cherry.ts", "console.log('cherry');");

// The 'exclude' option should be an array of glob patterns, not a function.
const files = globSync("**/*.ts", {
  exclude: ["node_modules/**"],
});
console.log(files);
