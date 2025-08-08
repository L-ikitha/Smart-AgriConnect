import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface AvailableJob {
  id: string;
  title: string;
  farmer_name: string;
  location: string;
  wage_per_day: number;
  start_date: string;
  duration_days: number;
  distance: string;
  requirements: string;
}

interface MyApplication {
  id: string;
  job_title: string;
  farmer_name: string;
  applied_date: string;
  status: 'pending' | 'accepted' | 'rejected';
  wage_per_day: number;
}

const LaborerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [availableJobs, setAvailableJobs] = useState<AvailableJob[]>([]);
  const [applications, setApplications] = useState<MyApplication[]>([]);
  const [stats, setStats] = useState({
    jobs_applied: 0,
    jobs_completed: 0,
    monthly_earnings: 0,
    rating: 0
  });

  useEffect(() => {
    // Mock available jobs
    const mockJobs: AvailableJob[] = [
      {
        id: '1',
        title: 'Wheat Harvesting',
        farmer_name: 'Raju Sharma',
        location: 'Rampur Village',
        wage_per_day: 350,
        start_date: '2025-01-25',
        duration_days: 3,
        distance: '5 km',
        requirements: 'Harvesting experience'
      },
      {
        id: '2',
        title: 'Rice Planting',
        farmer_name: 'Sita Devi',
        location: 'Shyampur Village',
        wage_per_day: 320,
        start_date: '2025-01-28',
        duration_days: 4,
        distance: '8 km',
        requirements: 'Planting knowledge'
      },
      {
        id: '3',
        title: 'Vegetable Picking',
        farmer_name: 'Mohan Lal',
        location: 'Haripur Village',
        wage_per_day: 280,
        start_date: '2025-01-22',
        duration_days: 2,
        distance: '3 km',
        requirements: 'General labor'
      }
    ];

    // Mock applications
    const mockApplications: MyApplication[] = [
      {
        id: '1',
        job_title: 'Corn Harvesting',
        farmer_name: 'Ramesh Kumar',
        applied_date: '2025-01-15',
        status: 'accepted',
        wage_per_day: 330
      },
      {
        id: '2',
        job_title: 'Mango Picking',
        farmer_name: 'Sunil Yadav',
        applied_date: '2025-01-18',
        status: 'pending',
        wage_per_day: 300
      },
      {
        id: '3',
        job_title: 'Rice Planting',
        farmer_name: 'Geeta Devi',
        applied_date: '2025-01-12',
        status: 'rejected',
        wage_per_day: 280
      }
    ];

    setAvailableJobs(mockJobs);
    setApplications(mockApplications);
    setStats({
      jobs_applied: mockApplications.length,
      jobs_completed: 15,
      monthly_earnings: 12500,
      rating: user?.rating || 4.2
    });
  }, [user]);

  const getStatusColor = (status: MyApplication['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: MyApplication['status']) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
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
              Hello, {user?.name}!
            </h1>
            <p className="text-green-100 text-lg">
              Find work opportunities and increase your income
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="font-semibold">{stats.rating}</span>
            </div>
            <p className="text-sm text-green-100">{user?.experience} years experience</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center card-hover">
          <Search className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.jobs_applied}</h3>
          <p className="text-sm text-gray-600">Jobs Applied</p>
        </div>
        
        <div className="card text-center card-hover">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.jobs_completed}</h3>
          <p className="text-sm text-gray-600">Jobs Completed</p>
        </div>
        
        <div className="card text-center card-hover">
          <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">₹{stats.monthly_earnings.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Monthly Earnings</p>
        </div>
        
        <div className="card text-center card-hover">
          <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.rating}</h3>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/jobs"
            className="flex items-center space-x-3 p-4 border border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors duration-200"
          >
            <Search className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Find Jobs</h3>
              <p className="text-sm text-gray-600">Explore new opportunities</p>
            </div>
          </Link>
          
          <Link
            to="/ai-assistant"
            className="flex items-center space-x-3 p-4 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
          >
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-gray-600">Ask questions</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Available Jobs */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Available Jobs</h2>
            <Link to="/jobs" className="text-green-600 hover:text-green-700 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {availableJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <span className="text-xs text-green-600 font-medium">{job.distance}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">Farmer: {job.farmer_name}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>₹{job.wage_per_day}/day</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{job.duration_days} days</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">{job.requirements}</p>
                  <button className="w-full btn-primary text-sm py-2">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Applications */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Applications</h2>
          
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{application.job_title}</h3>
                    <p className="text-sm text-gray-600">Farmer: {application.farmer_name}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
                    {getStatusText(application.status)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>₹{application.wage_per_day}/day</span>
                  <span>{application.applied_date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborerDashboard;