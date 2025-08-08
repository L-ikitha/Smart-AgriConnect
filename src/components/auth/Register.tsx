import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Sprout, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    role: 'farmer' as 'farmer' | 'group_leader' | 'laborer' | 'expert',
    specialization: '',
    experience: 0
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const { addNotification } = useNotification();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.location) {
      addNotification({
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required fields'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addNotification({
        type: 'error',
        title: 'Password Mismatch',
        message: 'Passwords do not match'
      });
      return;
    }

    if (formData.password.length < 6) {
      addNotification({
        type: 'error',
        title: 'Weak Password',
        message: 'Password must be at least 6 characters long'
      });
      return;
    }

    if (formData.role === 'expert' && !formData.specialization) {
      addNotification({
        type: 'error',
        title: 'Missing Specialization',
        message: 'Please specify your area of expertise'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await register(formData);
      addNotification({
        type: 'success',
        title: 'Registration Successful!',
        message: 'Welcome to Smart AgriConnect. Your account has been created.'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: 'An error occurred during registration. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      value: 'farmer',
      label: 'Farmer',
      description: 'Post jobs, hire labor, get AI assistance',
      icon: Sprout
    },
    {
      value: 'group_leader',
      label: 'Group Leader',
      description: 'Manage labor groups, find work opportunities',
      icon: User
    },
    {
      value: 'laborer',
      label: 'Laborer',
      description: 'Find work, connect with farmers',
      icon: Briefcase
    },
    {
      value: 'expert',
      label: 'Agricultural Expert',
      description: 'Provide consultancy, help farmers',
      icon: User
    }
  ];

  const specializationOptions = [
    'Crop Protection',
    'Soil Science',
    'Organic Farming',
    'Horticulture',
    'Animal Husbandry',
    'Agricultural Engineering',
    'Plant Pathology',
    'Entomology',
    'Agronomy',
    'Agricultural Economics'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sprout className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Smart AgriConnect</h1>
          </div>
          <p className="text-xl text-gray-600">
            Join the Agricultural Community
          </p>
        </div>

        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Create Your Account
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {roleOptions.map((role) => (
                  <div
                    key={role.value}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                      formData.role === role.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, role: role.value as any }))}
                  >
                    <div className="flex items-start space-x-3">
                      <role.icon className={`w-5 h-5 mt-1 ${
                        formData.role === role.value ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-gray-900">{role.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Expert-specific fields */}
            {formData.role === 'expert' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select your specialization</option>
                    {specializationOptions.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Years of experience"
                  />
                </div>
              </div>
            )}

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field pr-10"
                    placeholder="Create a password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-field pr-10"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-green-600 hover:text-green-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;