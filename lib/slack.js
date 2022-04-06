const { WebClient } = require('@slack/web-api');
const errors = require('./errors');

/**
	* This Class handles the slack web api interaction
	* @class Scli
  */
module.exports = class Scli {

	/**
	 * Represents a token.
	 * @constructor
	 */
	constructor(token) {
		if (!token) throw new Error(errors.TOKEN_ERROR);
		this.token = token;
		this.clientWithoutToken = new WebClient();
		this.web = null;
	}

	/**
    * This function checks if token is Valid or not.
    * @function auth
		* @param {String} token
    * @memberOf module.exports.Scli
    */
	async auth(token = this.token) {
		try {
			const authResult = await this.clientWithoutToken.auth.test({ token });
			if (authResult.ok) {
				this.web = new WebClient(this.token);
				return true;
			}
			return false;	
		} catch (error) {
			return false;	
		}
	}

	/**
    * This function sends message to channel using slack web api.
    * @function postMessage
		* @param {String} channelId
		* @param {String} message
    * @memberOf module.exports.Scli
    */
	async postMessage(channelId, message) {
		if (!channelId || !message) throw new Error(errors.SEND_ERROR);
		await this.web.chat.postMessage({
			channel: channelId,
			text: message,
		});
		return 'Message send successfully.';
	}

	/**
    * This function fetches all channels where bot is installed / has access.
    * @function getAllChannels
    * @memberOf module.exports.Scli
    */
	async getAllChannels() {
		const conversations = await this.web.conversations.list();
		const channels = conversations.channels.map((ch) => `* ${ch.name} => ${ch.id}\n`);
		channels.unshift('\nChannel Name => Channel Id\n\n');
		channels.push('\nUse channel Ids to send the messages\n');
		return channels.join('');
	}

	/**
    * This function fetches all conversations from channel using slack web api.
    * @function getConversationHistory
		* @param {String} channelId
    * @memberOf module.exports.Scli
    */
	async getConversationHistory(channelId) {
		if (!channelId) throw new Error(errors.LIST_CONV_ERROR);
		const history = await this.web.conversations.history({ channel: channelId });
		const messages = history.messages.map((msg) => `=> User ${msg.bot_id || msg.client_msg_id} : ${msg.text}`) || [];
		return messages.join('\n');
	}
};
