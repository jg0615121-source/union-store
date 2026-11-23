import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recommendSize } from '../src/sizing.js';
import { buildContents } from './gemini.js';

test('size from body', () => {
  assert.equal(recommendSize({ height: 178, weight: 70 }), 'L');
  assert.equal(recommendSize({ height: 163, weight: 50 }), 'S');
  assert.equal(recommendSize({ height: 178, weight: 70, oversize: true }), 'M');
  assert.equal(recommendSize({ height: 190, weight: 100, fit: 1 }), 'XL');
  assert.equal(recommendSize({ height: 0, weight: 70 }), null);
});

test('gemini payload guard', () => {
  assert.equal(buildContents('search', { query: '' }), null);
  assert.equal(buildContents('fitcheck', { image: 'javascript:alert(1)' }), null);
  assert.equal(buildContents('chat', { messages: Array(30).fill({ role: 'user', text: 'x'.repeat(2000) }) }).length, 12);
  assert.equal(buildContents('chat', { messages: [{ role: 'user', text: 'x'.repeat(2000) }] })[0].parts[0].text.length, 800);
});
