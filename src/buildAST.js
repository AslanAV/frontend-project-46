import _ from "lodash";

const getKeysFromContent = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const keys = _.uniq([...keys1, ...keys2]);
  keys.sort();
  return { keys1, keys2, keys };
};
const buildAST = (content1, content2, allKeys, keysContent1, keysContent2) => {
  const iter = (content1, content2, keys, keys1, keys2) => {
    return keys.reduce((acc, key) => {
      if (keys1.includes(key) && keys2.includes(key)) {
        if (content1[key] instanceof Object && content2[key] instanceof Object) {
          const { keys1: subKeys1, keys2: subKeys2, keys: subKeys } = getKeysFromContent(content1[key], content2[key]);
          acc[key] = { type: 'children', value: iter(content1[key], content2[key], subKeys, subKeys1, subKeys2) };
        } else {
          if (content1[key] === content2[key]) {
            acc[key] = { type: 'unchanged', value: content1[key] };
          } else {
            acc[key] = { type: 'changed', value: content1[key], value2: content2[key] }
          }
        }
      }
      if (!keys1.includes(key)) {
        acc[key] = { type: 'add', value: content2[key] };
      }
      if (!keys2.includes(key)) {
        acc[key] = { type: 'delete', value: content1[key] };
      }
      return acc;
    }, {});

  };
  return iter(content1, content2, allKeys, keysContent1, keysContent2);
};

export default buildAST;