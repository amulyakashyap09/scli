const figlet = require('figlet');
const chalk = require('chalk');
const pkgFile = require('../package.json');
const SlackApi = require('./slack');
const errors = require('./errors');

/**
 * Map of ALL VALID COMMANDS
 * Supported by SCLI
 */
const commandsMap = {
	'list-chan': {
		syntax: 'scli list-chan | Displays all the accessible channels with their Ids.',
		argCount: 0,
	},
	send: {
		syntax: 'scli send channelId message | Sends message to a particular channel.',
		argCount: 2,
		error: errors.SEND_ERROR,
	},
	'list-conv': {
		syntax: 'scli list-conv channelId | Lists all previous conversations of the particular channel.',
		argCount: 1,
		error: errors.LIST_CONV_ERROR,
	},
	help: {
		syntax: 'scli help | Lists all the supported commands by scli.',
		argCount: 0,
	},
	version: {
		syntax: 'scli version | Displays current version of scli.',
		argCount: 0,
	},
	explain: {
		syntax: 'scli explain command-name | Displays the syntax for the input command.',
		argCount: 1,
		error: errors.EXPLAIN_ERROR,
	},
};

/**
 * @function helpCommands returns the help command for user guidance 
 * @returns {String}
 */
const helpCommands = () => '1. list-chan - lists all channels\n2. send - sends message to a channel\n3. list-conv - lists all conversations from a channel\n4. help - displays supported commands of scli\n5. version - displays version of this scli\n6. explain - explain commands syntax';

/**
 * @function getVersion returns SCLI current version
 * @returns {String}
 */
const getVersion = () => pkgFile.version || '1.0.0';

/**
 * @function getTitle returns Title according to the input
 * @param {String} type
 * @returns {String}
 */
const getTitle = (type) => {
	let msg = '';
	switch (type) {
		case 'figlet':
			msg = 'SCLI - SLACK CLI';
			break;
		case 'title':
			msg = 'Welcome to Slack CLI';
			break;
		case 'loc':
			msg = 'List of commands';
			break;
		default:
			msg = 'SCLI - SLACK CLI';
	}
	return msg;
};

/**
 * @function explain returns syntax of the command in the input.
 * @param {String} command
 * @returns {String}
 */
const explain = (command) => (commandsMap[command] ? `SYNTAX : ${commandsMap[command].syntax}` : `SYNTAX : ${commandsMap.help.syntax}`);


/**
 * @function displayMessage prints on the console
 */
const displayMessage = () => {
	const figletTitle = getTitle('figlet');
	const subTitle = getTitle('title');
	const loc = getTitle('loc');
	const commandsSupported = helpCommands();
	const cliVersion = getVersion();

	console.log(chalk.yellow(figlet.textSync(figletTitle, { horizontalLayout: 'full' })));
	console.log(`${chalk.green(`${subTitle} - ${cliVersion}`)}\n`);
	console.log(`${chalk.green(loc)}\n`);
	console.log(`${chalk.yellow(commandsSupported)}\n`);
	console.log(chalk.magenta('USAGE \n'));
	Object.keys(commandsMap).forEach((key) => {
		console.log(chalk.magenta(`* ${key}`) + chalk.yellow(' => ') + chalk.green(commandsMap[key].syntax));
	});
	console.log(`\n${chalk.blueBright('Example: scli explain send')}\n`);
};

/**
 * @function formatError returns error Object after combining with other props.
 * @param {String} input
 * @param {Object} err
 * @returns {Object}
 */
const formatError = (input, err) => {
	return { input, ...err };
}

/**
 * @function parseCommands parses the command by user and returns the output object.
 * @param {Array.<String>} argv
 * @param {String} token
 * @returns {Object}
 */
const parseCommands = async (argv, token) => {
	try {
		if (argv.length < 1) return formatError('', errors.ARGS_ERROR);
		if (!token) return formatError(argv[0], errors.NO_TOKEN_ERROR);

		const commandDetails = commandsMap[argv[0].toLowerCase()];
		if (!commandDetails) return formatError(argv[0], errors.INVALID_COMMAND);

		let scli = new SlackApi(token);
		const isTokenValid = await scli.auth();
		if (!isTokenValid) return formatError(argv[0], errors.AUTH_ERROR);

		let message = '';

		switch (argv[0].toLowerCase()) {
			case 'list-chan':
				message = await scli.getAllChannels();
				break;
			case 'send':
				if (argv.length !== commandDetails.argCount + 1) return formatError(argv[0], commandDetails.error);
				message = await scli.postMessage(argv[1], argv[2]);
				break;
			case 'list-conv':
				if (argv.length !== commandDetails.argCount + 1) return formatError(argv[0], commandDetails.error);
				message = `Conversation History \n\n${await scli.getConversationHistory(argv[1])}\n Completed. \n`;
				break;
			case 'help':
				message = `\nAll the supported commands are as follows :\n${helpCommands()}`;
				break;
			case 'version':
				message = `Current version of SCLI is ${getVersion()}.`;
				break;
			case 'explain':
				if (argv.length !== commandDetails.argCount + 1) return formatError(argv[0], commandDetails.error);
				message = explain(argv[1]);
				break;
			default:
				return formatError(argv[0], errors.INVALID_COMMAND);
		}
		return {
			input: argv[0].toLowerCase(),
			color: 'cyan',
			message,
		};
	} catch (e) {
		return {
			input: argv[0].toLowerCase(),
			color: 'red',
			message: e.message,
		};
	}
};

module.exports = {
	parseCommands,
	helpCommands,
	getVersion,
	getTitle,
	displayMessage,
	explain,
	formatError
};
