import performance from "../assets/img/performance.png";
import dog from "../assets/img/dog.png";
import ankr from "../assets/img/ankr.png";
import notification from "../assets/img/notification1.png";
import notepad from "../assets/img/notepad2.png";
import pana from "../assets/img/pana.png";
import board from "../assets/img/board.png";
import woman from "../assets/img/woman.png";
import girl from "../assets/img/girl.png";
import man from "../assets/img/man.png";
import battery from "../assets/img/battery.png";
import mask from "../assets/img/mask.png";
import footerBanner from "../assets/img/footer-banner.png";
import hands from "../assets/img/hands.png";
import app from "../assets/img/app.png";
import { TiTick } from "react-icons/ti";
import RegisterPopup from "../components/RegisterPopup";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchUser } from '../Reducers/userReducer'
import { fetchBlogs, selectBlogs, BlogsError, BlogsLoading } from '../Reducers/BlogReducer'
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";

function Home({ products }) {
  const user = useSelector((state) => state.auth.isAuthenticated);
  const blogs = useSelector(selectBlogs);
  const blogLoading = useSelector(BlogsLoading);
  const blogError = useSelector(BlogsError);
  const dispatch = useDispatch();
  const [registerPopup, setRegisterPopup] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const id = localStorage.getItem('userId')

  const handleRegisterPopup = () => {
    if (user) {
      alert("You are already Registered");
    }
    setRegisterPopup(true);
    setShowOverlay(true);
  };

  const handleOverlayDoubleClick = () => {
    setShowOverlay(false);
  };

  
  useEffect(()=>{
    if(id){
      dispatch(fetchUser(id));
    }
    
    try {
      dispatch(fetchBlogs())
    } catch (error) {
      console.log(error);
    }
        },[id] )

  return (
    <div>
      {showOverlay && registerPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RegisterPopup />
        </div>
      )}

      <div className="container bread-crumb">Home / Work & Productivity</div>

      <div className="container">
        <header className="header">
          <div className="header-inner">
            <p className="large">
              Track all your Web Applications in one place.
            </p>
            <p className="header-para">
              {" "}
              Compare, Rate and Review web applications. Keep track of Web
              Applications you use or planning to use. Get alerts before your
              payment is processed. Save your time, money or both!
            </p>
            <input
              type="text"
              placeholder="Enter Product Name or Product"
              className="header-search"
            />
            <p className="header-para">
              A Random selection of Web Applications reviewed{" "}
              <span
                onClick={() => handleRegisterPopup()}
                style={{ cursor: "pointer" }}
              >
                Join us.
              </span>
            </p>
          </div>
        </header>

        <section className="popular-apps">
          <img src={app} alt="" />
          <img src={app} alt="" />
          <img src={app} alt="" />
          <img src={app} alt="" />
          <img src={app} alt="" />
          <img src={app} alt="" />
          <img src={app} alt="" />
        </section>

        <div className="home-main">
          <h1 className="heading">
            Appsala Reviews Over <span>1,000</span> Web Applications
          </h1>

          <img className="home-image" src={performance} alt="" />

          <h1 className="heading">
            Appsala Reviews Over <span>1,000</span> Web Applications
          </h1>

          <p className="home-para">
            Compare, Rate and Review web applications. Keep track of Web
            Applications you use or planning to subscribe. Get alerts before
            your payment is processed. Save your time, money or both!
          </p>
        </div>

        <div className="home-flex">
          <div>
            <img src={dog} alt="flex-image" />
            <div className="reviews-card">
            <div className="flex">
              <TiTick className="tick" />
              <b>Track</b>
              </div>
              <p>
               Tracking the web application you use need not be
                tiresome. Now you can track all the applications in one place.
              </p>
            </div>
            <img src={ankr} alt="" className="image" />
          </div>
          <div>
            <img src={notification} className="image" />
            <div className="reviews-card">
            <div className="flex">
              <TiTick className="tick" />
              <b>Notify</b>
              </div>
              <p>
               Getting unexpected credit card charges could be a
                thing of the past. Get notification before due date so that you
                can decide to cancel a subscription if not needed.
              </p>
            </div>
            <img src={woman} alt="flex-image" />
          </div>
          <div>
            <img src={pana} alt="flex-image" />
            <div className="reviews-card">
              <div className="flex">
              <TiTick className="tick" />
              <b>Review</b>
              </div>
          
                 <p>You might spend countless hours going through
                application reviews. Now do your own reviews which you can share
                only with your team-mates.
              </p>
              
            </div>
            <img src={board} className="image" />
          </div>
          <div>
            <img src={notepad} className="image" />
            <div className="reviews-card">
            <div className="flex">
              <TiTick className="tick" />
              <b>Notes</b>
              </div>
              <p>
                There is a chance you need to look for certain
                features or do further review later. Keep note of everything by
                keeping private notes on an application.{" "}
              </p>
            </div>
            <img src={girl} alt="flex-image" />
          </div>
        </div>

        <div className="bar">
          <h1>Can't Find a Review You are Looking For?</h1>
          <img src={man} alt="" />
          <div>
            <span>
              <p>
                Our team is willing and ready to do it in a short notice. Just
                submit the website URL, and we will be upto the task in no time!
              </p>
              <button
                className="btn-dark"
                onClick={() => handleRegisterPopup()}
                style={{ height: "30px", width: "100px", padding: "5px" }}
              >
                Register Now
              </button>
            </span>
          </div>
        </div>

        <h1 className="heading" style={{ marginTop: "-8rem" }}>
          Appsala Reviews Over <span>1,000</span> Web Applications
        </h1>
      </div>

      <div className="blogs-grid home-page-blogs-grid">     
  
  {
    blogLoading ? <Spinner/> : blogError ?  <p>{blogError}</p> :
    blogs && blogs.map((blog, index)=>{
      return(
        <BlogCard blog={blog} key={index}/>    
      )
    })
  }
   
      </div>

      <div className="home-before-footer">
        <h1>
          Get Started With <span>Appsala</span>
        </h1>
        <button className="btn-dark btn" onClick={() => handleRegisterPopup()}>
          Register for free now
        </button>
        <div className="ticks">
          <div className="tick-div">
            <TiTick className="tick" />
            <p>Start Building a Website</p>
          </div>
          <div className="tick-div">
            <TiTick className="tick" />
            <p>Start Building a Website</p>
          </div>
          <div className="tick-div">
            <TiTick className="tick" />
            <p>Start Building a Website</p>
          </div>
        </div>
        <img src={footerBanner} alt="" className="before-footer-image" />
      </div>
    </div>
  );
}

export default Home;
