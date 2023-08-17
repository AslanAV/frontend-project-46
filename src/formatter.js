import stylishFormatter from './formatters/stylish.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return stylishFormatter(diff);
  }
  throw new Error('Format is incorrect!');
};

export default getFormatDiff;
