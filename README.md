# GitHub PR Slack Bot

A Slack bot that provides scheduled updates about open pull requests in your GitHub repository.

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials
3. Install dependencies: `npm install`
4. Run locally: `npm run dev`

## Environment Variables

- `SLACK_BOT_TOKEN`: Your Slack Bot User OAuth Token
- `SLACK_SIGNING_SECRET`: Your Slack App Signing Secret
- `GITHUB_TOKEN`: Your GitHub Personal Access Token
- `GITHUB_OWNER`: Repository owner/organization name
- `GITHUB_REPO`: Repository name
- `SLACK_CHANNEL_ID`: Slack channel ID for updates
- `CRON_SCHEDULE`: Cron schedule for updates (default: 9 AM GMT-3 on weekdays)

## Deployment

Sign up for a free account at vercel.com

To deploy to Vercel:

Push your code to GitHub
Run these commands:

```
npm i -g vercel
vercel login
vercel

#When updating simply run
vercel --prod
```

Set up environment variables in the Vercel dashboard
Done! Your bot will be deployed and get a URL