import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Clock,
  Filter,
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

interface Job {
  id: string;
  title: string;
  type: string;
  farmer_name: string;
  location: string;
  workers_needed: number;
  wage_per_day: number;
  start_date: string;
  duration_days: number;
  status: 'open' | 'in_progress' | 'completed';
  applications?: number;
  distance?: string;
  requirements?: string;
  posted_date: string;
}

const JobBoard: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCreateJob, setShowCreateJob] = useState(false);

  useEffect(() => {
    // Mock jobs data
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'गेहूं की कटाई',
        type: 'Harvesting',
        farmer_name: 'राजू शर्मा',
        location: 'रामपुर गांव, मध्य प्रदेश',
        workers_needed: 15,
        wage_per_day: 350,
        start_date: '2025-01-25',
        duration_days: 3,
        status: 'open',
        applications: 8,
        distance: '5 किमी',
        requirements: 'कटाई का अनुभव आवश्यक',
        posted_date: '2025-01-18'
      },
      {
        id: '2',
        title: 'धान की रोपाई',
        type: 'Planting',
        farmer_name: 'सीता देवी',
        location: 'श्यामपुर गांव, पंजाब',
        workers_needed: 12,
        wage_per_day: 320,
        start_date: '2025-01-28',
        duration_days: 4,
        status: 'open',
        applications: 5,
        distance: '8 किमी',
        requirements: 'रोपाई का ज्ञान',
        posted_date: '2025-01-19'
      },
      {
        id: '3',
        title: 'सब्जी की तुड़ाई',
        type: 'Harvesting',
        farmer_name: 'मोहन लाल',
        location: 'हरिपुर गांव, उत्तर प्रदेश',
        workers_needed: 8,
        wage_per_day: 280,
        start_date: '2025-01-22',
        duration_days: 2,
        status: 'in_progress',
        applications: 12,
        distance: '3 किमी',
        requirements: 'सामान्य मजदूर',
        posted_date: '2025-01-16'
      },
      {
        id: '4',
        title: 'कपास की तुड़ाई',
        type: 'Picking',
        farmer_name: 'अमित कुमार',
        location: 'सुंदरपुर गांव, गुजरात',
        workers_needed: 20,
        wage_per_day: 300,
        start_date: '2025-01-30',
        duration_days: 5,
        status: 'open',
        applications: 15,
        distance: '12 किमी',
        requirements: 'कपास तुड़ाई का अनुभव',
        posted_date: '2025-01-17'
      }
    ];

    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || job.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleApplyJob = (jobId: string) => {
    addNotification({
      type: 'success',
      title: 'आवेदन भेजा गया',
      message: 'आपका आवेदन सफलतापूर्वक भेज दिया गया है'
    });
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'farmer' ? 'मेरी नौकरियां' : 'उपलब्ध काम'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'farmer' 
              ? 'अपनी पोस्ट की गई नौकरियों का प्रबंधन करें'
              : 'अपने क्षेत्र में उपलब्ध काम खोजें'
            }
          </p>
        </div>
        
        {user?.role === 'farmer' && (
          <button
            onClick={() => setShowCreateJob(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>नई नौकरी पोस्ट करें</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="काम या स्थान खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">सभी प्रकार</option>
                <option value="harvesting">कटाई</option>
                <option value="planting">रोपाई</option>
                <option value="picking">तुड़ाई</option>
                <option value="weeding">निराई</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-6">
        {filteredJobs.length === 0 ? (
          <div className="card text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">कोई काम नहीं मिला</h3>
            <p className="text-gray-600">
              अपनी खोज को बदलने की कोशिश करें या बाद में वापस आएं
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="card card-hover">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600">किसान: {job.farmer_name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {job.distance && (
                        <span className="text-sm text-green-600 font-medium">{job.distance}</span>
                      )}
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(job.status)}`}>
                        {getStatusText(job.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{job.workers_needed} मजदूर चाहिए</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm font-semibold">₹{job.wage_per_day}/दिन</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{job.duration_days} दिन</span>
                      </div>
                    </div>
                  </div>

                  {job.requirements && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">आवश्यकताएं:</span> {job.requirements}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>पोस्ट किया: {job.posted_date}</span>
                      {job.applications && (
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{job.applications} आवेदन</span>
                        </span>
                      )}
                    </div>
                    
                    {user?.role !== 'farmer' && job.status === 'open' && (
                      <button
                        onClick={() => handleApplyJob(job.id)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        आवेदन करें
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Job Modal (placeholder) */}
      {showCreateJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">नई नौकरी पोस्ट करें</h2>
            <p className="text-gray-600 mb-6">
              यह फीचर जल्द ही उपलब्ध होगा। कृपया बाद में कोशिश करें।
            </p>
            <button
              onClick={() => setShowCreateJob(false)}
              className="w-full btn-primary"
            >
              बंद करें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBoard;