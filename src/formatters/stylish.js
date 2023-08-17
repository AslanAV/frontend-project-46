const shiftToTheLeft = 2;
const spacesIndent = 4;
const indent = ' ';
const addIndent = '+ ';
const deleteIndent = '- ';
const unchangedIndent = '  ';

const normalizeValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const iter = (value, depth) => {
    const keys = Object.keys(value);
    const body = keys.reduce((acc, key) => {
      let line;
      if (value[key] instanceof Object ) {
        console.log(spacesIndent, depth, shiftToTheLeft)
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${unchangedIndent}${key}: {\n${iter(value[key], depth + 1)}${indent.repeat(spacesIndent * (depth))}}\n`;
      } else {
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${unchangedIndent}${key}: ${value[key]}\n`;
      }
      acc.push(line);
      return acc;
    }, []);
    return `${body.join('')}`;
  };
  return `{\n${iter(value, depth)}${indent.repeat(spacesIndent * (depth - 1))}}`;
};

const buildFormatDiff = (diff) => {
  const iter = (AST, depth) => {
    const keysAST = Object.keys(AST);
    return keysAST.reduce((acc, key) => {
      let line;
      if (AST[key].type === 'children') {
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${unchangedIndent}${key}: {\n${iter(AST[key].value, depth + 1).join('')}${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${unchangedIndent}}\n`;
        acc.push(line);
        return acc;
      }
      if (AST[key].type === 'delete') {
        const newValue = normalizeValue(AST[key].value, depth + 1);
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${deleteIndent}${key}: ${newValue}\n`;
        acc.push(line);
        return acc;
      }
      if (AST[key].type === 'add') {
        const newValue = normalizeValue(AST[key].value, depth + 1);
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${addIndent}${key}: ${newValue}\n`;
        acc.push(line);
        return acc;
      }
      if (AST[key].type === 'unchanged') {
        const newValue = normalizeValue(AST[key].value, depth + 1);
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${unchangedIndent}${key}: ${newValue}\n`;
        acc.push(line);
        return acc;
      }
      if (AST[key].type === 'changed') {
        const newValue = normalizeValue(AST[key].value, depth + 1);
        const newValue2 = normalizeValue(AST[key].value2, depth + 1);
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${deleteIndent}${key}: ${newValue}\n${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${addIndent}${key}: ${newValue2}\n`;
        acc.push(line);
        return acc;
      }
    }, []);
  };
  const body = iter(diff, 1).join('');
  const resultWithFigureBraces = `{\n${body}}`;
  return resultWithFigureBraces;
};

export default buildFormatDiff;