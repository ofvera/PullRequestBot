// src/config.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Parse repos from environment variable
const parseRepos = () => {
  try {
    return process.env.GITHUB_REPOS.split(',').map(repo => repo.trim());
  } catch (error) {
    console.error('Error parsing GITHUB_REPOS:', error);
    return [];
  }
};

export default {
  github: {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repos: parseRepos(),
  },
  slack: {
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    channelId: process.env.SLACK_CHANNEL_ID,
  },
  app: {
    port: process.env.PORT || 3000,
    cronSchedule: process.env.CRON_SCHEDULE || '55 16 * * 1-5'
  }
};