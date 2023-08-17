import yaml from 'js-yaml';

const getContent = (dataRow, extName) => {
  if (extName === '.json') {
    return JSON.parse(dataRow);
  }

  if (extName === '.yaml' || extName === '.yml') {
    return yaml.load(dataRow);
  }
  return '';
};

export default getContent;
