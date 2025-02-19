'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Github, Clock, Star, MessageCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function timeUntil(dateString) {
  const now = new Date();
  const future = new Date(dateString);
  const diff = future - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatSchedule(schedule) {
  const [minute, hour, dom, month, dow] = schedule.split(' ');
  
  // Convert UTC to local time
  const today = new Date();
  const scheduleDate = new Date(today);
  scheduleDate.setUTCHours(parseInt(hour), parseInt(minute), 0, 0);
  
  const localHour = scheduleDate.getHours();
  const localMinute = scheduleDate.getMinutes();
  
  const timeStr = `${localHour.toString().padStart(2, '0')}:${localMinute.toString().padStart(2, '0')}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  return `${timeStr} ${timeZone} on weekdays`;
}

const StatusDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Try production URL first, fallback to local if needed
        const baseUrl = process.env.NODE_ENV === 'production' 
          ? window.location.origin 
          : 'http://localhost:3000';
        
        const response = await fetch(`${baseUrl}/api/status`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No status information available</AlertDescription>
      </Alert>
    );
  }

  const { botStatus, githubStatus, slackStatus } = data;

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">PR Bot Status Dashboard</h1>
      
      {/* Next Run Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Next Scheduled Run
          </CardTitle>
          <CardDescription>
            Cron Schedule: {formatSchedule(botStatus.cronSchedule)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {timeUntil(botStatus.nextScheduledRun)}
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            <div>Next run: {new Date(botStatus.nextScheduledRun).toLocaleString()}</div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last check: {new Date(botStatus.lastCheck).toLocaleString()}
            </div>
            <div>Version: {botStatus.version}</div>
            <div>Timezone: {botStatus.timezone}</div>
          </div>
        </CardContent>
      </Card>

      {/* GitHub Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Repositories
          </CardTitle>
          <CardDescription>
            Monitoring {githubStatus.length} repositories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {githubStatus.map((repo) => (
              <div key={repo.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{repo.name}</div>
                  {repo.status === 'connected' && (
                    <div className="text-sm text-gray-500 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {repo.openIssues} issues
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {repo.stars} stars
                      </span>
                    </div>
                  )}
                  {repo.status === 'error' && (
                    <div className="text-sm text-red-500">
                      Error: {repo.error}
                    </div>
                  )}
                </div>
                {repo.status === 'connected' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Slack Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Slack Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">Channel: {slackStatus.channel}</div>
              {slackStatus.status === 'error' && (
                <div className="text-sm text-red-500">
                  Error: {slackStatus.error}
                </div>
              )}
            </div>
            {slackStatus.status === 'connected' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusDashboard;