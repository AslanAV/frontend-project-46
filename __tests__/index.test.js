import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'node:fs';
import { test, expect, beforeEach } from '@jest/globals';
import action from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let format;
let filePath1;
let filePath2;
let expected;

beforeEach(() => {
  filePath1 = getFixturePath('file1.json');
  filePath2 = getFixturePath('file2.json');
  format = '';

  const resultPath = getFixturePath('result.txt');
  expected = fs.readFileSync(resultPath, 'utf-8');
});

test('genDiff', () => {
  expect(action(filePath1, filePath2, format)).toBe(expected);
});