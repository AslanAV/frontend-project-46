import * as fs from 'node:fs';
import * as path from 'path';
import getContent from './src/parsers.js';
import buildAST from './src/buildAST.js';
import getFormatDiff from './src/formatters/index.js';

const getContentFromFiles = (filePath) => {
  const dataRow = fs.readFileSync(filePath, 'utf-8');
  const extName = path.extname(filePath);
  return getContent(dataRow, extName);
};
const action = (filePath1, filePath2, format) => {
  const content1 = getContentFromFiles(filePath1);
  const content2 = getContentFromFiles(filePath2);

  const astTree = buildAST(content1, content2);
  return getFormatDiff(astTree, format);
};

export default action;
