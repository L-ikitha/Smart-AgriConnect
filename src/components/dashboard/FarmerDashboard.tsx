import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  MessageCircle, 
  Plus,
  Calendar,
  MapPin,
  Star,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  workers_needed: number;
  wage_per_day: number;
  start_date: string;
  duration_days: number;
  status: 'open' | 'in_progress' | 'completed';
  applications: number;
}

interface RecentActivity {
  id: string;
  type: 'job_posted' | 'application_received' | 'job_completed' | 'payment_made';
  message: string;
  timestamp: string;
}

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [stats, setStats] = useState({
    total_jobs: 0,
    active_jobs: 0,
    completed_jobs: 0,
    total_spent: 0
  });

  useEffect(() => {
    // Simulate fetching farmer's jobs and activities
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Wheat Harvesting',
        type: 'Harvesting',
        location: 'Field A, Village Rampur',
        workers_needed: 15,
        wage_per_day: 350,
        start_date: '2025-01-25',
        duration_days: 3,
        status: 'open',
        applications: 8
      },
      {
        id: '2',
        title: 'Cotton Picking',
        type: 'Picking',
        location: 'Field B, Village Rampur',
        workers_needed: 20,
        wage_per_day: 300,
        start_date: '2025-01-20',
        duration_days: 5,
        status: 'in_progress',
        applications: 12
      },
      {
        id: '3',
        title: 'Soybean Sowing',
        type: 'Sowing',
        location: 'Field C, Village Rampur',
        workers_needed: 10,
        wage_per_day: 280,
        start_date: '2025-01-15',
        duration_days: 2,
        status: 'completed',
        applications: 15
      }
    ];

    const mockActivities: RecentActivity[] = [
      {
        id: '1',
        type: 'application_received',
        message: 'राम कुमार ने गेहूं कटाई के काम के लिए आवेदन किया',
        timestamp: '2 hours ago'
      },
      {
        id: '2',
        type: 'job_posted',
        message: 'नई नौकरी पोस्ट की गई: कपास तुड़ाई',
        timestamp: '5 hours ago'
      },
      {
        id: '3',
        type: 'job_completed',
        message: 'सोयाबीन बुआई का काम पूरा हुआ',
        timestamp: '1 day ago'
      },
      {
        id: '4',
        type: 'payment_made',
        message: '₹5,600 का भुगतान किया गया',
        timestamp: '1 day ago'
      }
    ];

    setJobs(mockJobs);
    setActivities(mockActivities);
    setStats({
      total_jobs: mockJobs.length,
      active_jobs: mockJobs.filter(j => j.status === 'open' || j.status === 'in_progress').length,
      completed_jobs: mockJobs.filter(j => j.status === 'completed').length,
      total_spent: 25680
    });
  }, []);

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Job['status']) => {
    switch (status) {
      case 'open':
        return 'खुला';
      case 'in_progress':
        return 'चल रहा';
      case 'completed':
        return 'पूरा';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card gradient-bg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t('dashboard.welcome')}, {user?.name}!
            </h1>
            <p className="text-green-100 text-lg">
              {t('dashboard.farmer_subtitle')}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="font-semibold">{user?.rating}</span>
            </div>
            <p className="text-sm text-green-100">सत्यापित किसान</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center card-hover">
          <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.total_jobs}</h3>
          <p className="text-sm text-gray-600">कुल नौकरियां</p>
        </div>
        
        <div className="card text-center card-hover">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.active_jobs}</h3>
          <p className="text-sm text-gray-600">सक्रिय नौकरियां</p>
        </div>
        
        <div className="card text-center card-hover">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.completed_jobs}</h3>
          <p className="text-sm text-gray-600">पूर्ण नौकरियां</p>
        </div>
        
        <div className="card text-center card-hover">
          <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">₹{stats.total_spent.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">कुल खर्च</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">त्वरित कार्य</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/jobs?action=create"
            className="flex items-center space-x-3 p-4 border border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors duration-200"
          >
            <Plus className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">नई नौकरी पोस्ट करें</h3>
              <p className="text-sm text-gray-600">मजदूर की आवश्यकता है?</p>
            </div>
          </Link>
          
          <Link
            to="/ai-assistant"
            className="flex items-center space-x-3 p-4 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
          >
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">AI सहायक</h3>
              <p className="text-sm text-gray-600">खेती की सलाह लें</p>
            </div>
          </Link>
          
          <Link
            to="/expert-consultancy"
            className="flex items-center space-x-3 p-4 border border-purple-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200"
          >
            <Users className="w-6 h-6 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-900">विशेषज्ञ सलाह</h3>
              <p className="text-sm text-gray-600">कृषि विशेषज्ञ से बात करें</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">हाल की नौकरियां</h2>
            <Link to="/jobs" className="text-green-600 hover:text-green-700 text-sm font-medium">
              सभी देखें
            </Link>
          </div>
          
          <div className="space-y-4">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                    {getStatusText(job.status)}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{job.workers_needed} मजदूर चाहिए</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>₹{job.wage_per_day}/दिन</span>
                  </div>
                </div>
                
                {job.status === 'open' && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-green-600">
                      {job.applications} आवेदन प्राप्त
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">हाल की गतिविधि</h2>
          
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;