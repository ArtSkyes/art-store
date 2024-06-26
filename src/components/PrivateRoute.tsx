import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
