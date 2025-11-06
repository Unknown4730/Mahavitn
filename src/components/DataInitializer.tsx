import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, CheckCircle, XCircle, Info, Database } from 'lucide-react';
import { initializeLiveData } from '../utils/liveDataSeed';

/**
 * DataInitializer Component
 * Allows developers/admins to initialize test data in the database
 * This should only be accessible in development or by admins
 */
export function DataInitializer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);

  const handleInitialize = async () => {
    setStatus('loading');
    setMessage('Initializing database with test data...');
    setCredentials(null);

    try {
      const result = await initializeLiveData();

      if (result.success) {
        setStatus('success');
        setMessage(result.message || 'Data initialized successfully!');
        setCredentials(result.credentials);
      } else {
        setStatus('error');
        setMessage(result.error || 'Failed to initialize data');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database Initializer
          </CardTitle>
          <CardDescription>
            Initialize the database with test data including a Kolhapur user with 2 consumer accounts
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Information Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold mb-2">This will create:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Test user from Kolhapur (संजय पाटील)</li>
                <li>Consumer Account 1: 266511869340 (Residential)</li>
                <li>Consumer Account 2: 266511870125 (Commercial)</li>
                <li>6 months of bill history for each consumer</li>
                <li>5 system announcements</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Initialize Button */}
          {status === 'idle' && (
            <Button 
              onClick={handleInitialize}
              className="w-full"
              size="lg"
            >
              <Database className="w-4 h-4 mr-2" />
              Initialize Test Data
            </Button>
          )}

          {/* Loading State */}
          {status === 'loading' && (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground">{message}</p>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {message}
                </AlertDescription>
              </Alert>

              {credentials && (
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Login Credentials</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Email</label>
                      <p className="font-mono text-sm bg-background p-2 rounded border">
                        {credentials.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Password</label>
                      <p className="font-mono text-sm bg-background p-2 rounded border">
                        {credentials.password}
                      </p>
                    </div>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Use these credentials to login and view the test consumer accounts
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

              <Button 
                onClick={() => setStatus('idle')}
                variant="outline"
                className="w-full"
              >
                Initialize Again
              </Button>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>

              <Button 
                onClick={() => setStatus('idle')}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Usage Instructions */}
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-base">Usage Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>1. Click "Initialize Test Data" to create the test user and data</p>
              <p>2. Copy the login credentials provided</p>
              <p>3. Go to the login page and sign in with the credentials</p>
              <p>4. You'll see 2 consumer accounts with 6 months of bill history</p>
              <p className="text-muted-foreground pt-2">
                Note: If the user already exists, you can still login with the credentials shown above
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
