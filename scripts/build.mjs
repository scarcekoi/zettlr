import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');
const themesDir = path.join(rootDir, 'themes');
const assetsDir = path.join(rootDir, 'assets');

const palette = JSON.parse(
  await readFile(path.join(srcDir, 'palette.json'), 'utf8'),
);

const semanticColors = {
  accent: 'mauve',
  link: 'blue',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  cursor: 'rosewater',
  heading: 'lavender',
  quote: 'subtext0',
  tag: 'blue',
  number: 'peach',
  string: 'green',
  keyword: 'mauve',
  property: 'teal',
  type: 'yellow',
  className: 'yellow',
  tagName: 'peach',
  markup: 'overlay1',
  subtle: 'overlay1',
};

const sharedCss = `/* catppuccin-zettlr: shared rules */
body,
body.dark {
  accent-color: var(--ctp-accent);
  background-color: var(--ctp-base);
  color: var(--ctp-text);
}

body,
body.dark,
body #window-frame,
body #app,
body #window-content,
body div#window-content.disable-vibrancy,
body .main-editor-wrapper,
body .code-editor-wrapper,
body .main-editor-wrapper .cm-editor,
body .code-editor-wrapper .cm-editor,
body .main-editor-wrapper .cm-scroller,
body .code-editor-wrapper .cm-scroller,
body .main-editor-wrapper .cm-content {
  background-color: var(--ctp-base) !important;
  color: var(--ctp-text);
}

body .code-editor-wrapper .cm-content,
body div[role="tabpanel"],
body #preferences-container-list,
body .form-container,
body .form-container fieldset,
body .control-grid,
body .popover,
body .popover form,
body .popover table,
body #no-results-message {
  background-color: var(--ctp-base) !important;
  color: var(--ctp-text);
}

body a,
body.dark a {
  color: var(--ctp-link);
}

body #window-chrome,
body #toolbar,
body #statusbar,
body .document-tablist-wrapper .scroller,
body .tab-container,
body .tab-list,
body .system-tablist,
body #file-manager,
body #sidebar,
body .cm-statusbar,
body .cm-panels,
body .cm-panel,
body .cm-tooltip,
body .tippy-box,
body .tippy-content,
body .popover,
body .toolbar-search-container {
  background-color: var(--ctp-mantle) !important;
  color: var(--ctp-text) !important;
}

body #window-content,
body #statusbar,
body #toolbar,
body #file-manager,
body #sidebar,
body .tab-container,
body .tab-list,
body .system-tablist,
body .cm-statusbar,
body .cm-panel,
body .cm-tooltip,
body .tippy-box,
body .popover,
body .toolbar-search-container,
body div.split-view div.view.view-border,
body.darwin #file-manager,
body.dark.darwin #file-manager {
  border-color: var(--ctp-surface1) !important;
}

body #preferences-container-list,
body .form-container fieldset,
body .control-grid .control-grid-cell,
body .popover,
body .popover-arrow,
body .toolbar-search-container {
  box-shadow: none !important;
}

body .form-container .fieldset-category,
body .form-field-info-text,
body .form-control p.info,
body .cb-group div.info,
body .radio-group-outside-label,
body .toolbar-search::placeholder,
body .popover a.toc-link,
body .popover form label,
body .popover table td {
  color: var(--ctp-subtext0) !important;
}

body .form-container fieldset,
body .control-grid .control-grid-cell,
body .popover,
body .popover form input,
body .toolbar-search-container {
  background-color: var(--ctp-surface0) !important;
  border: 1px solid var(--ctp-surface1) !important;
}

body .form-container fieldset legend,
body .form-container .control-grid .control-grid-cell.heading,
body .form-container .form-header,
body .form-container label,
body .popover,
body .popover a.toc-link:hover {
  color: var(--ctp-text) !important;
}

body .form-container fieldset hr,
body .popover hr {
  border-color: var(--ctp-surface1) !important;
}

body .form-container .form-help {
  background-color: var(--ctp-surface1) !important;
  border: 1px solid var(--ctp-surface2) !important;
  color: var(--ctp-subtext1) !important;
}

body .toolbar-search-container cds-icon,
body .toolbar-search-container clr-icon,
body .toolbar-search::placeholder {
  color: var(--ctp-overlay1) !important;
}

body input,
body textarea,
body select,
body button {
  color: var(--ctp-text);
}

body input,
body textarea,
body select,
body .file-manager-filter-input,
body .filename-input,
body .cm-panels input,
body .cm-panels button,
body .cm-button,
body .tippy-content textarea,
body .toolbar-search,
body .popover form input,
body select option {
  background-color: var(--ctp-surface0) !important;
  border: 1px solid var(--ctp-surface1) !important;
  color: var(--ctp-text) !important;
  box-shadow: none !important;
}

body input::placeholder,
body textarea::placeholder,
body .file-manager-filter-input::placeholder,
body .filename-input::placeholder {
  color: var(--ctp-overlay1) !important;
}

body input:focus,
body textarea:focus,
body select:focus,
body .file-manager-filter-input:focus,
body .filename-input:focus,
body .cm-panels input:focus {
  border-color: var(--ctp-accent) !important;
  outline: none !important;
  box-shadow: 0 0 0 1px var(--ctp-accent) !important;
}

body .toolbar-search-container:focus-within,
body .popover form input:focus {
  border-color: var(--ctp-accent) !important;
  box-shadow: 0 0 0 1px var(--ctp-accent) !important;
}

body button:disabled,
body input:disabled,
body textarea:disabled,
body select:disabled,
body label.disabled,
body .cb-group div.info,
body .form-control p.info,
body .radio-group-outside-label {
  color: var(--ctp-overlay1) !important;
}

body button:disabled,
body input:disabled,
body textarea:disabled,
body select:disabled {
  background-color: var(--ctp-surface0) !important;
  border-color: var(--ctp-surface1) !important;
  cursor: not-allowed !important;
  opacity: 1 !important;
}

body .form-control button,
body .save-asset-file button {
  background-color: var(--ctp-surface0) !important;
  border: 1px solid var(--ctp-surface1) !important;
  color: var(--ctp-text) !important;
  box-shadow: none !important;
}

body .form-control button:hover:not(:disabled),
body .save-asset-file button:hover:not(:disabled) {
  background-color: var(--ctp-surface1) !important;
}

body .form-control button.primary,
body .save-asset-file button.primary {
  background-color: var(--ctp-accent) !important;
  border-color: var(--ctp-accent) !important;
  color: var(--ctp-base) !important;
}

body .form-control button.primary:hover:not(:disabled),
body .save-asset-file button.primary:hover:not(:disabled) {
  filter: brightness(1.04);
}

body div.form-control .input-text-button-group {
  background-color: var(--ctp-surface0) !important;
  border: 1px solid var(--ctp-surface1) !important;
  color: var(--ctp-text) !important;
}

body div.form-control .input-text-button-group:focus-within {
  border-color: var(--ctp-accent) !important;
  box-shadow: 0 0 0 1px var(--ctp-accent) !important;
  outline: none !important;
}

body div.form-control .input-text-button-group .input-text-button-group-icon {
  color: var(--ctp-overlay1) !important;
}

body div.form-control .input-text-button-group button.input-reset-button {
  background-color: var(--ctp-surface1) !important;
  color: var(--ctp-subtext1) !important;
}

body div.form-control .input-text-button-group button.input-reset-button:hover {
  background-color: var(--ctp-overlay0) !important;
  color: var(--ctp-text) !important;
}

body label.checkbox .checkmark {
  background-color: var(--ctp-surface0) !important;
  border: 1px solid var(--ctp-surface1) !important;
}

body label.checkbox .checkmark::after {
  border-color: var(--ctp-base) !important;
}

body label.checkbox input:checked ~ .checkmark {
  background-color: var(--ctp-accent) !important;
  border-color: var(--ctp-accent) !important;
  background-image: none !important;
}

body label.checkbox.disabled .checkmark,
body label.checkbox.disabled input:checked ~ .checkmark {
  background-color: var(--ctp-surface1) !important;
  border-color: var(--ctp-overlay0) !important;
}

body label.checkbox.disabled .checkmark::after {
  border-color: var(--ctp-overlay1) !important;
}

body label.radio .toggle {
  background: var(--ctp-surface0) !important;
  border: 1px solid var(--ctp-surface1) !important;
  box-shadow: none !important;
}

body label.radio .toggle::before {
  background-color: transparent !important;
  box-shadow: none !important;
}

body label.radio input:checked + .toggle {
  background: var(--ctp-accent) !important;
  border-color: var(--ctp-accent) !important;
  background-image: none !important;
}

body label.radio input:checked + .toggle::before {
  background-color: var(--ctp-base) !important;
}

body label.radio.disabled .toggle,
body label.radio.disabled input:checked + .toggle {
  background: var(--ctp-surface1) !important;
  border-color: var(--ctp-overlay0) !important;
}

body label.radio.disabled input:checked + .toggle::before {
  background-color: var(--ctp-overlay1) !important;
}

body div.switch-group label.switch {
  background-color: var(--ctp-surface1) !important;
}

body div.switch-group label.switch .toggle {
  background-color: var(--ctp-surface0) !important;
  box-shadow: none !important;
}

body div.switch-group label.switch .toggle::before {
  background-color: var(--ctp-base) !important;
  box-shadow: none !important;
}

body div.switch-group label.switch input:checked + .toggle {
  background-color: var(--ctp-accent) !important;
}

body .selectable-list-wrapper {
  --selectable-list-border-color: var(--ctp-surface1) !important;
  --muted-color: var(--ctp-overlay1) !important;
}

body .selectable-list-wrapper .selectable-list-footer,
body .selectable-list-wrapper .selectable-list-container {
  background-color: var(--ctp-mantle) !important;
  border-color: var(--ctp-surface1) !important;
}

body .selectable-list-wrapper .selectable-list-footer .add,
body .selectable-list-wrapper .selectable-list-footer .remove {
  color: var(--ctp-subtext1) !important;
  border-right-color: var(--ctp-surface1) !important;
}

body .selectable-list-wrapper .selectable-list-footer .add:hover,
body .selectable-list-wrapper .selectable-list-footer .remove:hover {
  background-color: var(--ctp-surface0) !important;
  color: var(--ctp-text) !important;
}

body .selectable-list-wrapper .selectable-list-container div.no-items-label {
  color: var(--ctp-overlay1) !important;
}

body .selectable-list-wrapper .selectable-list-container div.item {
  background-color: var(--ctp-base) !important;
  color: var(--ctp-text) !important;
  border-color: var(--ctp-surface1) !important;
}

body .selectable-list-wrapper .selectable-list-container div.item:hover {
  background-color: var(--ctp-surface0) !important;
}

body .selectable-list-wrapper .selectable-list-container div.item.selected {
  background-color: var(--ctp-accent) !important;
  color: var(--ctp-base) !important;
}

body .selectable-list-wrapper .selectable-list-container div.item .info-string {
  color: var(--ctp-overlay1) !important;
}

body .selectable-list-wrapper .selectable-list-container div.item .info-string.error {
  color: var(--ctp-danger) !important;
}

body .admonition,
body .asset-admonition {
  background-color: var(--ctp-surface0) !important;
  border-color: var(--ctp-surface1) !important;
  color: var(--ctp-text) !important;
}

body .admonition cds-icon,
body .asset-admonition cds-icon {
  color: inherit !important;
}

body .admonition.warning,
body .asset-admonition.warning {
  background-color: color-mix(in srgb, var(--ctp-warning) 16%, var(--ctp-base)) !important;
  border-color: color-mix(in srgb, var(--ctp-warning) 42%, var(--ctp-surface1)) !important;
  color: color-mix(in srgb, var(--ctp-warning) 72%, var(--ctp-text)) !important;
}

body .admonition.info,
body .asset-admonition.info {
  background-color: color-mix(in srgb, var(--ctp-link) 16%, var(--ctp-base)) !important;
  border-color: color-mix(in srgb, var(--ctp-link) 42%, var(--ctp-surface1)) !important;
  color: color-mix(in srgb, var(--ctp-link) 72%, var(--ctp-text)) !important;
}

body .admonition.error,
body .asset-admonition.error {
  background-color: color-mix(in srgb, var(--ctp-danger) 16%, var(--ctp-base)) !important;
  border-color: color-mix(in srgb, var(--ctp-danger) 42%, var(--ctp-surface1)) !important;
  color: color-mix(in srgb, var(--ctp-danger) 72%, var(--ctp-text)) !important;
}

body #toolbar,
body #toolbar button,
body #toolbar .toolbar-text,
body #toolbar .toolbar-label,
body #toolbar cds-icon,
body .document-tablist-wrapper .scroller,
body .system-tab,
body .tab-list button[role="tab"] {
  color: var(--ctp-subtext1) !important;
}

body #toolbar button,
body #toolbar .toolbar-text,
body .toolbar-group button,
body .toolbar-overflow,
body .system-tab,
body .tab-list button[role="tab"] {
  background-color: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

body #toolbar button:hover,
body #toolbar .toolbar-text:hover,
body #toolbar .toolbar-overflow:hover,
body .system-tab:hover,
body .tab-list button[role="tab"]:hover,
body .tab-list button[role="tab"].active,
body .system-tab.active,
body .toolbar-group button.active,
body .toolbar-group .active button,
body .toolbar-group .toggle.active,
body .toolbar-group .three-way-toggle.active,
body .toolbar-group .three-way-toggle button.active {
  background-color: var(--ctp-surface0) !important;
  color: var(--ctp-text) !important;
}

body #toolbar button.active,
body .toolbar-group button.active,
body .toolbar-group .active button,
body .toolbar-group .toggle.active,
body .toolbar-group .three-way-toggle.active,
body .toolbar-group .three-way-toggle button.active {
  background-color: var(--ctp-surface1) !important;
}

body #statusbar button.primary,
body .tab-list button[role="tab"].active,
body .system-tab.active,
body .toc-entry-active {
  color: var(--ctp-base) !important;
}

body #statusbar button.primary {
  background-color: var(--ctp-accent) !important;
  border-color: var(--ctp-accent) !important;
}

body div.document-tablist-wrapper div.scroller {
  background-color: var(--ctp-crust) !important;
}

body div.document-tablist-wrapper div.scroller:hover {
  background-color: var(--ctp-surface0) !important;
}

body .tab-container {
  background-color: var(--ctp-mantle) !important;
  border-bottom: 1px solid var(--ctp-surface1) !important;
}

body .tab-container div[role="tab"] {
  background-color: transparent !important;
  border-color: var(--ctp-surface1) !important;
  color: var(--ctp-subtext1) !important;
  box-shadow: none !important;
}

body .tab-container div[role="tab"]:hover {
  background-color: var(--ctp-surface0) !important;
  color: var(--ctp-text) !important;
}

body .tab-container div[role="tab"].active {
  background-color: var(--ctp-surface0) !important;
  border-bottom: 2px solid var(--ctp-accent) !important;
  color: var(--ctp-text) !important;
}

body .tab-container div[role="tab"].modified .filename::before {
  color: var(--ctp-number) !important;
}

body .tab-container div[role="tab"] .close:hover {
  background-color: var(--ctp-surface1) !important;
  color: var(--ctp-danger) !important;
}

body #file-manager {
  background-color: var(--ctp-mantle) !important;
  color: var(--ctp-text) !important;
}

body #file-manager .file-manager-filter {
  background-color: var(--ctp-mantle) !important;
}

body #file-manager #arrow-button {
  background-color: var(--ctp-surface1) !important;
  box-shadow: none !important;
  color: var(--ctp-text) !important;
}

body .tree-item,
body .list-item,
body .empty-file-list,
body .empty-directory {
  color: var(--ctp-subtext1) !important;
}

body .tree-item:hover,
body .list-item:hover,
body .related-file:hover,
body .toc-entry-container:hover,
body .search-result:hover {
  background-color: var(--ctp-surface0) !important;
}

body .tree-item.selected,
body .list-item.selected,
body .system-tab.active,
body .tab-list button[role="tab"].active {
  background-color: var(--ctp-surface1) !important;
  color: var(--ctp-text) !important;
}

body .tree-item.active,
body .list-item.active,
body .toc-entry-active,
body .search-result.active,
body #global-search .active {
  background-color: var(--ctp-accent) !important;
  color: var(--ctp-base) !important;
}

body .tree-item.directory,
body .list-item.directory,
body .csl-bib-body a,
body #sidebar a,
body .toc-level {
  color: var(--ctp-link) !important;
}

body .tree-item .item-icon,
body .tree-item .toggle-icon,
body .deduplicate,
body .filename .date,
body .toolbar-label,
body .toolbar-text,
body .cm-gutters,
body .cm-citation-mark,
body .cm-citation-at-sign,
body .cm-code-mark,
body .cm-zkn-link-mark,
body .cm-zkn-link-pipe,
body .cm-zkn-tag-mark,
body .pandoc-attribute-mark,
body .cm-pandoc-div-mark,
body .cm-pandoc-div-info,
body .cm-pandoc-span-mark,
body .cm-formatting-code,
body .cm-formatting-code-block,
body .cm-formatting-quote,
body .cm-formatting-strong,
body .cm-formatting-em,
body .cm-zkn-link-formatting,
body .cm-escape-char {
  color: var(--ctp-markup) !important;
}

body .list-item .badge,
body .meta-info .badge,
body .cm-foldPlaceholder {
  background-color: var(--ctp-surface0) !important;
  border-color: var(--ctp-surface1) !important;
  color: var(--ctp-subtext0) !important;
}

body .list-item .badge.code-indicator,
body .meta-info .badge.code-indicator {
  background-color: var(--ctp-accent) !important;
  color: var(--ctp-base) !important;
}

body .list-item .badge.tag,
body .meta-info .badge.tag {
  background-color: var(--ctp-tag) !important;
  color: var(--ctp-base) !important;
}

body .meta-info .badge svg circle {
  fill: var(--ctp-surface1) !important;
}

body .meta-info .badge svg path {
  fill: var(--ctp-subtext0) !important;
}

body #sidebar {
  background-color: var(--ctp-mantle) !important;
  color: var(--ctp-text) !important;
}

body #sidebar #sidebar-tab-container {
  background-color: var(--ctp-mantle) !important;
}

body #sidebar .toc-level {
  color: var(--ctp-accent) !important;
}

body #sidebar .toc-entry,
body #sidebar .related-file,
body #sidebar .csl-entry,
body h2.other-files-panel-folder-name {
  color: var(--ctp-text) !important;
}

body #sidebar .toc-entry-active,
body #sidebar .toc-entry-active .toc-level {
  color: var(--ctp-base) !important;
}

body div.split-view div.view.view-border {
  border-left-color: var(--ctp-surface1) !important;
}

body div.split-view div.horizontal-resizer {
  background-image: linear-gradient(
    to right,
    transparent 0,
    transparent 45%,
    var(--ctp-surface1) 45%,
    var(--ctp-surface1) 55%,
    transparent 55%,
    transparent 100%
  );
}

body div.split-view div.horizontal-resizer:hover {
  background-image: linear-gradient(
    to right,
    transparent 0,
    transparent 45%,
    var(--ctp-accent) 45%,
    var(--ctp-accent) 55%,
    transparent 55%,
    transparent 100%
  );
}

body .main-editor-wrapper,
body .code-editor-wrapper,
body .main-editor-wrapper .cm-editor,
body .code-editor-wrapper .cm-editor,
body .main-editor-wrapper .cm-scroller,
body .code-editor-wrapper .cm-scroller,
body .main-editor-wrapper .cm-content,
body .code-editor-wrapper .cm-content,
body .main-editor-wrapper .cm-line {
  color: var(--ctp-text) !important;
}

body .main-editor-wrapper .cm-line,
body .code-editor-wrapper .cm-line {
  background-color: transparent !important;
}

body .main-editor-wrapper .cm-gutters,
body .code-editor-wrapper .cm-gutters {
  background-color: var(--ctp-mantle) !important;
  border-right-color: var(--ctp-surface1) !important;
  color: var(--ctp-overlay2) !important;
}

body .main-editor-wrapper .cm-activeLine,
body .main-editor-wrapper .cm-activeLineGutter,
body .main-editor-wrapper .typewriter-active-line,
body .code-editor-wrapper .cm-activeLine,
body .code-editor-wrapper .cm-activeLineGutter,
body .code-editor-wrapper .typewriter-active-line {
  background-color: var(--ctp-surface0) !important;
}

body .main-editor-wrapper .cm-cursor,
body .main-editor-wrapper .cm-dropCursor,
body .code-editor-wrapper .cm-cursor,
body .code-editor-wrapper .cm-dropCursor {
  border-left-color: var(--ctp-cursor) !important;
  background-color: var(--ctp-cursor) !important;
}

body .main-editor-wrapper .cm-selectionLayer .cm-selectionBackground,
body .main-editor-wrapper.cm-focused .cm-selectionBackground,
body .main-editor-wrapper .cm-content ::selection,
body .main-editor-wrapper ::selection,
body .code-editor-wrapper .cm-selectionLayer .cm-selectionBackground,
body .code-editor-wrapper.cm-focused .cm-selectionBackground,
body .code-editor-wrapper .cm-content ::selection,
body .code-editor-wrapper ::selection {
  background-color: var(--ctp-selection) !important;
}

body .main-editor-wrapper .cm-selectionMatch,
body .main-editor-wrapper .cm-searchMatch,
body .code-editor-wrapper .cm-selectionMatch,
body .code-editor-wrapper .cm-searchMatch {
  background-color: var(--ctp-search) !important;
  border: 1px solid var(--ctp-warning) !important;
}

body .cm-tooltip,
body .cm-panels,
body .cm-panel,
body .tippy-box {
  border: 1px solid var(--ctp-surface1) !important;
  box-shadow: 0 16px 40px var(--ctp-shadow) !important;
}

body .cm-tooltip-autocomplete ul li[aria-selected],
body .cm-panel.cm-panel-lint ul [aria-selected],
body .cm-completionMatchedText {
  background-color: var(--ctp-surface1) !important;
  color: var(--ctp-text) !important;
}

body .cm-completionInfo,
body .cm-completionLabel {
  color: var(--ctp-text) !important;
}

body .cm-statusbar {
  border-top: 1px solid var(--ctp-surface1) !important;
  color: var(--ctp-subtext0) !important;
}

body .cm-yaml-frontmatter-start::after {
  background-color: var(--ctp-surface1) !important;
  color: var(--ctp-subtext0) !important;
}

body .citeproc-citation:not(.error),
body .code-block-line-background,
body .inline-code-background {
  background-color: var(--ctp-surface0) !important;
}

body .blockquote-wrapper {
  border-left-color: var(--ctp-link) !important;
}

body .cm-comment,
body .cm-line-comment,
body .cm-block-comment,
body .cm-doc-comment,
body .cm-meta,
body .cm-escape,
body .cm-annotation {
  color: var(--ctp-subtle) !important;
}

body .cm-keyword,
body .cm-operator-keyword,
body .cm-control-keyword,
body .cm-definition-keyword,
body .cm-module-keyword,
body .cm-modifier,
body .cm-self {
  color: var(--ctp-keyword) !important;
}

body .cm-string,
body .cm-doc-string,
body .cm-attribute-value,
body .cm-monospace {
  color: var(--ctp-string) !important;
}

body .cm-number,
body .cm-integer,
body .cm-float,
body .cm-unit,
body .cm-literal {
  color: var(--ctp-number) !important;
}

body .cm-bool,
body .cm-atom,
body .cm-null,
body .cm-invalid,
body .citeproc-citation.error,
body .mermaid-chart.error {
  color: var(--ctp-danger) !important;
}

body .cm-property-name,
body .cm-label-name,
body .cm-namespace {
  color: var(--ctp-property) !important;
}

body .cm-type-name,
body .cm-class-name {
  color: var(--ctp-type) !important;
}

body .cm-tag-name {
  color: var(--ctp-tag-name) !important;
}

body .cm-attribute-name {
  color: var(--ctp-property) !important;
}

body .cm-variable-name,
body .cm-name,
body .cm-content-span,
body .cm-fenced-code {
  color: var(--ctp-text) !important;
}

body .cm-operator,
body .cm-deref-operator,
body .cm-arithmetic-operator,
body .cm-logic-operator,
body .cm-bitwise-operator,
body .cm-compare-operator,
body .cm-update-operator,
body .cm-definition-operator,
body .cm-type-operator,
body .cm-control-operator,
body .cm-punctuation,
body .cm-separator,
body .cm-bracket,
body .cm-angle-bracket,
body .cm-square-bracket,
body .cm-paren,
body .cm-brace {
  color: var(--ctp-overlay2) !important;
}

body .cm-link,
body .cm-url,
body .cm-zkn-link,
body .cm-zkn-link-title,
body .cm-zkn-tag,
body .cm-citation-citekey {
  color: var(--ctp-link) !important;
}

body .cm-citation-locator {
  color: var(--ctp-property) !important;
}

body .cm-citation-suppress-author-flag,
body .cm-deleted {
  color: var(--ctp-danger) !important;
}

body .cm-inserted {
  color: var(--ctp-success) !important;
}

body .cm-changed,
body .cm-highlight {
  color: var(--ctp-text) !important;
  background-color: var(--ctp-highlight) !important;
}

body .cm-quote,
body .cm-citation-prefix,
body .cm-citation-suffix,
body .footnote,
body .footnote-ref,
body .footnote-ref-label {
  color: var(--ctp-quote) !important;
}

body .cm-heading,
body .cm-header-1,
body .cm-header-2,
body .cm-header-3,
body .cm-header-4,
body .cm-header-5,
body .cm-header-6,
body .cm-hr,
body .cm-yaml-frontmatter-start,
body .cm-yaml-frontmatter-end {
  color: var(--ctp-heading) !important;
}

body .search-result-highlight {
  background-color: var(--ctp-highlight) !important;
  color: var(--ctp-text) !important;
}

body::-webkit-scrollbar,
body .view::-webkit-scrollbar,
body .cm-scroller::-webkit-scrollbar,
body #sidebar-tab-container::-webkit-scrollbar,
body #component-container::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

body::-webkit-scrollbar-track,
body .view::-webkit-scrollbar-track,
body .cm-scroller::-webkit-scrollbar-track,
body #sidebar-tab-container::-webkit-scrollbar-track,
body #component-container::-webkit-scrollbar-track {
  background-color: var(--ctp-crust);
}

body::-webkit-scrollbar-thumb,
body .view::-webkit-scrollbar-thumb,
body .cm-scroller::-webkit-scrollbar-thumb,
body #sidebar-tab-container::-webkit-scrollbar-thumb,
body #component-container::-webkit-scrollbar-thumb {
  background-color: var(--ctp-surface1);
  border: 2px solid var(--ctp-crust);
  border-radius: 999px;
}

body::-webkit-scrollbar-thumb:hover,
body .view::-webkit-scrollbar-thumb:hover,
body .cm-scroller::-webkit-scrollbar-thumb:hover,
body #sidebar-tab-container::-webkit-scrollbar-thumb:hover,
body #component-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--ctp-surface2);
}
`;

function rgba(hex, alpha) {
  const value = hex.replace('#', '');
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function flavorVars(name) {
  const flavor = palette[name];
  const { colors } = flavor;
  return {
    flavorName: flavor.name,
    colorScheme: flavor.dark ? 'dark' : 'light',
    base: colors.base.hex,
    mantle: colors.mantle.hex,
    crust: colors.crust.hex,
    surface0: colors.surface0.hex,
    surface1: colors.surface1.hex,
    surface2: colors.surface2.hex,
    overlay0: colors.overlay0.hex,
    overlay1: colors.overlay1.hex,
    overlay2: colors.overlay2.hex,
    subtext0: colors.subtext0.hex,
    subtext1: colors.subtext1.hex,
    text: colors.text.hex,
    accent: colors[semanticColors.accent].hex,
    link: colors[semanticColors.link].hex,
    success: colors[semanticColors.success].hex,
    warning: colors[semanticColors.warning].hex,
    danger: colors[semanticColors.danger].hex,
    cursor: colors[semanticColors.cursor].hex,
    heading: colors[semanticColors.heading].hex,
    quote: colors[semanticColors.quote].hex,
    tag: colors[semanticColors.tag].hex,
    number: colors[semanticColors.number].hex,
    string: colors[semanticColors.string].hex,
    keyword: colors[semanticColors.keyword].hex,
    property: colors[semanticColors.property].hex,
    type: colors[semanticColors.type].hex,
    className: colors[semanticColors.className].hex,
    tagName: colors[semanticColors.tagName].hex,
    markup: colors[semanticColors.markup].hex,
    subtle: colors[semanticColors.subtle].hex,
    selection: rgba(colors.overlay2.hex, 0.24),
    search: rgba(colors.yellow.hex, 0.22),
    highlight: rgba(colors.yellow.hex, 0.3),
    shadow: rgba(colors.crust.hex, flavor.dark ? 0.45 : 0.2),
  };
}

function toVarBlock(selector, vars) {
  const lines = [
    `${selector} {`,
    `  color-scheme: ${vars.colorScheme};`,
    `  --ctp-flavor: "${vars.flavorName}";`,
    `  --ctp-base: ${vars.base};`,
    `  --ctp-mantle: ${vars.mantle};`,
    `  --ctp-crust: ${vars.crust};`,
    `  --ctp-surface0: ${vars.surface0};`,
    `  --ctp-surface1: ${vars.surface1};`,
    `  --ctp-surface2: ${vars.surface2};`,
    `  --ctp-overlay0: ${vars.overlay0};`,
    `  --ctp-overlay1: ${vars.overlay1};`,
    `  --ctp-overlay2: ${vars.overlay2};`,
    `  --ctp-subtext0: ${vars.subtext0};`,
    `  --ctp-subtext1: ${vars.subtext1};`,
    `  --ctp-text: ${vars.text};`,
    `  --ctp-accent: ${vars.accent};`,
    `  --ctp-link: ${vars.link};`,
    `  --ctp-success: ${vars.success};`,
    `  --ctp-warning: ${vars.warning};`,
    `  --ctp-danger: ${vars.danger};`,
    `  --ctp-cursor: ${vars.cursor};`,
    `  --ctp-heading: ${vars.heading};`,
    `  --ctp-quote: ${vars.quote};`,
    `  --ctp-tag: ${vars.tag};`,
    `  --ctp-number: ${vars.number};`,
    `  --ctp-string: ${vars.string};`,
    `  --ctp-keyword: ${vars.keyword};`,
    `  --ctp-property: ${vars.property};`,
    `  --ctp-type: ${vars.type};`,
    `  --ctp-class-name: ${vars.className};`,
    `  --ctp-tag-name: ${vars.tagName};`,
    `  --ctp-markup: ${vars.markup};`,
    `  --ctp-subtle: ${vars.subtle};`,
    `  --ctp-selection: ${vars.selection};`,
    `  --ctp-search: ${vars.search};`,
    `  --ctp-highlight: ${vars.highlight};`,
    `  --ctp-shadow: ${vars.shadow};`,
    `  --system-accent-color: ${vars.accent};`,
    `  --system-accent-color-contrast: ${vars.base};`,
    `}`,
  ];

  return lines.join('\n');
}

function buildFixedFlavorCss(flavorName) {
  const vars = flavorVars(flavorName);
  return `/* Catppuccin ${vars.flavorName} for Zettlr
 * Generated from the official Catppuccin palette.
 * Install by copying this file into Zettlr's custom.css slot.
 */

${toVarBlock('body,\nbody.dark', vars)}

${sharedCss}`;
}

function buildAutoCss(lightFlavor, darkFlavor) {
  const lightVars = flavorVars(lightFlavor);
  const darkVars = flavorVars(darkFlavor);
  return `/* Catppuccin for Zettlr
 * Auto variant: ${lightVars.flavorName} in light mode, ${darkVars.flavorName} in dark mode.
 * Generated from the official Catppuccin palette.
 */

${toVarBlock('body', lightVars)}

${toVarBlock('body.dark', darkVars)}

${sharedCss}`;
}

function buildPreviewSvg(flavorNames, title, subtitle) {
  const width = 1600;
  const height = 900;
  const cardWidth = 340;
  const cardHeight = 280;
  const gap = 32;
  const startX = 72;
  const startY = 208;
  const cards = flavorNames
    .map((name, index) => {
      const vars = flavorVars(name);
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = startX + col * (cardWidth + gap);
      const y = startY + row * (cardHeight + gap);
      const uiBase = y + 84;
      return `
  <g transform="translate(${x}, ${y})">
    <rect width="${cardWidth}" height="${cardHeight}" rx="24" fill="${vars.crust}" stroke="${vars.surface1}" />
    <text x="28" y="42" font-size="28" font-weight="700" fill="${vars.text}">${vars.flavorName}</text>
    <text x="28" y="68" font-size="16" fill="${vars.subtext0}">${vars.colorScheme} flavor</text>
    <rect x="28" y="${uiBase}" width="284" height="144" rx="18" fill="${vars.base}" stroke="${vars.surface1}" />
    <rect x="44" y="${uiBase + 18}" width="92" height="12" rx="6" fill="${vars.heading}" />
    <rect x="44" y="${uiBase + 42}" width="236" height="10" rx="5" fill="${vars.overlay1}" opacity="0.65" />
    <rect x="44" y="${uiBase + 64}" width="200" height="10" rx="5" fill="${vars.overlay0}" opacity="0.65" />
    <rect x="44" y="${uiBase + 92}" width="72" height="28" rx="14" fill="${vars.accent}" />
    <rect x="126" y="${uiBase + 92}" width="72" height="28" rx="14" fill="${vars.link}" />
    <rect x="208" y="${uiBase + 92}" width="72" height="28" rx="14" fill="${vars.surface0}" stroke="${vars.surface1}" />
    <circle cx="272" cy="${uiBase + 34}" r="7" fill="${vars.cursor}" />
    <rect x="28" y="224" width="284" height="14" rx="7" fill="${vars.surface0}" />
    <rect x="28" y="248" width="64" height="14" rx="7" fill="${vars.warning}" />
    <rect x="102" y="248" width="64" height="14" rx="7" fill="${vars.success}" />
    <rect x="176" y="248" width="64" height="14" rx="7" fill="${vars.danger}" />
  </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <rect width="${width}" height="${height}" fill="#11111b" />
  <rect x="28" y="28" width="${width - 56}" height="${height - 56}" rx="36" fill="#181825" stroke="#313244" />
  <text x="72" y="106" font-size="52" font-weight="800" fill="#cdd6f4">Catppuccin for Zettlr</text>
  <text x="72" y="148" font-size="24" fill="#a6adc8">${title}</text>
  <text x="72" y="180" font-size="20" fill="#7f849c">${subtitle}</text>
${cards}
</svg>`;
}

await mkdir(distDir, { recursive: true });
await mkdir(themesDir, { recursive: true });
await mkdir(assetsDir, { recursive: true });

const fixedFlavors = ['latte', 'frappe', 'macchiato', 'mocha'];
for (const flavorName of fixedFlavors) {
  await writeFile(
    path.join(themesDir, `${flavorName}.css`),
    `${buildFixedFlavorCss(flavorName)}\n`,
    'utf8',
  );
}

await writeFile(
  path.join(distDir, 'catppuccin.css'),
  `${buildAutoCss('latte', 'mocha')}\n`,
  'utf8',
);

await writeFile(
  path.join(assetsDir, 'preview-auto.svg'),
  buildPreviewSvg(
    ['latte', 'mocha'],
    'Default auto variant',
    'Latte in light mode. Mocha in dark mode.',
  ),
  'utf8',
);

await writeFile(
  path.join(assetsDir, 'preview-flavors.svg'),
  buildPreviewSvg(
    ['latte', 'frappe', 'macchiato', 'mocha'],
    'Fixed flavor variants',
    'Choose one file when you want a single flavor regardless of Zettlr dark-mode state.',
  ),
  'utf8',
);
