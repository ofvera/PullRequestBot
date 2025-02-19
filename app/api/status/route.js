import { Octokit } from '@octokit/rest';
import { App } from '@slack/bolt';
import config from '@/src/config';
import { parseVercelConfig, getNextRunTime } from '@/src/utils/cronUtils';

export async function GET() {
  try {
    const slackApp = new App({
      token: config.slack.token,
      signingSecret: config.slack.signingSecret,
    });

    const octokit = new Octokit({
      auth: config.github.token
    });

    // Get cron configuration
    const cronConfig = parseVercelConfig();
    if (!cronConfig) {
      throw new Error('Could not parse cron configuration');
    }

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

    // Calculate next run time
    const nextRun = getNextRunTime(cronConfig.schedule);

    return Response.json({
      botStatus: {
        version: "1.0.0",
        lastCheck: new Date().toISOString(),
        nextScheduledRun: nextRun.toISOString(),
        timezone: "UTC",
        cronSchedule: cronConfig.schedule,
        cronPath: cronConfig.path
      },
      githubStatus,
      slackStatus
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}