# SCLI - SLACK CLI
A Node.js based Command Line Interface (CLI) for Slack making
use of Slack APIs - (Refer to https://api.slack.com/methods)

![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/main_screen.png)

## Tools
- Node.Js - LTS || 17.6.0
- @slack/web-api - for making requests to Slack's Web API
- jest - for unit testing
- jest-html-reporter - for code coverage

## Installation
- Run Command `sudo npm install -g`
> Please enter the password to install the CLI gloablly

## Authentication
- Oauth Tokens have been used for authentication
- We have slack's auth.test method to check if token is valid or not.
- Oauth Token expires in 1 day
- If expires, please follow the steps:
  - Create a new slack app
  - Go To your app dashboard in api.slack.com
  - Go to Oauth&Permissions Tab
  - Generate New Bot Token
  - Give Your App OAuth Access
  - Add your app to the channel you wish to interact

## Usage
1. SET SLACK_TOKEN to your .env file `SLACK_TOKEN=YOUR_TOKEN`.
2. Command `scli help` - will display all supported commands.
   1. ![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/help_oper.png)
3. Command `scli version` - will display the version of the scli version.
   1. ![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/version.png)
4. Command `scli list-chan` - will list all channels with their name and channel Id.
   1. ![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/list-chan.png)
5. Command `scli send CHANNEL_ID YOUR_MESSAGE` - will send the message to particular channel.
   1. ![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/send.png)
6. Command `scli list-conv CHANNEL_ID` - will fetch all previous conversations from that channel.
   1. ![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/list-conv.png)

## Unit Testing

- Framework - Jest
![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/test-case-1.png)
![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/test-case-2.png)

## Code Coverage
- Framework - Jest-Html_Reporter
![This is an image](https://github.com/amulyakashyap09/scli/blob/main/screenshots/coverage.png)

## Documentation
- JsDoc3 has been used for the documentation
- Every function has self explanatory comment

## Thank You :)



