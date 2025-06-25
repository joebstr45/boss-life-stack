import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Import icons
import { 
  LayoutDashboard, 
  Activity, 
  Globe, 
  Terminal, 
  LineChart, 
  BookOpen, 
  Mail, 
  Layers,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Agent Feed', path: '/dashboard/agent-feed', icon: <Activity className="w-5 h-5" /> },
    { name: 'Strike Map', path: '/dashboard/strike-map', icon: <Globe className="w-5 h-5" /> },
    { name: 'Command Terminal', path: '/dashboard/command-terminal', icon: <Terminal className="w-5 h-5" /> },
    { name: 'Heat Signals', path: '/dashboard/heat-signals', icon: <LineChart className="w-5 h-5" /> },
    { name: 'Temple Core', path: '/dashboard/temple-core', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Autoresponder', path: '/dashboard/autoresponder', icon: <Mail className="w-5 h-5" /> },
    { name: 'API Panel', path: '/dashboard/api-panel', icon: <Layers className="w-5 h-5" /> },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <h1 className="text-xl font-bold gradient-text">BOSS LIFE</h1>
        </div>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-white hover:bg-muted transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-b border-border"
        >
          <nav className="py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary border-l-4 border-primary'
                    : 'text-white hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm text-white hover:bg-muted"
            >
              <span className="mr-3"><LogOut className="w-5 h-5" /></span>
              Logout
            </button>
          </nav>
        </motion.div>
      )}
      
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-muted border-r border-border">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 px-4 flex items-center">
            <h1 className="text-xl font-bold gradient-text">BOSS LIFE</h1>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'bg-primary/20 text-primary'
                      : 'text-white hover:bg-muted-foreground/10'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Performance Graph Widget */}
          <div className="px-4 mt-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Performance
            </h3>
            <div className="mt-2 h-24 bg-card rounded-md p-2 gradient-border">
              {/* Placeholder for performance graph */}
              <div className="h-full flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Performance Graph</p>
              </div>
            </div>
          </div>
          
          {/* Loyalty Tracker */}
          <div className="px-4 mt-4 mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Loyalty Tracker
            </h3>
            <div className="mt-2 bg-card rounded-md p-2 gradient-border">
              {/* Placeholder for loyalty tracker */}
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/4"></div>
              </div>
              <p className="text-xs text-right mt-1 text-muted-foreground">75%</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <div className="px-4 mt-auto mb-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-muted hover:bg-muted-foreground/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-muted border-t border-border flex justify-around items-center py-2 z-10">
        <Link to="/dashboard" className={`p-2 rounded-md ${location.pathname === '/dashboard' ? 'text-primary' : 'text-white'}`}>
          <LayoutDashboard className="w-6 h-6" />
        </Link>
        <Link to="/dashboard/agent-feed" className={`p-2 rounded-md ${location.pathname === '/dashboard/agent-feed' ? 'text-primary' : 'text-white'}`}>
          <Activity className="w-6 h-6" />
        </Link>
        <Link to="/dashboard/strike-map" className={`p-2 rounded-md ${location.pathname === '/dashboard/strike-map' ? 'text-primary' : 'text-white'}`}>
          <Globe className="w-6 h-6" />
        </Link>
        <Link to="/dashboard/command-terminal" className={`p-2 rounded-md ${location.pathname === '/dashboard/command-terminal' ? 'text-primary' : 'text-white'}`}>
          <Terminal className="w-6 h-6" />
        </Link>
        <button onClick={toggleMobileMenu} className="p-2 rounded-md text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
