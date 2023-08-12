#!/usr/bin/env node

import { Command } from 'commander';
import run from "../index.js";

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference')
    .version('1.0.0');

program
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format');

const command = (filePaths, format) => {
    run(filePaths, format);
}
program.parse(process.argv);

const { args } = program;
const options = program.opts();
const { format } = options;
command(args, format);