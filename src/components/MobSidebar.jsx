import logo from '../assets/img/new-logo.png'
import logo2 from '../assets/img/logo.png'
import userImg from  '../assets/img/user.png' 
import { RiCloseCircleFill,RiLogoutBoxRLine } from "react-icons/ri";
import { ImBlog } from "react-icons/im";
import { FaBook } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { IoCaretDownOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BiDollarCircle } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Reducers/AuthReducer";

const MobSidebar = ({closeSidebar, childs,setRegisterPopup,setLoginPopupOpen,setShowOverlay}) => {
  const [subCategory, setSubCategory] = useState('');
  const [subMenu, setSubMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)
  const [isDashboardSidebar, setIsDashboardSidebar] = useState(false)
  const user = useSelector((state) => state.auth.isAuthenticated);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (childs?.data) {
      const categoryNames = childs.data;
      setCategories(categoryNames);
      // console.log(childs.data)
    }
    if(location.pathname === "/profile" ||
     location.pathname.startsWith("/profile/") ){
      setIsDashboardSidebar(true)
     }
  }, [childs]);

  const handleCloseSidebar = () =>{
    closeSidebar()
  }
  const handleLoginPopup = () =>{
    setLoginPopupOpen(true)
    setShowOverlay(true)
    closeSidebar()
  }
  const handleRegisterPopup = () =>{
    setRegisterPopup(true)
    setShowOverlay(true)
    closeSidebar()
  }
  const handleClick = (item) => {
    setSubMenu(!subMenu);
    setSubCategory(item.name)
  };

  const handleLogout = () =>{
    dispatch(logoutUser())
    closeSidebar()
    window.location.reload()
    navigate('/')
  }
  if(isDashboardSidebar){
    return (
      <div  className="mobile-dashboard-sidebar sidebar-2">
      
        <div className="mobile-sidebar">
        <div className="sidebar-user-image">
        <HiOutlineUserCircle
            size="50px"
            color='#F11A7B'
          /> 
            <p>Rafi</p>
        </div>
        <div className="sidebar-menu">
          
          <Link to='/' className="flex sidebar-menu-item sidebar-menu-link" onClick={handleCloseSidebar}>
          <IoMdHome  color='#F11A7B' size='30px'/>
              <p>Home</p>
          </Link>

          <div className="flex sidebar-menu-item">
          <Link className='flex sidebar-menu-link' to={`/profile/${userId}`} onClick={handleCloseSidebar} > 
           <LuLayoutDashboard
            size="30px"
            color='#F11A7B'
          /> 
            <p>Dashboard</p> 
          </Link>
          </div> 
          <div className="flex sidebar-menu-item">
          <Link className='flex sidebar-menu-link' to={`/profile/${userId}/dashboard-profile`} onClick={handleCloseSidebar} > 
           <HiOutlineUserCircle
            size="30px"
            color='#F11A7B'
          /> 
            <p>Profile</p> 
          </Link>
          </div>    
          <div className="flex sidebar-menu-item">
          <Link className='flex sidebar-menu-link' to={`/profile/${userId}/my-subscriptions`} onClick={handleCloseSidebar} > 
           <BiDollarCircle
            size="30px"
            color='#F11A7B'
          /> 
            <p>Subscriptions</p> 
          </Link>
          </div>   
         
          
          <div className="sidebar-menu-item">
          <div className='flex' onClick={handleLogout}>
           <RiLogoutBoxRLine
            size="30px"
            color='#F11A7B'
          /> 
            <p>Logout</p> 
          </div>
          </div>

                
      </div>


      <img src={logo} alt="sidebar-logo"/>
        <div className="close-sidebar" onClick={handleCloseSidebar}>  
        <div className="flex">   
          <RiCloseCircleFill size='20px'/> <p>Close</p></div>
        </div> 
        </div>
        </div>
    )
  }

 
  return (
    <div  className="mobile-dashboard-sidebar sidebar-2">
      
        <div className="mobile-sidebar">
        
        {/* <div className="user-image" style={{marginTop:'2rem'}}>
            <img src={logo2} alt="logo1"/>
        </div> */}

        <div className="sidebar-menu" style={{marginTop: '4rem'}}>
          
            <Link to='/' className="flex sidebar-menu-item sidebar-menu-link" onClick={handleCloseSidebar}>
            <IoMdHome  color='#F11A7B' size='30px'/>
                <p>Home</p>
            </Link>
            
            <div className="sidebar-menu-item">
            {user ? 
            <div className='flex' onClick={handleLogout}>
             <RiLogoutBoxRLine
              size="30px"
              color='#F11A7B'
            /> 
              <p>Logout</p> 
            </div>
            :<div className='flex ' onClick={handleLoginPopup}> 
            <BsFillGrid3X3GapFill  color='#F11A7B' size='30px'/>
            <p>Login</p>
            </div>
            }
            </div>

            <div className="flex sidebar-menu-item">

            {user ? 
            <Link className='flex sidebar-menu-link' to={`/profile/${userId}`} onClick={handleCloseSidebar} > 
             <LuLayoutDashboard
              size="30px"
              color='#F11A7B'
            /> 
              <p>Dashboard</p> 
            </Link>
            :<div className='flex ' onClick={handleRegisterPopup}>
            <FaBook  color='#F11A7B' size='30px'/>
            <p>Register</p>
            </div>
            }
            </div>


            <div className='sidebar-menu-item'>
              <div className="flex">             
                <MdOutlineCategory  color='#F11A7B' size='30px'/>
                <p>Category</p>
                <IoCaretDownOutline   color='#F11A7B' size='20px' style={{marginLeft:'10px'}} onClick={()=>setShowCategoryMenu(!showCategoryMenu)}/>
                </div>
             { showCategoryMenu && (
                <div className="menu-subcategory">               
                <div >
               
                {categories.map((item,index) => (
                  <>
                  <div className="flex"  key={index}>
                   <IoEllipsisHorizontalOutline color='#F11A7B' size='20px' />
          <p
            className="categories"
            onClick={() => handleClick(item)}
           
          >
            {item.name}
            </p></div>
            <div className="menu-subcategory">               
                <div>
             
                {subMenu  && (
                
          <>
          { subCategory == item.name && item.subCategory_ids.map((i) => (
            <Link to={`/category/${i.slug}`} className='sidebar-menu-link flex' onClick={handleCloseSidebar}>
            <BsDot color='#F11A7B' size='20px' />
            <p key={i._id}> 
              {i.name}
              </p>
              </Link>
          ))}</>
      )}
                </div>   
                </div> 
            </>
        ))}
           

                </div> 
             
                </div>
               ) }
            </div>          
           
            <div className="flex sidebar-menu-item">
              
            <Link to='/blog' className='sidebar-menu-link flex' onClick={handleCloseSidebar}>
            <ImBlog color='#F11A7B' size='30px'/>
                <p>Blog</p>
                </Link>
            </div>
            
        </div>

        <img src={logo} alt="sidebar-logo"/>
        <div className="close-sidebar" onClick={handleCloseSidebar}>  
        <div className="flex">   
          <RiCloseCircleFill size='20px'/> <p>Close</p></div>
        </div> 
    </div>
    </div>
  )


}

export default MobSidebar