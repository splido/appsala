import logo from "../assets/img/new-logo.png";
import mobLogo from "../assets/img/mobile-logo.png";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import SeachList from "./SearchList";
import { Link, useLocation } from "react-router-dom";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Reducers/AuthReducer";
import MobSidebar from "./MobSidebar";

function Navbar({ products }) {
  const userId = localStorage.getItem("userId");
  const user = useSelector((state) => state.auth.isAuthenticated);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCategories();
  }, []);
  const apiCategoryUrl =
    "https://appsala-backend.netlify.app/.netlify/functions/index/category";

  const fetchCategories = async () => {
    try {
      const response = await fetch(apiCategoryUrl);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searching, setSearching] = useState(false);
  const [dataFilter, setDataFilter] = useState("");
  const [isBlogMenuOpen, setBlogMenuOpen] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLoginPopup = async () => {
    if (user) {
      dispatch(logoutUser());
      window.location.reload();
    } else {
      setLoginPopupOpen(true);
      setShowSidebar(false)
      setRegisterPopup(false);
      setShowOverlay(true);
      document.body.style.overflow = 'hidden';
    }
  };
  const handleRegisterPopup = () => {
    setRegisterPopup(true);
    setShowOverlay(true);
    setShowSidebar(false)
    setLoginPopupOpen(false);
   
  };

  const handleOverlayDoubleClick = () => {
    setShowOverlay(false);
  };
  const handleMouseEnter = (e) => {
    if (e.target.innerHTML === "Categories") {
      setMenuOpen(true);
    }
    if (e.target.innerHTML === "Blog") {
      setBlogMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSearching(false);
    setMenuOpen(false);
    setBlogMenuOpen(false);
    setDataFilter("");
  };
  const onHandleChange = (e) => {
    e.preventDefault()
    setSearchVal(e.target.value);
    setSearching(true);
    filterData();
  };
  const onHandleClick = (e) => {
    setSearching(true);
  };

  const filterData = () => {
    const filteredData = products?.filter((item) =>
      item.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setDataFilter(filteredData);
  };
  const location = useLocation();

  // Do not render the navbar on the "Dashboard" page

  const locationProfile = 
  location.pathname === "/profile" ||
  location.pathname.startsWith("/profile/")

  const isDisplayNone =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  if (isDisplayNone) {
    return null;
  }
 
  const toggleSidebar = () =>{
    setShowOverlay(true)
    setShowSidebar(true)
    setLoginPopupOpen(false);
    setRegisterPopup(false)
    document.body.style.overflow = 'hidden';
  }

  const closeSidebar = () =>{
    setShowSidebar(false)  
    document.body.style.overflow = '';
  }
  return (
    <div>
      {showOverlay && loginPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <LoginPopup setLoginPopupOpen={setLoginPopupOpen} />
        </div>
      )}

      {showOverlay && registerPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RegisterPopup
            setLoginPopupOpen={setLoginPopupOpen}
            setRegisterPopup={setRegisterPopup}
          />
        </div>
      )}

      { showOverlay && showSidebar && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
       <MobSidebar closeSidebar={closeSidebar} childs={categories} setLoginPopupOpen={setLoginPopupOpen} setRegisterPopup={setRegisterPopup}
        setShowOverlay={setShowOverlay}
      />
        </div>
        )
      }

      <nav className={locationProfile ? 'dashboard-navbar' : ''}>
        <div className="nav-container">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>

          <div className="nav-items">
          <Link to={"/"}>
            <img src={mobLogo} alt="mobile-logo" /></Link>
            <ul className="hover-menu-container">
              <li
                className="dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={"/"}>Categories</Link>

                {isMenuOpen && (
                  <div>
                    <Menu childs={categories} />
                  </div>
                )}
              </li>
              <li className="dropdown">
                <Link to={"/blog"}>Blog</Link>
              </li>
            </ul>
            <form >
              <input
                onChange={onHandleChange}
                onClick={onHandleClick}
                onMouseEnter={handleMouseEnter}
                value={searchVal}
                type="text"
                name=""
                id="nav-input"
                placeholder="Enter Product, Software , Service"
                autoComplete="off"
              />
              {searching && dataFilter.length > 0 && searchVal.length > 0 && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <SeachList filteredData={dataFilter} />
                </div>
              )}
            </form>
            <div className="mob-menu">
              <input id="menu-toggle" type="checkbox" onClick={toggleSidebar}/>
              <label className="menu-button-container" htmlFor="menu-toggle">
                <div className="menu-button"></div>
              </label>

              <ul className="menu">
                <li>
                  <a href="">Categories</a>
                </li>
                <li>
                  <a href="">Blogs</a>
                </li>
              </ul>
            </div>
            {
              !locationProfile && <div className="button-div">
              <button
                type="btn"
                className="btn btn-light"
                onClick={() => handleLoginPopup()}
              >
                {" "}
                {user ? "Logout" : "Login"}
              </button>

              {user ? (
                <>
                  <button
                    type="btn"
                    className="btn btn-dark"
                  >
                    <Link to={`/profile/${userId}`} className="link">
                      Dashboard
                    </Link>
                  </button>
                </>
              ) : (
                <button
                  type="btn-light"
                  className="btn btn-dark"
                  onClick={() => handleRegisterPopup()}
                >
                  Register
                </button>
              )}
            </div>
            }
           
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
