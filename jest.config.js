/**
 * This is JEST CONFIG FILE
 * Configure the jest coverage units
 * and much more
 * */
module.exports = {
	verbose: true,
	testEnvironment: 'node',
	collectCoverage: true,
	coverageReporters: ['lcov', 'json', 'text', 'html'],
	reporters: [
		'default',
		[
			'./node_modules/jest-html-reporter',
			{
				pageTitle: 'SCLI - Slack CLI',
				outputPath: 'test-report/index.html',
				includeFailureMsg: true,
			},
		],
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	setupFiles: ['dotenv/config'],
};
