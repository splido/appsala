import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const AdminRoute = ({ children }) => {
  const {isAdmin} = useSelector((state)=> state.adminAuth)
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
