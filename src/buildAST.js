import _ from 'lodash';

const getValue = (tree, key) => tree[key];
const getKeysFromContent = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const keys = _.uniq([...keys1, ...keys2]);
  keys.sort();
  return { keys1, keys2, keys };
};
const buildAST = (content1, content2) => {
  const {
    keys: allKeys,
    keys1: keysContent1,
    keys2: keysContent2,
  } = getKeysFromContent(content1, content2);

  const iter = (tree1, tree2, keys, keys1, keys2) => keys.reduce((acc, key) => {
    const value1 = getValue(tree1, key);
    const value2 = getValue(tree2, key);

    if (!keys1.includes(key)) {
      acc[key] = { type: 'add', value: value2 };
      return acc;
    }
    if (!keys2.includes(key)) {
      acc[key] = { type: 'delete', value: value1 };
      return acc;
    }

    if (value1 instanceof Object && value2 instanceof Object) {
      acc[key] = { type: 'children', value: buildAST(value1, value2) };
      return acc;
    }

    if (value1 !== value2) {
      acc[key] = { type: 'changed', value: value1, value2 };
      return acc;
    }

    acc[key] = { type: 'unchanged', value: value1 };
    return acc;
  }, {});
  return iter(content1, content2, allKeys, keysContent1, keysContent2);
};

export default buildAST;
