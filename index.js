#!/usr/bin/env node
require('dotenv').config();

const clear = require('clear');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const lib = require('./lib/functions');

const token = process.env.SLACK_TOKEN;

/**
 * This function is the starting point of the application
 * @function main
 */
const main = async () => {
	clear();
	lib.displayMessage();
	const args = argv._.length ? argv._ : ['help'];
	const result = await lib.parseCommands(args, token);
	console.log(chalk.yellowBright(`Result of ${result.input} operation:`));
	console.log(`${chalk[result.color](result.message)}\n`);
};

main();
