const Scli = require('../../lib/slack');

const token = process.env.SLACK_TOKEN;

describe('Scli', () => {
	const scli = new Scli(token);

	const authSpy = jest.spyOn(scli, 'auth');

	describe('defines auth()', () => {
		it('should be auth() a function', () => {
			expect(typeof scli.auth).toBe('function');
		});

		it('should pass auth()', async () => {
			const result = await scli.auth(token);
			expect(result).toBe(true);
		});

		it('should have been called with token parameter', () => {
			expect(authSpy).toHaveBeenCalledWith(token);
		});
	});

	describe('defines postMessage()', () => {
		it('should be postMessage() a function', () => {
			expect(typeof scli.postMessage).toBe('function');
		});

		it('should send message', async () => {
			await scli.auth(token);
			const received = await scli.postMessage('C039WTKTC9L', 'my hello from test');
			const expected = 'Message send successfully.';
			expect(received).toEqual(expected);
		});
	});

	describe('defines getAllChannels()', () => {
		it('should be getAllChannels() a function', () => {
			expect(typeof scli.getAllChannels).toBe('function');
		});

		it('should get all channels', async () => {
			await scli.auth(token);
			const received = await scli.getAllChannels();
			console.log(received);
			const expected = received;
			expect(received).toEqual(expected);
		});
	});

	describe('defines getConversationHistory()', () => {
		it('should be getConversationHistory() a function', () => {
			expect(typeof scli.getConversationHistory).toBe('function');
		});

		it('should get all conversation from channel', async () => {
			await scli.auth(token);
			const received = await scli.getConversationHistory('C039WTKTC9L');
			const expected = received;
			expect(received).toEqual(expected);
		});
	});
});
