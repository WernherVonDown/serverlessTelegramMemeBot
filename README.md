# serverlessTelegramMemeBot
Serverless telegram meme bot using AWS Lambda and AWS DynamoDB.

1. To deploy this bot, write ```npm run deploy```
2. Than you should set webhook ```curl --data "url=<INVOKE_URL>" "https://api.telegram.org/bot<TELEGRAM_ACCESS_TOKEN>/setWebhook"```
Where ```TELEGRAM_ACCESS_TOKEN``` is your telegram bot token.
And ```INVOKE_URL``` is API endpoint of your lambda's API Gateway, that is deployed earler at step 1.
