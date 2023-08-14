import yaml from 'js-yaml';

const getContent = (dataRow, extName) => {
  let parse;
  if (extName === '.json') {
    parse = JSON.parse;
  } else if (extName === '.yaml' || extName === '.yml') {
    parse = yaml.load;
  }
  return parse(dataRow);
};

export default getContent;
