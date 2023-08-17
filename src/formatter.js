import { default as stylishFormatter } from './formatters/stylish.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return stylishFormatter(diff);
  }
}

export default getFormatDiff;