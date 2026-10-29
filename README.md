# Topaz grammar for Highlight.js

A syntax-highlighting grammar for [Topaz](https://topaz.ooo/), developed by STUDIO HAZE.
This is STUDIO HAZE's Topaz, distinct from m-schm's unrelated Topaz language.

This package contains highlighting rules and public-language examples, not the
language implementation. It uses standard Highlight.js scopes, so existing
themes apply. This is syntax highlighting, not a language validator.

## Use from the repository

Install Highlight.js 11 and clone this grammar repository. The committed
`dist/` files can be used directly; a published npm version is not required.

```javascript
import hljs from 'highlight.js/lib/core';
import grammar from './dist/topaz.es.js';

hljs.registerLanguage('topaz', grammar);
console.log(hljs.highlight(source, { language: 'topaz' }).value);
```

CommonJS exports the grammar from `dist/topaz.cjs`. The browser bundle
`dist/topaz.js` registers itself on an already loaded global `hljs`.
The extension alias is `tpz`.

## Develop and test

```sh
npm ci
npm test
```

`npm test` builds ESM, CommonJS, and browser bundles, checks exact markup
fixtures, and loads the complete CLI-verified example through all three formats.
The test runner refuses to pass when it discovers no markup fixtures.
Commit the generated `dist/` files when changing the grammar.

## Syntax references

- [Official language site](https://topaz.ooo/)
- [Lexical rules](https://topaz.ooo/v5.21/en/docs/language/lexical-layout)
- [Strings and templates](https://topaz.ooo/v5.21/en/docs/language/strings-templates)
- The complete example was run with official Topaz 5.21.0, reference compiler.

## License

MIT; see [LICENSE](LICENSE). The upstream grammar-template layout is also MIT.
