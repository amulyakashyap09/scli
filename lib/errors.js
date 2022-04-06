/**
 * This is ERROR MAP
 * It will contain all errors 
 * will export from here
 * DO NOT USE HARDCODE ERROR ANYWHERE ELSE IN THE REPO
 */
module.exports = {
	NO_TOKEN_ERROR: {
		color: 'red',
		message: 'NO-TOKEN-ERROR: Please enter token.',
	},
	AUTH_ERROR: {
		color: 'red',
		message: 'AUTH-ERROR: Please enter a valid token.',
	},
	ARGS_ERROR: {
		color: 'red',
		message: 'ARGS-ERROR: Please pass valid arguments to the function.',
	},
	SEND_ERROR: {
		color: 'red',
		message: 'SEND-ERROR: Please enter both channelId and message to send a message.',
	},
	LIST_CONV_ERROR: {
		color: 'red',
		message: 'LIST-CONV-ERROR: Please enter channelId to list all conversations.',
	},
	EXPLAIN_ERROR: {
		color: 'red',
		message: 'EXPLAIN-ERROR: Please enter command-name to be explained.',
	},
	INVALID_COMMAND: {
		color: 'red',
		message: 'INVALID-COMMAND-ERROR: Invalid / Unsupported command.',
	},
};
