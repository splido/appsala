import { Outlet } from 'react-router-dom';
import NavBar from './adminComponents/AdminNavbar/Navbar'

const AdminLayout = ({handleSearchInput}) => {
  return (
    <div>
      <NavBar searchInput={handleSearchInput}/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminLayout;
