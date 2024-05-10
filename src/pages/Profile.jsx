
import { LuLayoutDashboard } from 'react-icons/lu'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsBookmark } from 'react-icons/bs'

import logo from '../assets/img/logo.png'
import sort from '../assets/img/sort.svg'
import searchIcon from '../assets/img/search.svg'
import ProfileProductsList from '../components/ProfileProductsList'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ProfilePage from '../components/ProfilePage'
import { logoutUser } from '../Reducers/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { selectProducts } from '../Reducers/ProductReducer'

function Profile() {
  const products = useSelector(selectProducts);
   const currentUser = useSelector((state) => state.user);

const [followingProducts, setFollowingProducts] = useState([])
  // const followingApps = currentUser?.products?.data?.following_app
  const [userApps, setUserApps] = useState(followingProducts)

  const id = localStorage.getItem('userId')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [savedProducts, setSavedProducts] = useState([])
  const [savedApp, setSavedApp] = useState(false)
  
  useEffect(() => {
    if (currentUser?.products?.data?.following_app && products?.data) {
      const followingProductIds = currentUser.products.data.following_app.map(item => item._id);
      setFollowingProducts(products.data.filter(product => followingProductIds.includes(product._id)))
      const savedProductIds = currentUser.products.data.saved.map(item => item._id);
      const filteredProducts = products.data.filter(product => savedProductIds.includes(product._id));
      setSavedProducts(filteredProducts);
    }
  }, [currentUser, products]);

  useEffect(() => {
    // Update userApps based on savedApp state
    setUserApps(savedApp ? savedProducts : followingProducts);
  }, [savedApp, followingProducts, savedProducts]);

  const [sortFilter, setSortFilter] = useState(false);
  
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const sortOrder = 'asc';
  // const [sortOrder, setSortOrder] = useState('asc');
  const [showOverlay, setShowOverlay] = useState(false);
  const [sortList, showSortList] = useState(false);
  const [user, setUser] = useState(currentUser.products?.data)
  const [searchVal, setSearchVal] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('option1');
  const [sortText, setSortText] = useState('Sort by');
  // console.log(sortFilter, sortOrder)
 
  
  const handleLogout = () => {
    window.location.reload();
    dispatch(logoutUser());
    navigate('/');
 
  };
  const handleSortClick = () => {
    showSortList(!sortList);
    setShowOverlay(true);
  }
  const handleOverlayDoubleClick = () => {
    setShowOverlay(false);
  };
  const handleSidebarClick = (component) => {
    setActiveComponent(component);
  };
  const calculateAverageRating = (appData) => {
    
    const  rating  = appData || {
      Company:0,
      Features: 0,
      Performance:0,
      Support:0,
      Usability:0,
      Value:0
    }
    // console.log(rating)
    if(rating){
      const totalRatings = Object.values(rating).reduce((sum, value) => sum + value, 0)
      const numberOfRatings = Object.keys(rating).length;
      const averageRating = totalRatings / numberOfRatings;
      return averageRating;
    }

  };

  const handleSortToggle = (type) => {
    const filterFollowed = currentUser?.products?.data?.following_app
    setShowOverlay(false)
    if (type === 'latest') {
      setSortText('Latest');
      var sortedItems = [...filterFollowed].sort((a, b) => {
        var dateA = new Date(a.subscription.date);
        var dateB = new Date(b.subscription.date);
        return dateA - dateB;
    })
    const sortedItemsIds = sortedItems.map(app => app._id);
    sortedItems = userApps.filter(app => sortedItemsIds.includes(app._id));
    console.log(sortedItems)
    setUserApps(sortedItems);
    } else if (type === 'oldest') {
      setSortText('Oldest');
       sortedItems = [...filterFollowed].sort((a, b) => {  
        var dateA = new Date(a.subscription.date);
        var dateB = new Date(b.subscription.date);
        return dateB - dateA;
    })
    
    const sortedItemsIds = sortedItems.map(app => app._id);
    sortedItems = userApps.filter(app => sortedItemsIds.includes(app._id));
    console.log(sortedItems)
    setUserApps(sortedItems);
   
  }
  if (type === 'highest') {
    setSortText('Highest');
    var sortedItems = [...filterFollowed].sort((a, b) => {
      const averageRatingA = calculateAverageRating(a.subscription.user_ratings[0]?.rating);
      const averageRatingB = calculateAverageRating(b.subscription.user_ratings[0]?.rating);
      return averageRatingB - averageRatingA;
    });
    const sortedItemsIds = new Set(sortedItems.map(app => app._id)); // Convert to a Set for faster lookup
    const filteredUserApps = [];
    
    for (const id of sortedItemsIds) {
      for (const app of userApps) {
          if (app._id === id) {
              filteredUserApps.push(app);
              break; 
          }
      }
  }
    setUserApps(filteredUserApps);
    
  } if (type === 'lowest') {
    setSortText('Lowest');
    var sortedItems = [...filterFollowed].sort((a, b) => {
      const averageRatingA = calculateAverageRating(a.subscription.user_ratings[0]?.rating);
      const averageRatingB = calculateAverageRating(b.subscription.user_ratings[0]?.rating);
      return averageRatingA - averageRatingB;
    });
    
    const sortedItemsIds = new Set(sortedItems.map(app => app._id)); // Convert to a Set for faster lookup
    const filteredUserApps = [];
    
    for (const id of sortedItemsIds) {
      for (const app of userApps) {
          if (app._id === id) {
              filteredUserApps.push(app);
              break; 
          }
      }
  }
    setUserApps(filteredUserApps);
    
    
  }
  setSortFilter(true)
}

const AllUsers = () =>{
  setSavedApp(false)
  setUserApps(followingProducts)
  setUser(currentUser.products?.data)
  setSelectedFilter('All')
  setSortText('Sort by')
}

const handleFilterClick = (filter) => {
  setSavedApp(false);
  if (filter === 'All') {
    AllUsers();
  } 
  else if (filter === 'Comments') {
    filterComments();
  } 
  else if (filter === 'Status') {
    filterStatus();
  }
  else if (filter === 'Ratings') {
    filterRatings();
  } 
  else if (filter === 'Saved') {
    filterSaved();
  } 
  else {
    setSelectedFilter(filter); 
  }
  setSortText('Sort by');
};

const filterComments = () =>{
 const filterCommented = currentUser?.products?.data?.following_app?.filter((i) => (i.subscription.comment.length > 0))
 const filterCommentedIds = filterCommented.map(app => app._id);
 const commentedApps = userApps.filter(app => filterCommentedIds.includes(app._id));
 setUserApps(commentedApps)
 setSelectedFilter('Comments')
}

const filterSaved = () =>{
  setSavedApp(true)
  setUserApps(savedProducts)
  setSelectedFilter('Saved')
 }
 
const filterRatings = () =>{
  setSavedApp(false)
  const filterRated = currentUser?.products?.data?.following_app?.filter((i) => (i.subscription?.user_ratings[0]?.rating ))
  const filterRatedIds = filterRated.map(app => app._id);
  const ratedApps = userApps.filter(app => filterRatedIds.includes(app._id));
  setUserApps(ratedApps)
  setSelectedFilter('Ratings')
 }

const filterStatus = () =>{
  if (selectedDropdownValue === 'option1'){
    const filterStatus = currentUser?.products?.data?.following_app?.filter((i) => (i.status === 'I am using it 👍'))
    console.log(filterStatus)
    const filterStatusIds = filterStatus.map(app => app._id);
  const statusApps = userApps.filter(app => filterStatusIds.includes(app._id));
    setUserApps(statusApps)
  } if (selectedDropdownValue === 'option2'){
    const filterStatus = currentUser?.products?.data?.following_app?.filter((i) => (i.status === 'Yes, i want to 🤩'))
    const filterStatusIds = filterStatus.map(app => app._id);
    const statusApps = userApps.filter(app => filterStatusIds.includes(app._id));
      setUserApps(statusApps)
  }
  if (selectedDropdownValue === 'option3'){
    const filterStatus = currentUser?.products?.data?.following_app?.filter((i) => (i.status === 'Maybe 🤔'))
    console.log(filterStatus)
    const filterStatusIds = filterStatus.map(app => app._id);
    const statusApps = userApps.filter(app => filterStatusIds.includes(app._id));
      setUserApps(statusApps)
  }
  if (selectedDropdownValue === 'option4'){
    const filterStatus = currentUser?.products?.data?.following_app?.filter((i) => (i.status === "No, i don't 😑"))
    console.log(filterStatus)
    const filterStatusIds = filterStatus.map(app => app._id);
    const statusApps = userApps.filter(app => filterStatusIds.includes(app._id));
      setUserApps(statusApps)
  }
  
 
  setSelectedFilter('Status')
 }

const handleDropdownChange = (event) => {
  const selectedValue = event.target.value;
  // setSelectedDropdownValue(selectedValue);
  // console.log(selectedValue)
  setSelectedDropdownValue(selectedValue)
};

const onHandleChange =(e)=>{
  setSearchVal(e.target.value)
  const filterSearch = user?.following_app?.filter((i) => (i.obj_id.name.toLowerCase().includes(searchVal.toLowerCase()) ))
  // console.log(filterSearch)
  setUserApps(filterSearch)
 }

  return (
    <div className="profile">
      <div className="sidebar">
        <Link to={"/"}>
        <img src={logo} style={{ height:'50px'}}
        alt="" />
        </Link>
        <div   className={`icon ${activeComponent === 'dashboard' ? 'filter-selected' : ''}`}>

        <LuLayoutDashboard
        onClick={() => handleSidebarClick('dashboard')} /> <p>Dashboard</p>
        </div>
        <div  className={`icon ${activeComponent === 'profilepage' ? 'filter-selected' : ''}`}>

        <HiOutlineUserCircle
        onClick={() => handleSidebarClick('profilepage')} /> <p>Profile</p>
        </div>
        <div  className={`icon ${activeComponent === 'settings' ? 'filter-selected' : ''}`}>
        <RiLogoutBoxRLine  
        onClick={() => handleLogout()} />
        <p>Logout</p>
        </div>
      
      </div>
{
 activeComponent === 'dashboard' && 
 <div className="main">
        <div className="top">
          <p>My Applications</p>
          <div className="search">
            <form>
              <input
              onChange={onHandleChange} 
              value={searchVal} 
                type="text"
                id="search"
                placeholder="Search"
                autoComplete="off"
              />
            </form>
            <div className="seach-icon">
              <img src={searchIcon} alt="" />
            </div>
          </div>
        </div>

        <div className="filters">
          <div className={`filter ${selectedFilter === 'All' ? 'selectedFilter' : ''}`}
            onClick={() => handleFilterClick('All')}
          >All</div>
          <div className={`filter ${selectedFilter === 'Status' ? 'selectedFilter' : ''}`}
            onClick={() => handleFilterClick('Status')}>
        <select id="dropdown" onChange={handleDropdownChange} value={selectedDropdownValue} >
        <option value="option1">I am using it</option>
        <option value="option2">Yes, I want to </option>
         <option value="option3">Maybe</option>
         <option value="option4">No, I don't </option>
        </select>
          </div>
          <div
          className={`filter ${selectedFilter === 'Ratings' ? 'selectedFilter' : ''}`}
          onClick={() => handleFilterClick('Ratings')}>⭐ My ratings</div>
          <div className={`filter ${selectedFilter === 'Comments' ? 'selectedFilter' : ''}`}
            onClick={() => handleFilterClick('Comments')}>💬 My comments</div>
          <div className={`filter ${selectedFilter === 'Saved' ? 'selectedFilter' : ''}`}
            onClick={() => handleFilterClick('Saved')}> <BsBookmark/> Saved</div>
        </div>

        <div className="sort" onClick={ handleSortClick}>
          <img src={sort} alt="" />
          <p>{sortText}</p>
        </div>
        {
          sortList && showOverlay &&
          (
            <div className="sort-overlay" onDoubleClick={handleOverlayDoubleClick}>
           <ul className='sort-list'>
          <li onClick={()=>handleSortToggle('latest')}>Latest</li>
          <li  onClick={()=>handleSortToggle('oldest')}>Oldest</li>
          <li onClick={()=>handleSortToggle('highest')}>Highest</li>
          <li onClick={()=>handleSortToggle('lowest')} >Lowest</li>
        </ul>
          </div>
          )
          
        }
    
{
   <ProfileProductsList userApps={userApps} id={id} savedApp={savedApp}/>
}
       
      </div>
}

  {activeComponent === 'profilepage' && <ProfilePage/>}  
      
    </div>
  );
}

export default Profile