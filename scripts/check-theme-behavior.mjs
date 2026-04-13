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

function expectIncludes(css, snippets, file) {
  const missing = snippets.filter((snippet) => !css.includes(snippet));
  if (missing.length > 0) {
    throw new Error(`${path.basename(file)} missing: ${missing.join(', ')}`);
  }
}

const autoCss = await readFile(path.join(rootDir, 'dist', 'catppuccin.css'), 'utf8');
expectIncludes(
  autoCss,
  [
    'body {\n  color-scheme: light;',
    '--ctp-flavor: "Latte";',
    'body.dark {\n  color-scheme: dark;',
    '--ctp-flavor: "Mocha";',
  ],
  path.join(rootDir, 'dist', 'catppuccin.css'),
);

const latteCss = await readFile(path.join(rootDir, 'themes', 'latte.css'), 'utf8');
expectIncludes(
  latteCss,
  [
    'body,\nbody.dark {\n  color-scheme: light;',
    '--ctp-flavor: "Latte";',
  ],
  path.join(rootDir, 'themes', 'latte.css'),
);

const sharedCoverage = [
  '.form-container fieldset',
  '.form-container .fieldset-category',
  '.form-container .form-help',
  '.form-field-info-text',
  '#preferences-container-list',
  '#no-results-message',
  '.toolbar-search-container',
  '.toolbar-search',
  '.popover-arrow',
  '.popover',
  '.code-editor-wrapper .cm-editor',
  'select option',
  '.selectable-list-wrapper .selectable-list-container div.item.selected',
  '.tree-item.active',
  '.list-item.active',
  '.toc-entry-active',
];

for (const target of targets) {
  const css = await readFile(target, 'utf8');
  expectIncludes(css, sharedCoverage, target);

  const suspiciousActiveStates = [
    '.selectable-list-wrapper .selectable-list-container div.item.selected {\n  background-color: var(--ctp-warning)',
    '.tree-item.active,\nbody .list-item.active,\nbody .toc-entry-active,\nbody .search-result.active,\nbody #global-search .active {\n  background-color: var(--ctp-warning)',
  ];

  const foundSuspicious = suspiciousActiveStates.filter((snippet) =>
    css.includes(snippet),
  );
  if (foundSuspicious.length > 0) {
    throw new Error(
      `${path.basename(target)} uses warning color for non-warning active states`,
    );
  }
}

console.log('theme-behavior:ok');
