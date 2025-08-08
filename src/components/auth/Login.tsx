import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Sprout } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'group_leader' | 'laborer' | 'expert'>('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { addNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      addNotification({
        type: 'error',
        title: 'Missing Information',
        message: 'Please enter both email and password'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password, selectedRole);
      addNotification({
        type: 'success',
        title: 'Welcome!',
        message: 'Successfully logged in to Smart AgriConnect'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: error instanceof Error ? error.message : 'Invalid email or password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sprout className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Smart AgriConnect</h1>
          </div>
          <p className="text-xl text-gray-600">
            Bridging Farmers and Agricultural Services through AI
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Login to Your Account
            </h2>
            
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('farmer')}
                  className={`p-3 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedRole === 'farmer'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-700'
                  }`}
                >
                  Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('group_leader')}
                  className={`p-3 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedRole === 'group_leader'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-700'
                  }`}
                >
                  Group Leader
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('laborer')}
                  className={`p-3 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedRole === 'laborer'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-700'
                  }`}
                >
                  Laborer
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('expert')}
                  className={`p-3 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedRole === 'expert'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-700'
                  }`}
                >
                  Agricultural Expert
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;