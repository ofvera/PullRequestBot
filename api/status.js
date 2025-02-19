// api/status.js
import { Octokit } from '@octokit/rest';
import pkg from '@slack/bolt';
const { App } = pkg;
import config from '../src/config.js';

export default async function handler(req, res) {
  try {
    const slackApp = new App({
      token: config.slack.token,
      signingSecret: config.slack.signingSecret,
    });

    const octokit = new Octokit({
      auth: config.github.token
    });

    // Check GitHub connection
    const githubStatus = await Promise.all(config.github.repos.map(async (repo) => {
      try {
        const { data } = await octokit.repos.get({
          owner: config.github.owner,
          repo: repo
        });
        return {
          name: repo,
          status: 'connected',
          openIssues: data.open_issues_count,
          stars: data.stargazers_count
        };
      } catch (error) {
        return {
          name: repo,
          status: 'error',
          error: error.message
        };
      }
    }));

    // Check Slack connection
    let slackStatus;
    try {
      await slackApp.client.auth.test();
      slackStatus = {
        status: 'connected',
        channel: config.slack.channelId
      };
    } catch (error) {
      slackStatus = {
        status: 'error',
        error: error.message
      };
    }

    // Get next scheduled run
    const now = new Date();
    const scheduleTime = "12:00"; // UTC time for 9 AM Santiago
    const [scheduleHour, scheduleMinute] = scheduleTime.split(':').map(Number);
    
    let nextRun = new Date(now);
    nextRun.setUTCHours(scheduleHour, scheduleMinute, 0, 0);
    
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }

    // Skip weekends
    while (nextRun.getDay() === 0 || nextRun.getDay() === 6) {
      nextRun.setDate(nextRun.getDate() + 1);
    }

    res.status(200).json({
      botStatus: {
        version: "1.0.0",
        lastCheck: new Date().toISOString(),
        nextScheduledRun: nextRun.toISOString(),
        timezone: "UTC",
        cronSchedule: "0 12 * * 1-5" // 9 AM Santiago time
      },
      githubStatus,
      slackStatus
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}