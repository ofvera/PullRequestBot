const fs = require('fs');
const path = require('path');

function parseVercelConfig() {
  try {
    const configPath = path.join(process.cwd(), 'vercel.json');
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);
    return config.crons?.[0] || null;
  } catch (error) {
    console.error('Error reading vercel.json:', error);
    return null;
  }
}

function parseCronSchedule(cronExpression) {
  // "0 12 * * 1-5" format
  const [minute, hour, dayMonth, month, dayWeek] = cronExpression.split(' ');
  
  // Parse day range (e.g., "1-5" becomes [1,2,3,4,5])
  const daysOfWeek = dayWeek.includes('-') 
    ? Array.from({ length: 5 }, (_, i) => i + 1)  // Monday to Friday
    : dayWeek.split(',').map(d => parseInt(d));    // Specific days

  return {
    minute: parseInt(minute),
    hour: parseInt(hour),
    daysOfWeek
  };
}

function getNextRunTime(cronSchedule) {
  const { minute, hour, daysOfWeek } = parseCronSchedule(cronSchedule);
  const now = new Date();
  let nextRun = new Date(now);

  // Set the time for today's run
  nextRun.setUTCHours(hour, minute, 0, 0);

  // If the time has passed for today
  if (nextRun <= now) {
    nextRun.setDate(nextRun.getDate() + 1);
  }

  const currentDay = nextRun.getUTCDay();
  
  // If current day is not in allowed days, find next allowed day
  if (!daysOfWeek.includes(currentDay)) {
    // Calculate days until next valid day
    let daysToAdd = 1;
    let testDay = (currentDay + daysToAdd) % 7;
    
    while (!daysOfWeek.includes(testDay)) {
      daysToAdd++;
      testDay = (currentDay + daysToAdd) % 7;
    }
    
    nextRun.setDate(nextRun.getDate() + daysToAdd);
  }

  return nextRun;
}

module.exports = {
  parseVercelConfig,
  parseCronSchedule,
  getNextRunTime
};