import React from 'react'
// import logo from "../../assets/logo.ico"
import { Link } from "react-router-dom"
import useLogOut from '../../adminHooks/useLogOut'
import logo from '../../../../assets/img/new-logo.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar({searchInput}) {
    const navigate = useNavigate()
    const {isAdmin} = useSelector((state)=> state.adminAuth)
   const {logout} = useLogOut()

   const  handleSearchInput=(e)=>{
    searchInput(e.target.value)
   }

   const handleMouseEnter = () => {
    const menu = document.getElementsByClassName('admin-dropdown-menu')[0];
    if (menu) {
        menu.style.display = 'block';
    }
};

const handleMouseLeave = () => {
    const menu = document.getElementsByClassName('admin-dropdown-menu')[0];
    if (menu) {
        menu.style.display = 'none';
    }
};

const logoutHandler = async () =>{
    await logout()
    navigate('/admin/login')
}
    return (
        <nav>
            <div className="navbar container admin-nav">
                <div>

                <div className="logo">
            <Link to={"/"} >
                <img src={logo} alt=""/>
                </Link>
            </div>
                </div>
                <div>
                    <div className="nav-buttons">
                    <Link to="/admin/create-category"><button className="button-light" disabled={!isAdmin}>Create Category</button></Link>
                    <Link to="/admin/create-application"><button className="button-light" disabled={!isAdmin}>Create New Application</button></Link>
                    </div>
                    <div className="search">
                        <input type="text" placeholder="Search Application"  onChange={handleSearchInput} disabled={!isAdmin} />

                    </div>
                    {
                        isAdmin ?  <div className='admin-dropdown'  >
                        <button className="button" onMouseEnter={handleMouseEnter}>Admin</button>
                          <ul  className='admin-dropdown-menu' onMouseLeave={handleMouseLeave}>
                              
                              <li><Link to='/admin/profile' style={{textDecoration:'none', color: 'black'}}>Profile</Link></li>
                              <li><Link to='/admin/dashboard' style={{textDecoration:'none', color: 'black'}}>Dashboard</Link></li>
                              <li><Link to='/admin/setting' style={{textDecoration:'none', color: 'black'}}>Setting</Link></li>
                              <li onClick={logoutHandler}>Logout</li> 
                          </ul>
                      </div> : <></>
                    }
                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar