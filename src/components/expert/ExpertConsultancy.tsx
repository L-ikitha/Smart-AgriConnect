import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Video, 
  Calendar, 
  Star,
  Clock,
  User,
  CheckCircle,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

interface Expert {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  total_consultations: number;
  languages: string[];
  availability: 'available' | 'busy' | 'offline';
  price_per_hour: number;
  profile_image?: string;
  bio: string;
}

interface Consultation {
  id: string;
  expert_id: string;
  expert_name: string;
  type: 'chat' | 'call' | 'video';
  topic: string;
  scheduled_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

const ExpertConsultancy: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('all');

  useEffect(() => {
    // Mock experts data
    const mockExperts: Expert[] = [
      {
        id: '1',
        name: 'Dr. Priya Patel',
        specialization: 'Crop Protection',
        experience: 12,
        rating: 4.9,
        total_consultations: 450,
        languages: ['Hindi', 'Gujarati', 'English'],
        availability: 'available',
        price_per_hour: 500,
        bio: 'PhD in Agricultural Science, specializing in crop disease and pest management'
      },
      {
        id: '2',
        name: 'Dr. Rajesh Kumar',
        specialization: 'Soil Science',
        experience: 15,
        rating: 4.8,
        total_consultations: 380,
        languages: ['Hindi', 'English'],
        availability: 'available',
        price_per_hour: 600,
        bio: '15 years experience in soil testing and fertility management'
      },
      {
        id: '3',
        name: 'Dr. Sunita Sharma',
        specialization: 'Organic Farming',
        experience: 10,
        rating: 4.7,
        total_consultations: 320,
        languages: ['Hindi', 'Punjabi', 'English'],
        availability: 'busy',
        price_per_hour: 450,
        bio: 'Expert in organic agriculture and sustainable farming methods'
      },
      {
        id: '4',
        name: 'Dr. Amit Verma',
        specialization: 'Horticulture',
        experience: 8,
        rating: 4.6,
        total_consultations: 280,
        languages: ['Hindi', 'English'],
        availability: 'available',
        price_per_hour: 400,
        bio: 'Specializing in fruit and vegetable cultivation with modern techniques'
      }
    ];

    // Mock consultations
    const mockConsultations: Consultation[] = [
      {
        id: '1',
        expert_id: '1',
        expert_name: 'Dr. Priya Patel',
        type: 'video',
        topic: 'Wheat pest infestation',
        scheduled_time: '2025-01-22 14:00',
        status: 'confirmed',
        price: 500
      },
      {
        id: '2',
        expert_id: '2',
        expert_name: 'Dr. Rajesh Kumar',
        type: 'chat',
        topic: 'Soil testing',
        scheduled_time: '2025-01-20 10:00',
        status: 'completed',
        price: 300
      }
    ];

    setExperts(mockExperts);
    setConsultations(mockConsultations);
  }, []);

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterSpecialization === 'all' || 
                         expert.specialization.toLowerCase().includes(filterSpecialization.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  const handleBookConsultation = (expert: Expert, type: 'chat' | 'call' | 'video') => {
    const newConsultation: Consultation = {
      id: Date.now().toString(),
      expert_id: expert.id,
      expert_name: expert.name,
      type,
      topic: 'General consultation',
      scheduled_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      price: type === 'chat' ? expert.price_per_hour * 0.6 : expert.price_per_hour
    };

    setConsultations(prev => [...prev, newConsultation]);
    setShowBooking(false);
    setSelectedExpert(null);

    addNotification({
      type: 'success',
      title: 'Consultation Booked',
      message: `${type} consultation with ${expert.name} has been booked`
    });
  };

  const getAvailabilityColor = (availability: Expert['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: Expert['availability']) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return availability;
    }
  };

  const getStatusColor = (status: Consultation['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Consultation['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card gradient-bg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Agricultural Expert Consultancy</h1>
            <p className="text-green-100 text-lg">
              Get advice from certified agricultural experts
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-sm text-green-100">24/7 Available</p>
              <p className="font-semibold">Expert Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search experts or specializations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Specializations</option>
              <option value="crop protection">Crop Protection</option>
              <option value="soil science">Soil Science</option>
              <option value="organic farming">Organic Farming</option>
              <option value="horticulture">Horticulture</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Experts List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Available Experts</h2>
          
          {filteredExperts.map((expert) => (
            <div key={expert.id} className="card card-hover">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{expert.name}</h3>
                      <p className="text-green-600 font-medium">{expert.specialization}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getAvailabilityColor(expert.availability)}`}>
                      {getAvailabilityText(expert.availability)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{expert.bio}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{expert.rating}</span>
                    </div>
                    <span>{expert.experience} years experience</span>
                    <span>{expert.total_consultations} consultations</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Languages: {expert.languages.join(', ')}</p>
                      <p className="text-sm font-semibold text-gray-900">₹{expert.price_per_hour}/hour</p>
                    </div>
                    
                    {expert.availability === 'available' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleBookConsultation(expert, 'chat')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Chat consultation"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleBookConsultation(expert, 'call')}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Phone consultation"
                        >
                          <Phone className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleBookConsultation(expert, 'video')}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                          title="Video consultation"
                        >
                          <Video className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My Consultations */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">My Consultations</h2>
          
          <div className="space-y-3">
            {consultations.length === 0 ? (
              <div className="card text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No consultations booked</p>
              </div>
            ) : (
              consultations.map((consultation) => (
                <div key={consultation.id} className="card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{consultation.expert_name}</h4>
                      <p className="text-sm text-gray-600">{consultation.topic}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultation.status)}`}>
                      {getStatusText(consultation.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      {consultation.type === 'chat' && <MessageCircle className="w-4 h-4" />}
                      {consultation.type === 'call' && <Phone className="w-4 h-4" />}
                      {consultation.type === 'video' && <Video className="w-4 h-4" />}
                      <span className="capitalize">{consultation.type}</span>
                    </div>
                    <span>₹{consultation.price}</span>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(consultation.scheduled_time).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {consultation.status === 'confirmed' && (
                    <div className="mt-3">
                      <button className="w-full btn-primary text-sm py-2">
                        Start Consultation
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertConsultancy;