import * as fs from 'node:fs';
import _ from 'lodash';

const getContentFromFiles = (filePath1, filePath2) => {
  const content1 = JSON.parse(fs.readFileSync(filePath1, 'utf-8'));
  const content2 = JSON.parse(fs.readFileSync(filePath2, 'utf-8'));
  return { content1, content2 };
};

const getKeysFromContent = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const keys = _.uniq([...keys1, ...keys2]);
  keys.sort();
  return { keys1, keys2, keys };
};

const action = (filePath1, filePath2, format) => {
  const { content1, content2 } = getContentFromFiles(filePath1, filePath2);
  const { keys1, keys2, keys } = getKeysFromContent(content1, content2);

  const diffBody = keys.reduce((acc, key) => {
    const addContent2 = `  + ${key}: ${content2[key]}`;
    const deleteContent1 = `  - ${key}: ${content1[key]}`;
    const noChangeContent = `    ${key}: ${content2[key]}`;

    if (keys1.includes(key) && keys2.includes(key)) {
      if (content1[key] === content2[key]) {
        acc.push(noChangeContent);
      } else {
        acc.push(deleteContent1);
        acc.push(addContent2);
      }
    }
    if (!keys1.includes(key)) {
      acc.push(addContent2);
    }
    if (!keys2.includes(key)) {
      acc.push(deleteContent1);
    }
    return acc;
  }, []);

  const result = `{\n${diffBody.join('\n')}\n}`;
  console.log(result, format);
  return result;
};

export default action;
