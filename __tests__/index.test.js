import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'node:fs';
import {
  beforeEach, describe, expect, test,
} from '@jest/globals';
import action from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let format;
let filePath1;
let filePath2;
let expected;

describe('Comparison JSON files in format "stylish"', () => {
  beforeEach(() => {
    filePath1 = getFixturePath('file1.json');
    filePath2 = getFixturePath('file2.json');
    format = 'stylish';

    const resultPath = getFixturePath('stylishResult.txt');
    expected = fs.readFileSync(resultPath, 'utf-8');
  });

  test('genDiff', () => {
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison YAML files in format "stylish"', () => {
  beforeEach(() => {
    filePath1 = getFixturePath('file1.yaml');
    filePath2 = getFixturePath('file2.yaml');
    format = 'stylish';

    const resultPath = getFixturePath('stylishResult.txt');
    expected = fs.readFileSync(resultPath, 'utf-8');
  });

  test('genDiff', () => {
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison JSON files in format "plain"', () => {
  beforeEach(() => {
    filePath1 = getFixturePath('file1.json');
    filePath2 = getFixturePath('file2.json');
    format = 'plain';

    const resultPath = getFixturePath('plainResult.txt');
    expected = fs.readFileSync(resultPath, 'utf-8');
  });

  test('genDiff', () => {
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison YAML files in format "plain"', () => {
  beforeEach(() => {
    filePath1 = getFixturePath('file1.yaml');
    filePath2 = getFixturePath('file2.yaml');
    format = 'plain';

    const resultPath = getFixturePath('plainResult.txt');
    expected = fs.readFileSync(resultPath, 'utf-8');
  });

  test('genDiff', () => {
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison JSON files in format "json"', () => {
  beforeEach(() => {
    filePath1 = getFixturePath('file1.json');
    filePath2 = getFixturePath('file2.json');
    format = 'json';

    const resultPath = getFixturePath('jsonResult.txt');
    expected = fs.readFileSync(resultPath, 'utf-8');
  });

  test('genDiff', () => {
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison YAML files in format "json"', () => {
  beforeEach(() => {
    filePath1 = getFixturePath('file1.yaml');
    filePath2 = getFixturePath('file2.yaml');
    format = 'json';

    const resultPath = getFixturePath('jsonResult.txt');
    expected = fs.readFileSync(resultPath, 'utf-8');
  });

  test('genDiff', () => {
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});
