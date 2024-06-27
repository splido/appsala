import { Route,Routes } from 'react-router-dom';
import { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminRoute from './AdminRoute';
import AdminLayout from './AdminLayout';
import CreateCategory from './CreateCategory'
import AdminLogin from './AdminLogin';
import EditForm from './EditForm';
import { Navigate } from 'react-router-dom';
  
const AdminRoutes = () => {
  const [selectedValue, setselectedValue] = useState('');
  const handleSearchInput = (value) => {
    setselectedValue(value);
  };
  return ( 
    <Routes>
    <Route path="/" element={<AdminLayout handleSearchInput={handleSearchInput}/>}>
    <Route path="" element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<AdminRoute><AdminDashboard selectedValue={selectedValue}/></AdminRoute>} />
      <Route path="create-category" element={<AdminRoute><CreateCategory /></AdminRoute>} />
      <Route path="create-application" element={<AdminRoute><EditForm /></AdminRoute>} />
      <Route path="update-application/:applicationId" element={<AdminRoute><EditForm /></AdminRoute>} />
      <Route path="login" element={<AdminLogin/>}/> 
    </Route>
  </Routes>
  )
}

export default AdminRoutes