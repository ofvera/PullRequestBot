import { fetchOpenPullRequests } from '@/src/services/github';
import { sendUpdate } from '@/src/services/slack';
import config from '@/src/config';

export async function GET() {
  console.log('Starting cron job execution');
  
  try {
    // Validate configuration
    const requiredEnvVars = [
      'GITHUB_TOKEN',
      'GITHUB_OWNER',
      'GITHUB_REPOS',
      'SLACK_BOT_TOKEN',
      'SLACK_SIGNING_SECRET',
      'SLACK_CHANNEL_ID'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    console.log('Configuration validated');
    console.log('GitHub Owner:', config.github.owner);
    console.log('GitHub Repos:', config.github.repos);
    console.log('Slack Channel:', config.slack.channelId);

    // Fetch PRs
    console.log('Fetching pull requests...');
    const prs = await fetchOpenPullRequests();
    console.log(`Found ${prs.length} total pull requests`);

    // Send update
    console.log('Sending Slack update...');
    const success = await sendUpdate(prs);

    if (!success) {
      throw new Error('Failed to send Slack update');
    }

    console.log('Slack update sent successfully');

    return Response.json({
      success: true,
      prCount: prs.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in cron job:', {
      message: error.message,
      stack: error.stack,
      config: {
        githubOwner: config.github.owner,
        githubRepos: config.github.repos,
        slackChannel: config.slack.channelId
      }
    });

    return Response.json(
      { 
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}