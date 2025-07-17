import { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Info, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function DatabaseSetup() {
  const [showContinue, setShowContinue] = useState(false);

  const handleContinue = () => {
    // Set a flag in localStorage to indicate demo mode
    localStorage.setItem('filmCatalogueMode', 'demo');
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
            Experience the Film Catalogue Manager with demo data and full functionality. 
            This demo mode showcases all features with sample movies.
          </p>
          
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Mode:</strong> You'll see sample movies and can test all features. 
              Changes won't be saved permanently, but you can explore the full interface.
            </AlertDescription>
          </Alert>

          <div className="bg-muted p-4 rounded-lg mb-4">
            <h4 className="font-medium mb-2">Demo Features Available:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Browse a sample movie collection</li>
              <li>• Test search and filtering</li>
              <li>• Experience the scanner interface</li>
              <li>• View detailed movie information</li>
              <li>• See analytics and statistics</li>
            </ul>
          </div>

          <Button onClick={handleContinue} className="w-full" size="lg">
            <Play className="w-4 h-4 mr-2" />
            Launch Demo Mode
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Perfect for exploring the app's capabilities and interface design.
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
            The app will automatically use demo mode with sample data so you can explore all features.
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