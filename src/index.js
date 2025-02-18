const { App } = require('@slack/bolt');
const { Octokit } = require('@octokit/rest');
const cron = require('node-cron');
require('dotenv').config();

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Configuration
const CONFIG = {
  owner: process.env.GITHUB_OWNER,
  repo: process.env.GITHUB_REPO,
  slackChannel: process.env.SLACK_CHANNEL_ID,
  cronSchedule: '0 10 * * 1-5' // 10:00 AM on weekdays
};

async function fetchOpenPullRequests() {
  try {
    const { data: pulls } = await octokit.pulls.list({
      owner: CONFIG.owner,
      repo: CONFIG.repo,
      state: 'open',
      sort: 'updated',
      direction: 'desc'
    });

    return pulls;
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    return [];
  }
}

function formatPRMessage(prs) {
  if (prs.length === 0) {
    return "No open pull requests at the moment.";
  }

  const header = ":github: *Open Pull Requests Update*\n\n";
  const prList = prs.map(pr => {
    const age = Math.floor((new Date() - new Date(pr.created_at)) / (1000 * 60 * 60 * 24));
    return `• <${pr.html_url}|${pr.title}>\n   *Author:* ${pr.user.login} | *Age:* ${age} days | *Reviews:* ${pr.requested_reviewers.length}`;
  }).join('\n\n');

  return `${header}${prList}`;
}

async function sendSlackUpdate() {
  try {
    const prs = await fetchOpenPullRequests();
    const message = formatPRMessage(prs);

    await app.client.chat.postMessage({
      channel: CONFIG.slackChannel,
      text: message,
      parse: 'mrkdwn'
    });
  } catch (error) {
    console.error('Error sending Slack message:', error);
  }
}

// Schedule updates
cron.schedule(CONFIG.cronSchedule, sendSlackUpdate);

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ GitHub PR Slack Bot is running!');
})();
