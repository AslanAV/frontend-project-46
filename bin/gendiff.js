#!/usr/bin/env node

import { Command } from 'commander';
import action from '../index.js';

const program = new Command();

program
  .name('genDiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0');

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish');

const command = (filePath1, filePath2, format) => {
  const result = action(filePath1, filePath2, format);
  console.log(result);
};
program.parse(process.argv);

const { args: [filePath1, filePath2] } = program;
const { format } = program.opts();
command(filePath1, filePath2, format);
