export interface Movie {
  id: string;
  title: string;
  year?: number;
  genre?: string[];
  director?: string;
  duration?: number; // in minutes
  rating?: number; // 1-10
  poster?: string;
  filePath: string;
  fileName: string;
  fileSize: number; // in bytes
  format: string; // mp4, mkv, avi, etc.
  dateAdded: string;
  lastWatched?: string;
  watchCount: number;
  description?: string;
  cast?: string[];
  quality?: 'SD' | 'HD' | '4K' | 'Unknown';
  userId: string;
}

export interface ScanProgress {
  isScanning: boolean;
  currentPath: string;
  filesScanned: number;
  totalFiles: number;
  foundMovies: number;
}

export interface LibraryStats {
  totalMovies: number;
  totalSize: number; // in bytes
  genres: { [key: string]: number };
  formats: { [key: string]: number };
  qualities: { [key: string]: number };
  recentlyAdded: Movie[];
  mostWatched: Movie[];
}