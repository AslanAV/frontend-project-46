import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const getFormatDiff = (diff, format) => {
  if (format === 'plain') {
    return plainFormatter(diff);
  }
  if (format === 'json') {
    return jsonFormatter(diff);
  }

  return stylishFormatter(diff);
};

export default getFormatDiff;
