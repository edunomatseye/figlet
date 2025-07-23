import { globSync } from 'glob';
import { writeFileSync, mkdirSync } from 'node:fs';
import { randomUUIDv7 } from 'bun';

mkdirSync('a', { recursive: true });
mkdirSync('b', { recursive: true });

writeFileSync('a/apple.ts', "console.log('apple');");
writeFileSync('b/banana.ts', "console.log('banana');");
writeFileSync('b/cherry.js', "console.log('cherry');");
writeFileSync('b/cherry.ts', "console.log('cherry');");

// The 'exclude' option should be an array of glob patterns, not a function.
const files = globSync('**/*.ts', {
  ignore: ['node_modules/**'],
});
console.log(files);
console.log(randomUUIDv7('hex'));

const buf = Buffer.from('Hello, world!'.repeat(100));
const encoded = new TextEncoder().encode('Hello, world!'.repeat(100));
encoded.reverse();
const compressed = Bun.gzipSync(encoded);
console.log(buf.byteLength);
console.log(compressed.length);

const decompressed = Bun.gunzipSync(compressed);
//console.log(new TextDecoder().decode(decompressed));

const appleFruit = Bun.file('a/apple.ts');
await Bun.write(Bun.stdout, await appleFruit.text());
