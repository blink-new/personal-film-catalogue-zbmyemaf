import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Library } from '@/components/library/Library';
import { Scanner } from '@/components/scanner/Scanner';
import { DatabaseSetup } from '@/components/setup/DatabaseSetup';
import { blink } from '@/blink/client';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [databaseReady, setDatabaseReady] = useState(false);
  const [checkingDatabase, setCheckingDatabase] = useState(true);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setLoading(state.isLoading);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      checkDatabase();
    }
  }, [user]);

  const checkDatabase = async () => {
    setCheckingDatabase(true);
    try {
      // Try to query the movies table to see if database exists
      await blink.db.movies.list({ limit: 1 });
      setDatabaseReady(true);
    } catch (error) {
      console.log('Database not ready:', error);
      setDatabaseReady(false);
    } finally {
      setCheckingDatabase(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return <Library />;
      case 'scanner':
        return <Scanner />;
      case 'analytics':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Analytics</h1>
            <p className="text-muted-foreground">Analytics features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (loading || checkingDatabase) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : 'Checking database...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <p className="text-muted-foreground">You need to be signed in to use the Film Catalogue Manager</p>
        </div>
      </div>
    );
  }

  if (!databaseReady) {
    return (
      <div className="h-screen flex items-center justify-center p-8">
        <DatabaseSetup />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;