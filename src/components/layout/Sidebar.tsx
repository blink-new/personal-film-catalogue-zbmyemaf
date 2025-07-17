import { useState } from 'react';
import { 
  Home, 
  Library, 
  Scan, 
  Settings, 
  Film,
  BarChart3,
  Search,
  Filter,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { isDemoMode } from '@/services/demoData';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'library', name: 'Library', icon: Library },
  { id: 'scanner', name: 'Scanner', icon: Scan },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Film className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Film Catalogue</h1>
            <p className="text-sm text-muted-foreground">Manager</p>
          </div>
          {isDemoMode() && (
            <Badge variant="secondary" className="text-xs">
              <Play className="w-3 h-3 mr-1" />
              Demo
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  activeTab === item.id && "bg-accent text-accent-foreground"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Personal Film Catalogue v1.0
        </div>
      </div>
    </div>
  );
}