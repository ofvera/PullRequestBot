import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Github, Clock, Star, MessageCircle } from 'lucide-react';
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

const StatusDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
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
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {timeUntil(botStatus.nextScheduledRun)}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(botStatus.nextScheduledRun).toLocaleString()}
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
              <div className="text-sm text-gray-500">
                Last check: {new Date(botStatus.lastCheck).toLocaleString()}
              </div>
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