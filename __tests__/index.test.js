import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'node:fs';
import { describe, expect, test } from '@jest/globals';
import action from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getData = (fileName1, filename2, formatName, resultName) => {
  const filePath1 = getFixturePath(fileName1);
  const filePath2 = getFixturePath(filename2);
  const format = formatName;

  const resultPath = getFixturePath(resultName);
  const expected = fs.readFileSync(resultPath, 'utf-8');
  return {
    filePath1, filePath2, format, expected,
  };
};

describe('Comparison JSON files in format "stylish"', () => {
  test('genDiff', () => {
    const {
      filePath1, filePath2, format, expected,
    } = getData('file1.json', 'file2.json', 'stylish', 'stylishResult.txt');
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison YAML files in format "stylish"', () => {
  test('genDiff', () => {
    const {
      filePath1, filePath2, format, expected,
    } = getData('file1.yaml', 'file2.yaml', 'stylish', 'stylishResult.txt');
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison JSON files in format "plain"', () => {
  test('genDiff', () => {
    const {
      filePath1, filePath2, format, expected,
    } = getData('file1.json', 'file2.json', 'plain', 'plainResult.txt');
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison YAML files in format "plain"', () => {
  test('genDiff', () => {
    const {
      filePath1, filePath2, format, expected,
    } = getData('file1.yaml', 'file2.yaml', 'plain', 'plainResult.txt');
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison JSON files in format "json"', () => {
  test('genDiff', () => {
    const {
      filePath1, filePath2, format, expected,
    } = getData('file1.json', 'file2.json', 'json', 'jsonResult.txt');
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});

describe('Comparison YAML files in format "json"', () => {
  test('genDiff ./__fixtures__/file1.json ./__fixtures__/file2.json', () => {
    const {
      filePath1, filePath2, format, expected,
    } = getData('file1.yaml', 'file2.yaml', 'json', 'jsonResult.txt');
    expect(action(filePath1, filePath2, format)).toBe(expected);
  });
});
