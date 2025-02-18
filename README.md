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
- `CRON_SCHEDULE`: Cron schedule for updates (default: 10 AM on weekdays)

## Deployment

Free deployment @ Vercel (Recommended):

Sign up for a free account at vercel.com
Install Vercel CLI: npm i -g vercel
Run vercel in your project directory
Set up environment variables in the Vercel dashboard
The bot will be deployed and get a URL

To deploy to Vercel:

Push your code to GitHub
Run these commands:

```
npm i -g vercel
vercel login
vercel
```

Set up environment variables in the Vercel dashboard
Done! Your bot will be deployed and get a URL