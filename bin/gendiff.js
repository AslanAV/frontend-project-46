#!/usr/bin/env node

import { Command } from 'commander';
import action from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0');

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format');

const command = (filePath1, filePath2, format) => {
  action(filePath1, filePath2, format);
};
program.parse(process.argv);

const { args: [filePath1, filePath2] } = program;
const options = program.opts();
const { format } = options;
command(filePath1, filePath2, format);
