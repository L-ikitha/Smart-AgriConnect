import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  AlertTriangle,
  Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface Consultation {
  id: string;
  farmer_name: string;
  topic: string;
  type: 'chat' | 'call' | 'video';
  status: 'pending' | 'scheduled' | 'completed';
  scheduled_time?: string;
  priority: 'low' | 'medium' | 'high';
}

interface Query {
  id: string;
  farmer_name: string;
  question: string;
  category: string;
  submitted_time: string;
  urgency: 'low' | 'medium' | 'high';
}

const ExpertDashboard: React.FC = () => {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [stats, setStats] = useState({
    total_consultations: 0,
    pending_queries: 0,
    monthly_earnings: 0,
    satisfied_farmers: 0
  });

  useEffect(() => {
    // Mock consultations
    const mockConsultations: Consultation[] = [
      {
        id: '1',
        farmer_name: 'Raju Sharma',
        topic: 'Wheat pest infestation',
        type: 'video',
        status: 'scheduled',
        scheduled_time: '2025-01-20 14:00',
        priority: 'high'
      },
      {
        id: '2',
        farmer_name: 'Sita Devi',
        topic: 'Rice disease',
        type: 'chat',
        status: 'pending',
        priority: 'medium'
      },
      {
        id: '3',
        farmer_name: 'Mohan Lal',
        topic: 'Crop yield',
        type: 'call',
        status: 'completed',
        scheduled_time: '2025-01-18 10:00',
        priority: 'low'
      }
    ];

    // Mock queries
    const mockQueries: Query[] = [
      {
        id: '1',
        farmer_name: 'Amit Kumar',
        question: 'Why are my tomato leaves turning yellow?',
        category: 'Crop Disease',
        submitted_time: '2 hours ago',
        urgency: 'high'
      },
      {
        id: '2',
        farmer_name: 'Priya Patel',
        question: 'How to care for chili plants after rain?',
        category: 'Crop Care',
        submitted_time: '4 hours ago',
        urgency: 'medium'
      },
      {
        id: '3',
        farmer_name: 'Ram Kumar',
        question: 'How to make organic fertilizer?',
        category: 'Organic Farming',
        submitted_time: '6 hours ago',
        urgency: 'low'
      }
    ];

    setConsultations(mockConsultations);
    setQueries(mockQueries);
    setStats({
      total_consultations: mockConsultations.length,
      pending_queries: mockQueries.filter(q => q.urgency === 'high' || q.urgency === 'medium').length,
      monthly_earnings: 35000,
      satisfied_farmers: 95
    });
  }, []);

  const getStatusColor = (status: Consultation['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Consultation['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
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
              Help farmers and share your knowledge
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="font-semibold">{user?.rating}</span>
            </div>
            <p className="text-sm text-green-100">{user?.specialization}</p>
            <p className="text-xs text-green-100">{user?.experience} years experience</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="card text-center card-hover">
          <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.total_consultations}</h3>
          <p className="text-sm text-gray-600">Total Consultations</p>
        </div>
        
        <div className="card text-center card-hover">
          <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.pending_queries}</h3>
          <p className="text-sm text-gray-600">Pending Queries</p>
        </div>
        
        <div className="card text-center card-hover">
          <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">₹{stats.monthly_earnings.toLocaleString()}</h3>
          <p className="text-sm text-gray-600">Monthly Income</p>
        </div>
        
        <div className="card text-center card-hover">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">{stats.satisfied_farmers}%</h3>
          <p className="text-sm text-gray-600">Satisfied Farmers</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors duration-200">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">New Consultation</h3>
              <p className="text-sm text-gray-600">Talk to farmers</p>
            </div>
          </button>
          
          <Link
            to="/ai-assistant"
            className="flex items-center space-x-3 p-4 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
          >
            <Calendar className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Schedule Time</h3>
              <p className="text-sm text-gray-600">Book appointments</p>
            </div>
          </Link>
          
          <button className="flex items-center space-x-3 p-4 border border-purple-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">View Reports</h3>
              <p className="text-sm text-gray-600">Performance reports</p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming Consultations */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Consultations</h2>
            <Link to="/expert-consultancy" className="text-green-600 hover:text-green-700 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {consultations.filter(c => c.status !== 'completed').map((consultation) => (
              <div key={consultation.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{consultation.farmer_name}</h3>
                    <p className="text-sm text-gray-600">{consultation.topic}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 ${getPriorityColor(consultation.priority)}`}>
                      {getPriorityIcon(consultation.priority)}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultation.status)}`}>
                      {getStatusText(consultation.status)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="capitalize">{consultation.type} consultation</span>
                  {consultation.scheduled_time && (
                    <span>{consultation.scheduled_time}</span>
                  )}
                </div>
                
                {consultation.status === 'scheduled' && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button className="w-full btn-primary text-sm py-2">
                      Start Consultation
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Queries */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Queries</h2>
          
          <div className="space-y-4">
            {queries.map((query) => (
              <div key={query.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{query.farmer_name}</h3>
                    <p className="text-sm text-gray-900 mt-1">{query.question}</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${getPriorityColor(query.urgency)}`}>
                    {getPriorityIcon(query.urgency)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{query.category}</span>
                  <span>{query.submitted_time}</span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button className="w-full btn-secondary text-sm py-2">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;