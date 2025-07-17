import { useState, useEffect } from 'react';
import { 
  Film, 
  HardDrive, 
  Clock, 
  Star,
  TrendingUp,
  Play,
  Calendar,
  Database
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { blink } from '@/blink/client';
import type { Movie, LibraryStats } from '@/types/movie';

export function Dashboard() {
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Try to load movies from database
      const movies = await blink.db.movies.list({
        orderBy: { dateAdded: 'desc' },
        limit: 100
      });

      // Calculate stats
      const totalSize = movies.reduce((sum, movie) => sum + (movie.fileSize || 0), 0);
      const genres: { [key: string]: number } = {};
      const formats: { [key: string]: number } = {};
      const qualities: { [key: string]: number } = {};

      movies.forEach(movie => {
        // Count genres
        if (movie.genre) {
          movie.genre.forEach(g => {
            genres[g] = (genres[g] || 0) + 1;
          });
        }

        // Count formats
        if (movie.format) {
          formats[movie.format] = (formats[movie.format] || 0) + 1;
        }

        // Count qualities
        if (movie.quality) {
          qualities[movie.quality] = (qualities[movie.quality] || 0) + 1;
        }
      });

      const libraryStats: LibraryStats = {
        totalMovies: movies.length,
        totalSize,
        genres,
        formats,
        qualities,
        recentlyAdded: movies.slice(0, 5),
        mostWatched: movies
          .filter(m => m.watchCount > 0)
          .sort((a, b) => b.watchCount - a.watchCount)
          .slice(0, 5)
      };

      setStats(libraryStats);
      setRecentMovies(movies.slice(0, 6));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      
      // Set empty stats when database is not available
      const emptyStats: LibraryStats = {
        totalMovies: 0,
        totalSize: 0,
        genres: {},
        formats: {},
        qualities: {},
        recentlyAdded: [],
        mostWatched: []
      };
      
      setStats(emptyStats);
      setRecentMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your personal film collection
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Movies"
          value={stats?.totalMovies || 0}
          subtitle="in your collection"
          icon={Film}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Storage Used"
          value={formatFileSize(stats?.totalSize || 0)}
          subtitle="across all files"
          icon={HardDrive}
        />
        <StatsCard
          title="Genres"
          value={Object.keys(stats?.genres || {}).length}
          subtitle="different categories"
          icon={Star}
        />
        <StatsCard
          title="Formats"
          value={Object.keys(stats?.formats || {}).length}
          subtitle="file types"
          icon={Database}
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Added */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recently Added
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMovies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No movies in your collection yet</p>
                <p className="text-sm mt-1">Start by scanning your movie folders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentMovies.map((movie) => (
                  <div key={movie.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
                      {movie.poster ? (
                        <img 
                          src={movie.poster} 
                          alt={movie.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <Film className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{movie.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {movie.year && (
                          <Badge variant="secondary" className="text-xs">
                            {movie.year}
                          </Badge>
                        )}
                        {movie.format && (
                          <Badge variant="outline" className="text-xs">
                            {movie.format.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatFileSize(movie.fileSize)}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gap-3" size="lg">
              <Database className="w-5 h-5" />
              Scan for Movies
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" size="lg">
              <Film className="w-5 h-5" />
              Add Movie Manually
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" size="lg">
              <TrendingUp className="w-5 h-5" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Genre Distribution */}
      {stats && Object.keys(stats.genres).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Genre Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.genres)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8)
                .map(([genre, count]) => (
                  <div key={genre} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium">{genre}</div>
                    <div className="flex-1">
                      <Progress 
                        value={(count / stats.totalMovies) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="w-12 text-sm text-muted-foreground text-right">
                      {count}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}