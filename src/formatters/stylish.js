import { getType, getValue, getValue2 } from '../buildAST.js';

const shiftToTheLeft = 2;
const spacesIndent = 4;
const spaces = ' ';
const addIndent = '+ ';
const deleteIndent = '- ';
const unchangedIndent = '  ';

const getIndent = (depth, typeIndent) => `${spaces.repeat(spacesIndent * depth - shiftToTheLeft)}${typeIndent}`;

const normalizeValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const iter = (tree, deep) => {
    const keys = Object.keys(tree);

    const bodyOfLines = keys.reduce((acc, key) => {
      const indent = getIndent(deep, unchangedIndent);

      const tail = tree[key] instanceof Object
        ? `{\n${iter(tree[key], deep + 1)}${indent}}\n`
        : `${tree[key]}\n`;

      return [...acc, `${indent}${key}: ${tail}`];
    }, []);
    return `${bodyOfLines.join('')}`;
  };
  return `{\n${iter(value, depth)}${getIndent(depth - 1, unchangedIndent)}}`;
};

const buildFormatDiff = (diff) => {
  const iter = (AST, depth) => {
    const keysAST = Object.keys(AST);
    return keysAST.reduce((acc, key) => {
      const type = getType(AST[key]);
      const newValue = normalizeValue(getValue(AST[key]), depth + 1);
      const newValue2 = normalizeValue(getValue2(AST[key]), depth + 1);

      if (type === 'children') {
        return [...acc, `${getIndent(depth, unchangedIndent)}${key}: {\n${iter(AST[key].value, depth + 1).join('')}${getIndent(depth, unchangedIndent)}}\n`];
      }
      if (type === 'delete') {
        return [...acc, `${getIndent(depth, deleteIndent)}${key}: ${newValue}\n`];
      }
      if (type === 'add') {
        return [...acc, `${getIndent(depth, addIndent)}${key}: ${newValue}\n`];
      }
      if (type === 'unchanged') {
        return [...acc, `${getIndent(depth, unchangedIndent)}${key}: ${newValue}\n`];
      }
      if (type === 'changed') {
        return [...acc, `${getIndent(depth, deleteIndent)}${key}: ${newValue}\n${getIndent(depth, addIndent)}${key}: ${newValue2}\n`];
      }
      return acc;
    }, []);
  };
  const body = iter(diff, 1).join('');
  return `{\n${body}}`;
};

export default buildFormatDiff;
