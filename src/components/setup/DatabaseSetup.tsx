import { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function DatabaseSetup() {
  const [showContinue, setShowContinue] = useState(false);

  const handleContinue = () => {
    // For now, we'll allow users to continue without database
    // The app will work with empty states and show appropriate messages
    window.location.reload();
  };

  const handleSetupLater = () => {
    setShowContinue(true);
  };

  if (showContinue) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Info className="w-6 h-6" />
            Continue Without Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You can explore the Film Catalogue Manager interface without a database. 
            The app will show empty states and demo functionality.
          </p>
          
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> Without a database, you won't be able to save movies permanently. 
              Any scanned movies will be lost when you refresh the page.
            </AlertDescription>
          </Alert>

          <div className="bg-muted p-4 rounded-lg mb-4">
            <h4 className="font-medium mb-2">What you can do:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Explore the Dashboard interface</li>
              <li>• Test the Movie Scanner functionality</li>
              <li>• Browse the Library layout</li>
              <li>• See how the app would work with your movies</li>
            </ul>
          </div>

          <Button onClick={handleContinue} className="w-full" size="lg">
            Continue to App
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            You can set up the database later when the feature becomes available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-6 h-6" />
          Database Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          To store your movie collection permanently, a database needs to be set up. 
          This feature is currently being optimized for better performance.
        </p>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Database setup is temporarily unavailable</strong> due to system limits. 
            You can still explore the app interface and functionality.
          </AlertDescription>
        </Alert>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">What would be created:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Movies table to store your film collection</li>
            <li>• Indexes for fast searching and sorting</li>
            <li>• User-specific data isolation</li>
            <li>• Support for metadata, ratings, and watch history</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={handleSetupLater} 
            variant="outline"
            className="flex-1"
          >
            Continue Without Database
          </Button>
          <Button 
            disabled
            className="flex-1"
          >
            <Database className="w-4 h-4 mr-2" />
            Set Up Database (Coming Soon)
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Database functionality will be restored soon. You can still use the app to explore its features.
        </p>
      </CardContent>
    </Card>
  );
}