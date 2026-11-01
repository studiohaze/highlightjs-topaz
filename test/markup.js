import { createRequire } from 'node:module';
import vm from 'node:vm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'node:assert/strict';
import hljs from 'highlight.js/lib/core';
import topaz from '../dist/topaz.es.js';

hljs.registerLanguage('topaz', topaz);

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtureFolder = path.join(here, 'markup/topaz');
const expects = fs.readdirSync(fixtureFolder)
  .filter(name => name.endsWith('.expect.txt'))
  .map(name => path.join(fixtureFolder, name));
assert.ok(expects.length > 0, 'markup fixtures must be discovered');

describe('topaz', () => {
  expects.forEach((filename) => {
    const name = path.basename(filename, '.expect.txt');
    const skipped = name.endsWith('.skip');
    const run = skipped ? it.skip : it;
    run(`should markup ${name}`, () => {
      const source = fs.readFileSync(filename.replace(/\.expect/, ''), 'utf8');
      const expected = fs.readFileSync(filename, 'utf8');
      assert.equal(hljs.highlight(source, { language: 'topaz' }).value.trim(),
        expected.trim());
    });
  });
});

describe('Topaz 5.21 keywords and collection heads', () => {
  it('colors every keyword and only literal uses of map and set', () => {
    const source = fs.readFileSync(path.join(fixtureFolder, 'keywords-521.txt'), 'utf8');
    const html = hljs.highlight(source, { language: 'topaz' }).value;
    const words = 'let mut const type function return if else match case for in by while '
      + 'break continue defer concurrent import export as record enum newtype protocol impl derives loop using';
    for (const word of words.split(' ')) {
      assert.ok(html.includes('<span class="hljs-keyword">' + word + '</span>'), word);
    }
    for (const word of ['true', 'false', 'null']) {
      assert.ok(html.includes('<span class="hljs-literal">' + word + '</span>'), word);
    }
    for (const word of ['map', 'set']) {
      assert.equal(html.split('<span class="hljs-keyword">' + word + '</span>').length - 1, 3);
      assert.ok(html.includes('<span class="hljs-keyword">let</span> ' + word + ' ='));
    }
    assert.equal(html.split('xs.map(f)').length - 1, 2);
    for (const name of ['mapValue', 'setValue', 'map상태', 'set💎']) assert.ok(html.includes(name));
  });
});

const require = createRequire(import.meta.url);
const complexSource = fs.readFileSync(path.join(here, 'detect/topaz/default.txt'), 'utf8');
const decode = html => html.replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&');

describe('topaz package formats and complete example', () => {
  const check = instance => {
    const result = instance.highlight(complexSource, { language: 'topaz' });
    assert.equal(result.illegal, false);
    assert.equal(result.errorRaised, undefined);
    assert.equal(decode(result.value), complexSource);
    for (const scope of ['comment', 'keyword', 'string', 'number']) {
      assert.ok(result.value.includes('hljs-' + scope), scope + ' must be recognized');
    }
  };
  it('highlights the complete CLI-verified example through ESM', () => check(hljs));
  it('loads the CommonJS build and extension alias', () => {
    const instance = hljs.newInstance();
    instance.registerLanguage('topaz', require('../dist/topaz.cjs'));
    assert.ok(instance.getLanguage('tpz'));
    check(instance);
  });
  it('loads the browser bundle without Node globals', () => {
    const instance = hljs.newInstance();
    vm.runInNewContext(fs.readFileSync(path.join(here, '../dist/topaz.js'), 'utf8'),
      { hljs: instance }, { timeout: 1000 });
    check(instance);
  });
});
