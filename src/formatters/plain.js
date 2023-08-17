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
      const type = getType(AST[key]);
      const newValue = normalizeValue(getValue(AST[key]));
      const newValue2 = normalizeValue(getValue2(AST[key]));
      const newKey = parentKey === '' ? key : `${parentKey}.${key}`;

      if (type === 'children') {
        return [...acc, `${iter(AST[key].value, newKey).join('\n')}`];
      }
      if (type === 'delete') {
        return [...acc, `Property '${newKey}' was removed`];
      }
      if (type === 'add') {
        return [...acc, `Property '${newKey}' was added with value: ${newValue}`];
      }
      if (type === 'changed') {
        return [...acc, `Property '${newKey}' was updated. From ${newValue} to ${newValue2}`];
      }
      return acc;
    }, []);
  };
  return iter(diff, '').join('\n');
};

export default buildFormatDiff;
