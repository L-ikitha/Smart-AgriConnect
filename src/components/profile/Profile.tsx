import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Edit3,
  Save,
  X,
  Camera,
  Award,
  Calendar,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useLanguage, Language } from '../../contexts/LanguageContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    specialization: user?.specialization || '',
    experience: user?.experience || 0
  });

  const handleSave = () => {
    // Simulate saving profile
    setIsEditing(false);
    addNotification({
      type: 'success',
      title: t('profile.title') + ' Updated',
      message: 'Your profile has been successfully updated'
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      location: user?.location || '',
      specialization: user?.specialization || '',
      experience: user?.experience || 0
    });
    setIsEditing(false);
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'farmer':
        return 'Farmer';
      case 'group_leader':
        return 'Group Leader';
      case 'laborer':
        return 'Laborer';
      case 'expert':
        return 'Agricultural Expert';
      default:
        return role;
    }
  };

  const stats = {
    farmer: [
      { label: 'Jobs Posted', value: '25', icon: Briefcase },
      { label: 'Workers Hired', value: '180', icon: User },
      { label: 'Completed Projects', value: '22', icon: Award },
      { label: 'Total Spent', value: '₹45,600', icon: Calendar }
    ],
    group_leader: [
      { label: 'Group Size', value: '12', icon: User },
      { label: 'Jobs Completed', value: '35', icon: Award },
      { label: 'Monthly Earnings', value: '₹28,500', icon: Calendar },
      { label: 'Success Rate', value: '95%', icon: Star }
    ],
    laborer: [
      { label: 'Jobs Completed', value: '42', icon: Award },
      { label: 'Total Earnings', value: '₹32,400', icon: Calendar },
      { label: 'Average Rating', value: '4.6', icon: Star },
      { label: 'Working Days', value: '120', icon: Briefcase }
    ],
    expert: [
      { label: 'Total Consultations', value: '156', icon: Briefcase },
      { label: 'Satisfied Farmers', value: '98%', icon: Star },
      { label: 'Monthly Income', value: '₹45,000', icon: Calendar },
      { label: 'Expertise Areas', value: '3', icon: Award }
    ]
  };

  const currentStats = stats[user?.role as keyof typeof stats] || stats.farmer;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          {/* Profile Picture */}
          <div className="relative mb-4 md:mb-0">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <button className="absolute bottom-0 right-0 bg-white border-2 border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors duration-200">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 bg-transparent focus:outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                )}
                <p className="text-green-600 font-medium capitalize">
                  {getRoleText(user?.role || '')}
                </p>
                {user?.verified && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-600">Verified User</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {user?.rating && (
                  <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-yellow-700">{user.rating}</span>
                  </div>
                )}
                
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user?.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="text-gray-700 border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-500"
                  />
                ) : (
                  <span className="text-gray-700">{user?.phone}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="text-gray-700 border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-500"
                  />
                ) : (
                  <span className="text-gray-700">{user?.location}</span>
                )}
              </div>

              {user?.specialization && (
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="text-gray-700 border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-500"
                    />
                  ) : (
                    <span className="text-gray-700">{user.specialization}</span>
                  )}
                </div>
              )}

              {user?.experience && (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                      className="text-gray-700 border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-500 w-20"
                    />
                  ) : (
                    <span className="text-gray-700">{user.experience} years experience</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('profile.account_settings')}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.notifications')}</h3>
              <p className="text-sm text-gray-600">{t('profile.notifications_desc')}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.language')}</h3>
              <p className="text-sm text-gray-600">{t('profile.language_desc')}</p>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="ta">Tamil</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">{t('profile.privacy')}</h3>
              <p className="text-sm text-gray-600">{t('profile.privacy_desc')}</p>
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="public">{t('common.public')}</option>
              <option value="private">{t('common.private')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-red-200">
        <h2 className="text-xl font-bold text-red-900 mb-6">{t('profile.danger_zone')}</h2>
        <div className="space-y-4">
          <button className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
            {t('profile.delete_account')}
          </button>
          <p className="text-sm text-red-600">
            {t('profile.delete_warning')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;