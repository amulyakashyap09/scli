const lib = require('../../lib/functions');
const errors = require('../../lib/errors');

const token = process.env.SLACK_TOKEN;

describe('Testing lib functions', () => {
	it('should return help commands from help function', () => {
		const actual = lib.helpCommands();
		const expected = '1. list-chan - lists all channels\n2. send - sends message to a channel\n3. list-conv - lists all conversations from a channel\n4. help - displays supported commands of scli\n5. version - displays version of this scli\n6. explain - explain commands syntax';
		expect(actual).toEqual(expected);
	});

	it('should return scli version from getVersion function', () => {
		const actual = lib.getVersion();
		const expected = '1.0.0';
		expect(actual).toEqual(expected);
	});

	it('should return title from getTitle function', () => {
		let actual = lib.getTitle('figlet');
		let expected = 'SCLI - SLACK CLI';
		expect(actual).toEqual(expected);

		actual = lib.getTitle('title');
		expected = 'Welcome to Slack CLI';
		expect(actual).toEqual(expected);

		actual = lib.getTitle('loc');
		expected = 'List of commands';
		expect(actual).toEqual(expected);

		actual = lib.getTitle('');
		expected = 'SCLI - SLACK CLI';
		expect(actual).toEqual(expected);
	});

	it('should return explain syntax from explain function', () => {
		const actual = lib.explain('send');
		const expected = 'SYNTAX : scli send channelId message | Sends message to a particular channel.';
		expect(actual).toEqual(expected);
	});

	it('should not return anything from displayMessage function', () => {
		const actual = lib.displayMessage();
		const expected = undefined;
		expect(actual).toEqual(expected);
	});

	it('should return args error from parseCommands function', async () => {
		const actual = await lib.parseCommands([], token);
		const expected = {input: '', ...errors.ARGS_ERROR};
		expect(actual).toEqual(expected);
	});

	it('should return no token error from parseCommands function', async () => {
		const actual = await lib.parseCommands(['help']);
		const expected = {input: 'help', ...errors.NO_TOKEN_ERROR};
		expect(actual).toEqual(expected);
	});

	it('should return auth error from parseCommands function', async () => {
		const actual = await lib.parseCommands(['help'], 'INVALID_TOKEN');
		const expected = {input: 'help', ...errors.AUTH_ERROR};
		expect(actual).toEqual(expected);
	});

	it('should return invalid command error from parseCommands function', async () => {
		const actual = await lib.parseCommands(['adsxs'], token);
		const expected = {input: 'adsxs', ...errors.INVALID_COMMAND};
		expect(actual).toEqual(expected);
	});

	it('should return error for send command from parseCommands function', async () => {
		const actual = await lib.parseCommands(['send', 'invalid'], token);
		const expected = {input: 'send', ...errors.SEND_ERROR};
		expect(actual).toEqual(expected);
	});

	it('should return error for list-conv command from parseCommands function', async () => {
		const actual = await lib.parseCommands(['list-conv'], token);
		const expected = {input: 'list-conv', ...errors.LIST_CONV_ERROR};
		expect(actual).toEqual(expected);
	});

	it('should return error for explain command from parseCommands function', async () => {
		const actual = await lib.parseCommands(['explain'], token);
		const expected = {input: 'explain', ...errors.EXPLAIN_ERROR};
		expect(actual).toEqual(expected);
	});

	it('should return error formatted object from formatError function', async () => {
		const actual = await lib.formatError('explain', errors.EXPLAIN_ERROR);
		const expected = {input: 'explain', ...errors.EXPLAIN_ERROR};
		expect(actual).toEqual(expected);
	});

	it('should return the expected response structure from parseCommands function', async () => {
		const actual = await lib.parseCommands(['version'], token);
		const expected = {
			input: 'version',
			message: 'Current version of SCLI is 1.0.0.',
			color: 'cyan',
		};
		expect(actual).toEqual(expected);
	});

	it('should return the list-chan response structure from parseCommands function', async () => {
		const actual = await lib.parseCommands(['list-chan'], token);
		const expected = {
			input: 'list-chan',
			message: actual.message,
			color: 'cyan',
		};
		expect(actual).toEqual(expected);
	});

	it('should return the help response structure from parseCommands function', async () => {
		const actual = await lib.parseCommands(['help'], token);
		const expected = {
			input: 'help',
			message: actual.message,
			color: 'cyan',
		};
		expect(actual).toEqual(expected);
	});

	it('should return the send response structure from parseCommands function', async () => {
		const actual = await lib.parseCommands(['send', 'C039WTKTC9L', 'my hello'], token);
		const expected = {
			input: 'send',
			message: 'Message send successfully.',
			color: 'cyan',
		};
		expect(actual).toEqual(expected);
	});

	it('should return the list-conv response structure from parseCommands function', async () => {
		const actual = await lib.parseCommands(['list-conv', 'C039WTKTC9L'], token);
		const expected = {
			input: 'list-conv',
			message: actual.message,
			color: 'cyan',
		};
		expect(actual).toEqual(expected);
	});

	it('should return the explain response structure from parseCommands function', async () => {
		const actual = await lib.parseCommands(['explain', 'version'], token);
		const expected = {
			input: 'explain',
			message: actual.message,
			color: 'cyan',
		};
		expect(actual).toEqual(expected);
	});
});
