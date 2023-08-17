import _ from 'lodash';

const getTreeValue = (tree, key) => tree[key];
const getKeysFromContent = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const uniqueKeys = _.uniq([...keys1, ...keys2]);
  const keys = _.sortBy(uniqueKeys);

  return { keys1, keys2, keys };
};
const buildAST = (content1, content2) => {
  const {
    keys: allKeys,
    keys1: keysContent1,
    keys2: keysContent2,
  } = getKeysFromContent(content1, content2);

  const iter = (tree1, tree2, keys, keys1, keys2) => keys.reduce((acc, key) => {
    const value1 = getTreeValue(tree1, key);
    const value2 = getTreeValue(tree2, key);

    if (!keys1.includes(key)) {
      return _.set(acc, key, { type: 'add', value: value2 });
    }

    if (!keys2.includes(key)) {
      return _.set(acc, key, { type: 'delete', value: value1 });
    }

    if (value1 instanceof Object && value2 instanceof Object) {
      return _.set(acc, key, { type: 'children', value: buildAST(value1, value2) });
    }

    if (value1 !== value2) {
      return _.set(acc, key, { type: 'changed', value: value1, value2 });
    }

    return _.set(acc, key, { type: 'unchanged', value: value1 });
  }, {});
  return iter(content1, content2, allKeys, keysContent1, keysContent2);
};

export const getValue = (astBranch) => astBranch.value;
export const getValue2 = (astBranch) => astBranch.value2;
export const getType = (astBranch) => astBranch.type;

export default buildAST;
