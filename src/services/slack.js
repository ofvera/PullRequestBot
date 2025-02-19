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

  const header = ":eyes: *Open Pull Requests Update*\n\n";
  
  // Group PRs by repository
  const prsByRepo = prs.reduce((acc, pr) => {
    if (!acc[pr.repository]) {
      acc[pr.repository] = [];
    }
    acc[pr.repository].push(pr);
    return acc;
  }, {});

  // Format each repository's PRs
  const repoSections = Object.entries(prsByRepo).map(([repo, repoPRs]) => {
    const repoHeader = `*${repo}* (${repoPRs.length} open PRs)`;
    const prList = repoPRs.map(pr => {
      const age = Math.floor((new Date() - new Date(pr.created_at)) / (1000 * 60 * 60 * 24));
      return `• <${pr.html_url}|${pr.title}>\n   *Author:* ${pr.user.login} | *Age:* ${age} days | *Reviews:* ${pr.requested_reviewers.length}`;
    }).join('\n\n');
    
    return `${repoHeader}\n${prList}`;
  }).join('\n\n---\n\n');

  return `${header}${repoSections}`;
}

async function sendUpdate(prs) {
  try {
    const message = formatPRMessage(prs);
    await app.client.chat.postMessage({
      channel: config.slack.channelId,
      text: message,
      parse: 'mrkdwn'
    });
    return true;
  } catch (error) {
    console.error('Error sending Slack message:', error);
    return false;
  }
}

module.exports = {
  sendUpdate
};