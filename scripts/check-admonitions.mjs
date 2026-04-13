import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const targets = [
  path.join(rootDir, 'dist', 'catppuccin.css'),
  path.join(rootDir, 'themes', 'latte.css'),
  path.join(rootDir, 'themes', 'frappe.css'),
  path.join(rootDir, 'themes', 'macchiato.css'),
  path.join(rootDir, 'themes', 'mocha.css'),
];

const requiredSnippets = [
  '.admonition.warning',
  '.admonition.info',
  '.admonition.error',
  '.asset-admonition',
];

for (const target of targets) {
  const css = await readFile(target, 'utf8');
  const missing = requiredSnippets.filter((snippet) => !css.includes(snippet));
  if (missing.length > 0) {
    console.error(`${path.basename(target)} missing: ${missing.join(', ')}`);
    process.exitCode = 1;
  }
}

if (process.exitCode === undefined) {
  console.log('admonition-coverage:ok');
}
