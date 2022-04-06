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
			branches: 85,
			functions: 85,
			lines: 85,
			statements: 85,
		},
	},
};
