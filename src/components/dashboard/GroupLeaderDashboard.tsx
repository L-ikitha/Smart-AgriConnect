import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface AvailableJob {
  id: string;
  title: string;
  farmer_name: string;
  location: string;
  workers_needed: number;
  wage_per_day: number;
  start_date: string;
  duration_days: number;
  distance: string;
}

interface MyGroup {
  id: string;
  member_name: string;
  skill: string;
  experience: number;
  status: 'available' | 'working' | 'unavailable';
  current_job?: string;
}

const GroupLeaderDashboard: React.FC = () => {
  const { user } = useAuth();
  const [availableJobs, setAvailableJobs] = useState<AvailableJob[]>([]);
  const [groupMembers, setGroupMembers] = useState<MyGroup[]>([]);
  const [stats, setStats] = useState({
    group_size: 0,
    available_members: 0,
    active_jobs: 0,
    monthly_earnings: 0
  });

  useEffect(() => {
    // Mock available jobs
    const mockJobs: AvailableJob[] = [
      {
        id: '1',
        title: 'Wheat Harvesting',
        farmer_name: 'Raju Sharma',
        location: 'Rampur Village',
        workers_needed: 15,
        wage_per_day: 350,
        start_date: '2025-01-25',
        duration_days: 3,
        distance: '5 km'
      },
      {
        id: '2',
        title: 'Rice Planting',
        farmer_name: 'Sita Devi',
        location: 'Shyampur Village',
        workers_needed: 12,
        wage_per_day: 320,
        start_date: '2025-01-28',
        duration_days: 4,
        distance: '8 km'
      },
      {
        id: '3',
        title: 'Vegetable Picking',
        farmer_name: 'Mohan Lal',
        location: 'Haripur Village',
        workers_needed: 8,
        wage_per_day: 280,
        start_date: '2025-01-22',
        duration_days: 2,
        distance: '3 km'
      }
    ];

    // Mock group members
    const mockMembers: MyGroup[] = [
      {
        id: '1',
        member_name: 'Ram Kumar',
        skill: 'Harvesting Expert',
        experience: 8,
        status: 'available'
      },
      {
        id: '2',
        member_name: 'Shyam Lal',
        skill: 'Planting Expert',
        experience: 6,
        status: 'working',
        current_job: 'Rice Planting'
      },
      {
        id: '3',
        member_name: 'Geeta Devi',
        skill: 'Vegetable Picking',
        experience: 5,
        status: 'available'
      },
      {
        id: '4',
        member_name: 'Rajesh Yadav',
        skill: 'General Labor',
        experience: 4,
        status: 'available'
      },
      {
        id: '5',
        member_name: 'Sunita Kumari',
        skill: 'Pruning Expert',
        experience: 7,
        status: 'unavailable'
      }
    ];

    setAvailableJobs(mockJobs);
    setGroupMembers(mockMembers);
    setStats({
      group_size: mockMembers.length,
      available_members: mockMembers.filter(m => m.status === 'available').length,
      active_jobs: mockMembers.filter(m => m.status === 'working').length,
      monthly_earnings: 45600
    });
  }, []);

  const getStatusColor = (status: MyGroup['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'working':
        return 'bg-blue-100 text-blue-800';
      case 'unavailable':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: MyGroup['status']) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'working':
        return 'Working';
      case 'unavailable':
        return 'Unavailable';
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
              Manage your group and find work opportunities
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="font-semibold">{user?.rating}</span>
            </div>
            <p className="text-sm text-green-100">{user?.experience} years experience</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center card-hover">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.group_size}</h3>
          <p className="text-sm text-gray-600">Group Size</p>
        </div>
        
        <div className="card text-center card-hover">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.available_members}</h3>
          <p className="text-sm text-gray-600">Available Members</p>
        </div>
        
        <div className="card text-center card-hover">
          <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.active_jobs}</h3>
          <p className="text-sm text-gray-600">Active Jobs</p>
        </div>
        
        <div className="card text-center card-hover">
          <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">₹{stats.monthly_earnings.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Monthly Earnings</p>
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
                    <Users className="w-4 h-4" />
                    <span>{job.workers_needed} workers needed</span>
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
                
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button className="w-full btn-primary text-sm py-2">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Group Members */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">My Group</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              + Add Member
            </button>
          </div>
          
          <div className="space-y-4">
            {groupMembers.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.member_name}</h3>
                    <p className="text-sm text-gray-600">{member.skill}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(member.status)}`}>
                    {getStatusText(member.status)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{member.experience} years experience</span>
                  {member.current_job && (
                    <span className="text-blue-600">
                      Job: {member.current_job}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupLeaderDashboard;