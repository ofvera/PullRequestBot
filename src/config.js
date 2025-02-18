require('dotenv').config();

module.exports = {
  github: {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
  },
  slack: {
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    channelId: process.env.SLACK_CHANNEL_ID,
  },
  app: {
    port: process.env.PORT || 3000,
    cronSchedule: process.env.CRON_SCHEDULE || '0 10 * * 1-5',
  }
};