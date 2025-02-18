const { Octokit } = require('@octokit/rest');
const config = require('../config');

const octokit = new Octokit({
  auth: config.github.token
});

async function fetchOpenPullRequests() {
  try {
    const { data: pulls } = await octokit.pulls.list({
      owner: config.github.owner,
      repo: config.github.repo,
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

module.exports = {
  fetchOpenPullRequests
};
