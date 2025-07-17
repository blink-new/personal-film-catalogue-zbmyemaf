import type { Movie, LibraryStats } from '@/types/movie';

// Sample movie data for demo mode
export const demoMovies: Movie[] = [
  {
    id: 'demo-1',
    title: 'The Matrix',
    year: 1999,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    director: 'The Wachowskis',
    duration: 136,
    rating: 8.7,
    poster: 'https://images.unsplash.com/photo-1489599735734-79b4ba0602f8?w=400&h=600&fit=crop',
    filePath: '/Movies/The Matrix (1999)/The Matrix.mkv',
    fileName: 'The Matrix.mkv',
    fileSize: 4294967296, // 4GB
    format: 'mkv',
    dateAdded: '2024-01-15T10:30:00Z',
    lastWatched: '2024-01-20T19:45:00Z',
    watchCount: 3,
    description: 'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    quality: '4K',
    userId: 'demo-user'
  },
  {
    id: 'demo-2',
    title: 'Inception',
    year: 2010,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    duration: 148,
    rating: 8.8,
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    filePath: '/Movies/Inception (2010)/Inception.mp4',
    fileName: 'Inception.mp4',
    fileSize: 3221225472, // 3GB
    format: 'mp4',
    dateAdded: '2024-01-10T14:20:00Z',
    lastWatched: '2024-01-18T21:15:00Z',
    watchCount: 2,
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    quality: 'HD',
    userId: 'demo-user'
  },
  {
    id: 'demo-3',
    title: 'Interstellar',
    year: 2014,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    duration: 169,
    rating: 8.6,
    poster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop',
    filePath: '/Movies/Interstellar (2014)/Interstellar.mkv',
    fileName: 'Interstellar.mkv',
    fileSize: 5368709120, // 5GB
    format: 'mkv',
    dateAdded: '2024-01-08T16:45:00Z',
    lastWatched: '2024-01-22T20:30:00Z',
    watchCount: 1,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    quality: '4K',
    userId: 'demo-user'
  },
  {
    id: 'demo-4',
    title: 'The Dark Knight',
    year: 2008,
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    duration: 152,
    rating: 9.0,
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    filePath: '/Movies/The Dark Knight (2008)/The Dark Knight.avi',
    fileName: 'The Dark Knight.avi',
    fileSize: 2147483648, // 2GB
    format: 'avi',
    dateAdded: '2024-01-05T12:15:00Z',
    lastWatched: '2024-01-25T18:00:00Z',
    watchCount: 5,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    quality: 'HD',
    userId: 'demo-user'
  },
  {
    id: 'demo-5',
    title: 'Pulp Fiction',
    year: 1994,
    genre: ['Crime', 'Drama'],
    director: 'Quentin Tarantino',
    duration: 154,
    rating: 8.9,
    poster: 'https://images.unsplash.com/photo-1489599735734-79b4ba0602f8?w=400&h=600&fit=crop',
    filePath: '/Movies/Pulp Fiction (1994)/Pulp Fiction.mp4',
    fileName: 'Pulp Fiction.mp4',
    fileSize: 1610612736, // 1.5GB
    format: 'mp4',
    dateAdded: '2024-01-03T09:30:00Z',
    watchCount: 0,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    quality: 'HD',
    userId: 'demo-user'
  },
  {
    id: 'demo-6',
    title: 'Avatar',
    year: 2009,
    genre: ['Action', 'Adventure', 'Fantasy'],
    director: 'James Cameron',
    duration: 162,
    rating: 7.8,
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
    filePath: '/Movies/Avatar (2009)/Avatar.mkv',
    fileName: 'Avatar.mkv',
    fileSize: 6442450944, // 6GB
    format: 'mkv',
    dateAdded: '2024-01-01T15:00:00Z',
    lastWatched: '2024-01-12T17:30:00Z',
    watchCount: 1,
    description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    quality: '4K',
    userId: 'demo-user'
  },
  {
    id: 'demo-7',
    title: 'The Godfather',
    year: 1972,
    genre: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    duration: 175,
    rating: 9.2,
    poster: 'https://images.unsplash.com/photo-1489599735734-79b4ba0602f8?w=400&h=600&fit=crop',
    filePath: '/Movies/The Godfather (1972)/The Godfather.avi',
    fileName: 'The Godfather.avi',
    fileSize: 1073741824, // 1GB
    format: 'avi',
    dateAdded: '2023-12-28T11:45:00Z',
    lastWatched: '2024-01-14T20:00:00Z',
    watchCount: 2,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    quality: 'SD',
    userId: 'demo-user'
  },
  {
    id: 'demo-8',
    title: 'Forrest Gump',
    year: 1994,
    genre: ['Drama', 'Romance'],
    director: 'Robert Zemeckis',
    duration: 142,
    rating: 8.8,
    poster: 'https://images.unsplash.com/photo-1489599735734-79b4ba0602f8?w=400&h=600&fit=crop',
    filePath: '/Movies/Forrest Gump (1994)/Forrest Gump.mp4',
    fileName: 'Forrest Gump.mp4',
    fileSize: 2684354560, // 2.5GB
    format: 'mp4',
    dateAdded: '2023-12-25T13:20:00Z',
    lastWatched: '2024-01-16T19:15:00Z',
    watchCount: 4,
    description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man.',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    quality: 'HD',
    userId: 'demo-user'
  }
];

// Calculate demo stats
export const getDemoStats = (): LibraryStats => {
  const totalSize = demoMovies.reduce((sum, movie) => sum + movie.fileSize, 0);
  const genres: { [key: string]: number } = {};
  const formats: { [key: string]: number } = {};
  const qualities: { [key: string]: number } = {};

  demoMovies.forEach(movie => {
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

  return {
    totalMovies: demoMovies.length,
    totalSize,
    genres,
    formats,
    qualities,
    recentlyAdded: demoMovies
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, 5),
    mostWatched: demoMovies
      .filter(m => m.watchCount > 0)
      .sort((a, b) => b.watchCount - a.watchCount)
      .slice(0, 5)
  };
};

// Check if app is in demo mode
export const isDemoMode = (): boolean => {
  return localStorage.getItem('filmCatalogueMode') === 'demo';
};