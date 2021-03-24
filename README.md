# serverlessTelegramMemeBot
Serverless telegram meme bot using AWS Lambda and AWS DynamoDB.

**Deployment**
To deploy this bot:
1. run ```npm run deploy```
2. Than you should set webhook ```curl --data "url=<INVOKE_URL>" "https://api.telegram.org/bot<TELEGRAM_ACCESS_TOKEN>/setWebhook"```
Where ```TELEGRAM_ACCESS_TOKEN``` is your telegram bot token.
And ```INVOKE_URL``` is API endpoint of your lambda's API Gateway, that is deployed earler at step 1.

**Discription**
This bot supports two languages english and russion. It depends on what language is using a device. Default language is english.
There are three roles: admin, moderator, user for this bot.

Admin can:
* get meme
* upload meme
* see who has uploaded meme
* block users who has uploaded meme
* delete meme

Moderator can:
* get meme
* upload meme
* gets all uploading memes from other users (if there are several moderators, the meme will be sent to random one)
* can delete memes from users but not when moderater uses "get meme"
* see who has uploaded meme

User can:
* get meme
* upload meme
