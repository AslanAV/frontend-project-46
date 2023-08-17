import { getType, getValue, getValue2 } from '../buildAST.js';

const normalizeValue = (value) => {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};
const buildFormatDiff = (diff) => {
  const iter = (AST, parentKey) => {
    const keys = Object.keys(AST);
    return keys.reduce((acc, key) => {
      let line;
      const type = getType(AST[key]);
      const newValue = normalizeValue(getValue(AST[key]));
      const newValue2 = normalizeValue(getValue2(AST[key]));
      const newKey = parentKey === '' ? key : `${parentKey}.${key}`;

      if (type === 'children') {
        line = `${iter(AST[key].value, newKey).join('\n')}`;
        acc.push(line);
      }
      if (type === 'delete') {
        line = `Property '${newKey}' was removed`;
        acc.push(line);
      }
      if (type === 'add') {
        line = `Property '${newKey}' was added with value: ${newValue}`;
        acc.push(line);
      }
      if (type === 'changed') {
        line = `Property '${newKey}' was updated. From ${newValue} to ${newValue2}`;
        acc.push(line);
      }
      return acc;
    }, []);
  };
  return iter(diff, '').join('\n');
};

export default buildFormatDiff;
