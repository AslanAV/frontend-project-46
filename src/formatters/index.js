import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const getFormatDiff = (diff, format) => {
  if (format === 'stylish') {
    return stylishFormatter(diff);
  }
  if (format === 'plain') {
    return plainFormatter(diff);
  }
  if (format === 'json') {
    return jsonFormatter(diff);
  }
  throw new Error('Format is incorrect!');
};

export default getFormatDiff;
