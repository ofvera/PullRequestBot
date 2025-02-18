// src/services/github.js
import { Octokit } from '@octokit/rest';
import config from '../config.js';

const octokit = new Octokit({
  auth: config.github.token
});

async function fetchOpenPullRequests() {
  try {
    const allPRs = await Promise.all(
      config.github.repos.map(async (repo) => {
        try {
          const { data: pulls } = await octokit.pulls.list({
            owner: config.github.owner,
            repo: repo,
            state: 'open',
            sort: 'updated',
            direction: 'desc'
          });

          return pulls.map(pr => ({
            ...pr,
            repository: repo
          }));
        } catch (error) {
          console.error(`Error fetching PRs for ${repo}:`, error);
          return [];
        }
      })
    );

    return allPRs
      .flat()
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    return [];
  }
}

export { fetchOpenPullRequests };