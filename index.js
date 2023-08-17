import * as fs from 'node:fs';
import * as path from 'path';
import _ from 'lodash';
import getContent from './src/parsers.js';
import buildAST from "./src/buildAST.js";
import getFormatDiff from "./src/formatter.js";

const getContentFromFiles = (filePath) => {
  const dataRow = fs.readFileSync(filePath, 'utf-8');
  const extName = path.extname(filePath);
  return getContent(dataRow, extName);
};

const getKeysFromContent = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const keys = _.uniq([...keys1, ...keys2]);
  keys.sort();
  return { keys1, keys2, keys };
};

const action = (filePath1, filePath2, format) => {

  const content1 = getContentFromFiles(filePath1);
  const content2 = getContentFromFiles(filePath2);
  const { keys1, keys2, keys } = getKeysFromContent(content1, content2);

  // const diffBody = keys.reduce((acc, key) => {
  //   const addContent2 = `  + ${key}: ${content2[key]}`;
  //   const deleteContent1 = `  - ${key}: ${content1[key]}`;
  //   const noChangeContent = `    ${key}: ${content2[key]}`;
  //
  //   if (keys1.includes(key) && keys2.includes(key)) {
  //     if (content1[key] === content2[key]) {
  //       acc.push(noChangeContent);
  //     } else {
  //       acc.push(deleteContent1);
  //       acc.push(addContent2);
  //     }
  //   }
  //   if (!keys1.includes(key)) {
  //     acc.push(addContent2);
  //   }
  //   if (!keys2.includes(key)) {
  //     acc.push(deleteContent1);
  //   }
  //   return acc;
  // }, []);

  // const result = `{\n${diffBody.join('\n')}\n}`;
  const AST = buildAST(content1, content2, keys, keys1, keys2);
  // console.log(AST);
  const result = getFormatDiff(AST, format);
  // console.log(result);
  return result;
};

export default action;
