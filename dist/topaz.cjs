/*! `topaz` grammar built and tested with Highlight.js 11.12.0 */

'use strict';

/*
Language: Topaz
Author: STUDIO HAZE
Description: STUDIO HAZE's Topaz language, distinct from m-schm's Topaz.
Website: https://topaz.ooo/
*/

function topaz(hljs) {
  const KEYWORDS = {
    $pattern: /[\p{L}_\p{Extended_Pictographic}][\p{L}\p{N}_\p{Extended_Pictographic}]*/u,
    keyword: 'import export as let mut const function return if else match case '
      + 'for in by while loop break continue record enum type newtype protocol impl '
      + 'derives defer using concurrent',
    literal: 'true false null None',
    type: 'int float bool string template Array Map Set Option Result',
    built_in: 'Some Ok Err'
  };
  const COLLECTION_HEAD = {
    scope: 'keyword',
    begin: /(?<![\p{L}\p{N}_\p{Extended_Pictographic}.])(?:map|set)(?=[ \t]*\{)/u,
    relevance: 0
  };
  const NUMBER = {
    scope: 'number',
    begin: /\b(?:0[xX][\dA-Fa-f](?:_?[\dA-Fa-f])*|0[bB][01](?:_?[01])*|\d(?:_?\d)*(?:\.\d(?:_?\d)*)?)\b/,
    relevance: 0
  };
  const SUBST = {
    scope: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: []
  };
  const STRINGS = [
    {
      scope: 'string',
      begin: /(?:\b(?:p|r|sh|sql))?"""/,
      end: /"""/,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    },
    {
      scope: 'string',
      begin: /(?:\b(?:p|r|sh|sql))?"/,
      end: /"/,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    }
  ];
  const COMMENTS = [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE];
  // Expressions in interpolation can contain strings and nested records/blocks.
  const BRACES = {
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: [...STRINGS, ...COMMENTS, COLLECTION_HEAD, NUMBER, 'self']
  };
  SUBST.contains = [
    ...STRINGS,
    ...COMMENTS,
    COLLECTION_HEAD,
    NUMBER,
    BRACES
  ];
  return {
    name: 'Topaz',
    aliases: ['tpz'],
    unicodeRegex: true,
    keywords: KEYWORDS,
    contains: [...COMMENTS, ...STRINGS, COLLECTION_HEAD, NUMBER]
  };
}

module.exports = topaz;
