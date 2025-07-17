import { useState } from 'react';
import { 
  FolderOpen, 
  Scan, 
  Play, 
  Pause, 
  Square,
  CheckCircle,
  AlertCircle,
  Film,
  HardDrive,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { blink } from '@/blink/client';
import type { ScanProgress, Movie } from '@/types/movie';

const SUPPORTED_FORMATS = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.m4v'];

export function Scanner() {
  const [scanProgress, setScanProgress] = useState<ScanProgress>({
    isScanning: false,
    currentPath: '',
    filesScanned: 0,
    totalFiles: 0,
    foundMovies: 0
  });
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [scanResults, setScanResults] = useState<Movie[]>([]);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  // Mock folder selection (in a real app, this would use file system APIs)
  const handleSelectFolder = () => {
    const mockFolder = `/Users/Movies/Collection_${Date.now()}`;
    setSelectedFolders(prev => [...prev, mockFolder]);
  };

  const removeFolder = (index: number) => {
    setSelectedFolders(prev => prev.filter((_, i) => i !== index));
  };

  const startScan = async () => {
    if (selectedFolders.length === 0) return;

    setScanProgress({
      isScanning: true,
      currentPath: selectedFolders[0],
      filesScanned: 0,
      totalFiles: 100, // Mock total
      foundMovies: 0
    });

    setScanResults([]);

    // Simulate scanning process
    for (let i = 0; i <= 100; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      setScanProgress(prev => ({
        ...prev,
        filesScanned: i,
        currentPath: `${selectedFolders[0]}/folder_${Math.floor(i / 10)}/movie_${i}.mp4`,
        foundMovies: Math.floor(i * 0.3) // 30% of files are movies
      }));

      // Add mock movies periodically
      if (i % 10 === 0 && i > 0) {
        const mockMovie: Movie = {
          id: `movie_${i}`,
          title: `Movie Title ${i}`,
          year: 2020 + Math.floor(Math.random() * 4),
          genre: ['Action', 'Drama'][Math.floor(Math.random() * 2)] ? ['Action'] : ['Drama'],
          director: `Director ${i}`,
          duration: 90 + Math.floor(Math.random() * 60),
          rating: 6 + Math.random() * 4,
          filePath: `${selectedFolders[0]}/movie_${i}.mp4`,
          fileName: `movie_${i}.mp4`,
          fileSize: 1024 * 1024 * 1024 * (1 + Math.random() * 3), // 1-4 GB
          format: 'mp4',
          dateAdded: new Date().toISOString(),
          watchCount: 0,
          quality: ['HD', '4K', 'SD'][Math.floor(Math.random() * 3)] as 'HD' | '4K' | 'SD',
          userId: 'current-user'
        };

        setScanResults(prev => [...prev, mockMovie]);
      }
    }

    // Finish scanning
    setScanProgress(prev => ({
      ...prev,
      isScanning: false
    }));

    setLastScanTime(new Date().toLocaleString());
  };

  const stopScan = () => {
    setScanProgress(prev => ({
      ...prev,
      isScanning: false
    }));
  };

  const saveResults = async () => {
    try {
      // Save all found movies to database
      for (const movie of scanResults) {
        await blink.db.movies.create(movie);
      }
      
      setScanResults([]);
      alert(`Successfully added ${scanResults.length} movies to your library!`);
    } catch (error) {
      console.error('Failed to save movies:', error);
      if (error.message?.includes('Database for project') && error.message?.includes('not found')) {
        alert('Database not set up yet. Please set up your database first to save movies to your library.');
      } else {
        alert('Failed to save movies to library');
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Movie Scanner</h1>
        <p className="text-muted-foreground mt-2">
          Scan your folders to automatically detect and catalogue movie files
        </p>
      </div>

      {/* Folder Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Select Folders to Scan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={handleSelectFolder} variant="outline">
              <FolderOpen className="w-4 h-4 mr-2" />
              Add Folder
            </Button>
          </div>

          {selectedFolders.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Folders:</Label>
              {selectedFolders.map((folder, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-mono">{folder}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => removeFolder(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Supported formats: {SUPPORTED_FORMATS.join(', ')}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Scan Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="w-5 h-5" />
            Scan Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {!scanProgress.isScanning ? (
              <Button 
                onClick={startScan} 
                disabled={selectedFolders.length === 0}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Start Scan
              </Button>
            ) : (
              <Button onClick={stopScan} variant="destructive" className="gap-2">
                <Square className="w-4 h-4" />
                Stop Scan
              </Button>
            )}
          </div>

          {scanProgress.isScanning && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{scanProgress.filesScanned} / {scanProgress.totalFiles} files</span>
                </div>
                <Progress 
                  value={(scanProgress.filesScanned / scanProgress.totalFiles) * 100} 
                  className="h-2"
                />
              </div>

              <div className="text-sm text-muted-foreground">
                <div>Currently scanning: <span className="font-mono">{scanProgress.currentPath}</span></div>
                <div className="mt-1">Found {scanProgress.foundMovies} movies so far</div>
              </div>
            </div>
          )}

          {lastScanTime && (
            <div className="text-sm text-muted-foreground">
              Last scan completed: {lastScanTime}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Scan Results ({scanResults.length} movies found)
            </CardTitle>
            <Button onClick={saveResults} className="gap-2">
              <HardDrive className="w-4 h-4" />
              Add to Library
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {scanResults.map((movie) => (
                <div key={movie.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
                    <Film className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{movie.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {movie.year && (
                        <Badge variant="secondary" className="text-xs">
                          {movie.year}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {movie.format?.toUpperCase()}
                      </Badge>
                      {movie.quality && (
                        <Badge variant="outline" className="text-xs">
                          {movie.quality}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {formatFileSize(movie.fileSize)} • {movie.fileName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {movie.rating ? `★ ${movie.rating.toFixed(1)}` : 'No rating'}
                    </div>
                    {movie.duration && (
                      <div className="text-xs text-muted-foreground">
                        {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">{scanResults.length}</div>
                <div className="text-sm text-muted-foreground">Movies Found</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <HardDrive className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">
                  {formatFileSize(scanResults.reduce((sum, movie) => sum + movie.fileSize, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Size</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.floor(scanResults.reduce((sum, movie) => sum + (movie.duration || 0), 0) / 60)}h
                </div>
                <div className="text-sm text-muted-foreground">Total Runtime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}