import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import FarmerDashboard from './FarmerDashboard';
import GroupLeaderDashboard from './GroupLeaderDashboard';
import LaborerDashboard from './LaborerDashboard';
import ExpertDashboard from './ExpertDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'group_leader':
      return <GroupLeaderDashboard />;
    case 'laborer':
      return <LaborerDashboard />;
    case 'expert':
      return <ExpertDashboard />;
    default:
      return <FarmerDashboard />;
  }
};

export default Dashboard;