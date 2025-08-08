import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  MessageCircle, 
  Users, 
  User, 
  LogOut, 
  Sprout 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="w-8 h-8" />
              <span className="text-xl font-bold">Smart AgriConnect</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: t('nav.dashboard') },
    { path: '/jobs', icon: Briefcase, label: t('nav.jobs') },
    { path: '/ai-assistant', icon: MessageCircle, label: t('nav.ai_assistant') },
    { path: '/expert-consultancy', icon: Users, label: t('nav.experts') },
  ];

  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Sprout className="w-8 h-8" />
            <div>
              <span className="text-xl font-bold block">Smart AgriConnect</span>
              <span className="text-xs text-green-100">
                {user.role === 'farmer' ? 'Farmer Portal' :
                 user.role === 'group_leader' ? 'Group Leader Portal' :
                 user.role === 'laborer' ? 'Laborer Portal' : 'Expert Portal'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === path
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-green-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-green-100 capitalize">{user.role.replace('_', ' ')}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                to="/profile"
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === '/profile'
                    ? 'bg-white bg-opacity-20'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <User className="w-5 h-5" />
              </Link>
              
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex justify-around">
          {navigationItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                location.pathname === path
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'text-green-100 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;