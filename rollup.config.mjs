import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const hljsVersion = require('highlight.js/package.json').version;
const banner = `/*! \`topaz\` grammar built and tested with Highlight.js ${hljsVersion} */\n`;

export default {
  input: 'src/languages/topaz.js',
  output: [
    {
      file: 'dist/topaz.es.js',
      format: 'es',
      banner
    },
    {
      file: 'dist/topaz.cjs',
      format: 'cjs',
      exports: 'default',
      banner
    },
    {
      file: 'dist/topaz.js',
      format: 'iife',
      name: 'hljsTopaz',
      banner,
      footer: 'hljs.registerLanguage("topaz", hljsTopaz);'
    }
  ]
};
