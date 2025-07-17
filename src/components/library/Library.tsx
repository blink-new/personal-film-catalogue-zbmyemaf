import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SortAsc, 
  Film,
  Play,
  Star,
  Calendar,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { blink } from '@/blink/client';
import type { Movie } from '@/types/movie';

type ViewMode = 'grid' | 'list';
type SortBy = 'title' | 'year' | 'dateAdded' | 'rating' | 'watchCount';

export function Library() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('title');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  useEffect(() => {
    loadMovies();
  }, []);

  const filterAndSortMovies = useCallback(() => {
    let filtered = [...movies];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre?.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        movie.genre?.includes(selectedGenre)
      );
    }

    // Format filter
    if (selectedFormat !== 'all') {
      filtered = filtered.filter(movie =>
        movie.format === selectedFormat
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'dateAdded':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'watchCount':
          return b.watchCount - a.watchCount;
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  }, [movies, searchQuery, sortBy, selectedGenre, selectedFormat]);

  useEffect(() => {
    filterAndSortMovies();
  }, [filterAndSortMovies]);

  const loadMovies = async () => {
    try {
      const movieList = await blink.db.movies.list({
        orderBy: { title: 'asc' }
      });
      setMovies(movieList);
    } catch (error) {
      console.error('Failed to load movies:', error);
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getUniqueGenres = () => {
    const genres = new Set<string>();
    movies.forEach(movie => {
      movie.genre?.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
  };

  const getUniqueFormats = () => {
    const formats = new Set<string>();
    movies.forEach(movie => {
      if (movie.format) formats.add(movie.format);
    });
    return Array.from(formats).sort();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-12 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Movie Library</h1>
        <p className="text-muted-foreground mt-2">
          Browse and manage your personal movie collection
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search movies, directors, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {getUniqueGenres().map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Formats</SelectItem>
              {getUniqueFormats().map(format => (
                <SelectItem key={format} value={format}>{format.toUpperCase()}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="dateAdded">Date Added</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="watchCount">Watch Count</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredMovies.length} of {movies.length} movies
      </div>

      {/* Movies Display */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-16">
          <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">No movies found</h3>
          <p className="text-muted-foreground">
            {movies.length === 0 
              ? "Start by scanning your movie folders to build your collection"
              : "Try adjusting your search or filter criteria"
            }
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            : "space-y-4"
        }>
          {filteredMovies.map((movie) => (
            viewMode === 'grid' ? (
              <Card key={movie.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-[2/3] bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    {movie.poster ? (
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Film className="w-12 h-12 text-muted-foreground" />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" className="gap-2">
                        <Play className="w-4 h-4" />
                        Play
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate mb-1">{movie.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      {movie.year && (
                        <Badge variant="secondary" className="text-xs">
                          {movie.year}
                        </Badge>
                      )}
                      {movie.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{movie.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>{formatFileSize(movie.fileSize)}</div>
                      {movie.duration && <div>{formatDuration(movie.duration)}</div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card key={movie.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-muted rounded flex items-center justify-center flex-shrink-0">
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
                      <h3 className="font-medium truncate mb-1">{movie.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        {movie.year && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {movie.year}
                          </div>
                        )}
                        {movie.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDuration(movie.duration)}
                          </div>
                        )}
                        {movie.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {movie.rating}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {movie.genre?.slice(0, 3).map(genre => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                        {movie.format && (
                          <Badge variant="secondary" className="text-xs">
                            {movie.format.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatFileSize(movie.fileSize)} • Watched {movie.watchCount} times
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      )}
    </div>
  );
}