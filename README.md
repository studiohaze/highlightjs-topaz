# Topaz for Highlight.js

Syntax highlighting for [Topaz](https://topaz.ooo/), a general-purpose programming language with typesetting built in. It uses the standard Highlight.js scopes, so every existing theme works.

## Install

```sh
npm install highlight.js highlightjs-topaz
```

## Use

```javascript
import hljs from 'highlight.js/lib/core';
import topaz from 'highlightjs-topaz';

hljs.registerLanguage('topaz', topaz);
const html = hljs.highlight(source, { language: 'topaz' }).value;
```

CommonJS works with `require('highlightjs-topaz')`. In a browser, load `dist/topaz.js` after Highlight.js and it registers itself on the global `hljs`. The alias `tpz` works too.

## Develop

```sh
npm ci
npm test
```

The tests build the ESM, CommonJS and browser bundles and compare the highlighted markup with the fixtures. Commit the rebuilt `dist/` files with any grammar change.

## Links

- [Topaz documentation](https://topaz.ooo/en/docs)
- [Topaz source](https://github.com/studiohaze/topaz)
- [Lexical rules](https://topaz.ooo/v5.21/en/docs/language/lexical-layout)
- [Strings and templates](https://topaz.ooo/v5.21/en/docs/language/strings-templates)

## License

MIT
