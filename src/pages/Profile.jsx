import Sidebar from '../components/Sidebar'
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
import { selectProducts,fetchProducts } from '../Reducers/ProductReducer'

import SubscriptionPage from '../components/SubscriptionPage'

// import { isMobile,isBrowser } from 'react-device-detect';

function Profile() {
  const products = useSelector(selectProducts);
   const currentUser = useSelector((state) => state.user);

const [followingProducts, setFollowingProducts] = useState([])
  const [userApps, setUserApps] = useState(followingProducts)

  const id = localStorage.getItem('userId')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [savedProducts, setSavedProducts] = useState([])
  const [savedApp, setSavedApp] = useState(false)
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  
  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
    }
    
    if (currentUser?.products?.data?.following_app && products) {
      const followingProductIds = currentUser.products.data.following_app.map(item => item._id);
      setFollowingProducts(products.filter(product => followingProductIds.includes(product._id)))
      const savedProductIds = currentUser.products.data.saved.map(item => item._id);
      const filteredProducts = products.filter(product => savedProductIds.includes(product._id));
      setSavedProducts(filteredProducts);
    }

    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 475px)').matches);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentUser, products,dispatch]);


  useEffect(() => {
    // Update userApps based on savedApp state
    setUserApps(savedApp ? savedProducts : followingProducts);

    if(isMobile){
      console.log('mob-version')
    }else{
      console.log('web-version')
    }
  
  }, [savedApp, followingProducts, savedProducts,isMobile, userApps]);

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
    document.body.style.overflow = 'hidden'
  }
  const handleOverlayDoubleClick = () => {
    setShowOverlay(false);
    document.body.style.overflow = ''
  };
  // const handleSidebarClick = (component) => {
  //   setActiveComponent(component);
  // };
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

    <>
    <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} handleLogout={handleLogout}/>
    
 
     
{
 activeComponent === 'dashboard' && 
 <div className="dashboard-main">
        <h2>My Applications</h2>

        <div className="filters">
          
          <div className={`filter-item ${selectedFilter === 'All' ? 'selected-filter' : ''}`}
            onClick={() => handleFilterClick('All')}
          >All</div>
  
        <select id="dropdown" onChange={handleDropdownChange} value={selectedDropdownValue} 
         className={`filter-item reaction-selector ${selectedFilter === 'Status' ? 'selected-filter' : ''}`}
         onClick={() => handleFilterClick('Status')}>
        <option value="option1">I am using it</option>
        <option value="option2">Yes, I want to </option>
         <option value="option3">Maybe</option>
         <option value="option4">No, I don't </option>
        </select>
       
          <div
          className={`filter-item ${selectedFilter === 'Ratings' ? 'selected-filter' : ''}`}
          onClick={() => handleFilterClick('Ratings')}>⭐ My ratings</div>
          <div className={`filter-item ${selectedFilter === 'Comments' ? 'selected-filter' : ''}`}
            onClick={() => handleFilterClick('Comments')}>💬 My comments</div>
          <div className={`filter-item ${selectedFilter === 'Saved' ? 'selected-filter' : ''}`}
            onClick={() => handleFilterClick('Saved')}> <BsBookmark/></div>
        </div>
        <div className='sort-select'>

        <div className="flex sort-by" onClick={ handleSortClick}>
          <img src={sort} alt="" />
          <p>{sortText}</p>
         
        </div>

        <select id="dropdown" onChange={handleDropdownChange} value={selectedDropdownValue} 
         className={` desktop-none filter-item reaction-selector ${selectedFilter === 'Status' ? 'selected-filter' : ''}`}
         onClick={() => handleFilterClick('Status')}>
        <option value="option1">I am using it</option>
        <option value="option2">Yes, I want to </option>
         <option value="option3">Maybe</option>
         <option value="option4">No, I don't </option>
        </select>
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
   <ProfileProductsList userApps={userApps} id={id} savedApp={savedApp} isMobile={isMobile}/>
}
       
      </div>
}

  {activeComponent === 'profilepage' && <ProfilePage/>}  
  {activeComponent === 'subscriptions' && <SubscriptionPage/>}  
      
    </>
  );
}

export default Profile