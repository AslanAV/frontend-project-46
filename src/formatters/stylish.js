const buildFormatDiff = (diff) => {
  const shiftToTheLeft = 2;
  const spacesIndent = 4;
  const indent = ' ';
  const addIndent = '+ ';
  const deleteIndent = '- ';
  const unchangedIndent = '  ';
  const iter = (AST, depth) => {
    const keysAST = Object.keys(AST);
    return keysAST.reduce((acc, key) => {
      // console.log('AST[key]: ', AST[key])
      let line;
      if (AST[key].type === 'children') {
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${unchangedIndent}${key}: {\n${iter(AST[key].value, depth + 1).join('')}\n${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${unchangedIndent}}\n`;
        acc.push(line);
        return acc;
      }
      if (AST[key].type === 'delete') {
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${deleteIndent}${key}: ${AST[key].value}\n`;
        acc.push(line);
        return acc;
      }
      if (AST[key].type === 'add') {
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${addIndent}${key}: ${AST[key].value}\n`;
        acc.push(line);
        return acc;
      }
      if (AST[key].type === 'unchanged') {
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${unchangedIndent}${key}: ${AST[key].value}\n`;
        acc.push(line);
        return acc;
      }
      if (AST[key].type === 'changed') {
        line = `${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${deleteIndent}${key}: ${AST[key].value}\n${indent.repeat(spacesIndent * depth - shiftToTheLeft)}${addIndent}${key}: ${AST[key].value2}\n`;
        acc.push(line);
        return acc;
      }
    }, []);
  };
  const body = iter(diff, 1).join('');
  const resultWithFigureBraces = `{\n${body}\n}`;
  return resultWithFigureBraces;
};

export default buildFormatDiff;