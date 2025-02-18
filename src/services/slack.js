const { App } = require('@slack/bolt');
const config = require('../config');

const app = new App({
  token: config.slack.token,
  signingSecret: config.slack.signingSecret,
});

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

async function sendUpdate(prs) {
  try {
    const message = formatPRMessage(prs);
    await app.client.chat.postMessage({
      channel: config.slack.channelId,
      text: message,
      parse: 'mrkdwn'
    });
  } catch (error) {
    console.error('Error sending Slack message:', error);
  }
}

module.exports = {
  app,
  sendUpdate
};
