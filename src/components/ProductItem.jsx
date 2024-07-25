// import monday from '../assets/img/monday.png'
import { Link } from "react-router-dom";
import { MdOutlineInsertComment } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import {MdOutlineCategory,MdOutlineExpandMore,MdOutlineExpandLess} from 'react-icons/md'
import { selectUser } from "../Reducers/userReducer";
import { useSelector,useDispatch } from "react-redux";
import { updateUserData,updateUserProductStatus,postComment,deleteComment,updateUserRatings } from "../Reducers/userReducer";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import ReactionComponent from "./ReactionComponent";
import CommentPopup from "./CommentPopup";
import RatingPopup from "./RatingPopup";
import HurryUp from "./HurryUp";
import userImg from '../assets/img/user.png';
import { toast } from "react-hot-toast";
import SubscriptionComponent from "./ProductCardComponents/SubscriptionComponent";
import CommentComponent from "./ProductCardComponents/CommentComponent";
import RatingComponent from "./ProductCardComponents/RatingComponent";

function ProductItem({ product,isMobile }) {
  const dispatch = useDispatch();
  const id = localStorage.getItem('userId')
  const isDisabled = true;
  const [isSaved, setIsSaved] = useState(false);
  const [hurryUpPopup, setHurryUpPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [commentPopupOpen, setCommentPopupOpen] = useState(false);
  const [ratingPopupOpen, setRatingPopupOpen] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const user = useSelector(selectUser);
  const auth = useSelector((state) => state.auth);
  const [appRating, setAppRating] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [appInfo, setAppInfo] = useState([]);
  const [appCommentList, setAppCommentList] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [cardOpen, setCardOpen] = useState(false)
  const [subscription, setSubsciption] = useState();

  var shortDescription = product.shortDescription;
  const words = shortDescription.split(/\s+/);
  const first20Words = words.slice(0, 20).join(" ");
  shortDescription = first20Words + "...";

  const saved_app = user?.products?.data?.saved.find(
    (app) => app._id == product._id
  )
    ? true
    : false;

    const following_app = user?.products?.data?.following_app.find(
    (app) => app._id == product._id
  )
    ? true
    : false;

  const handlePopup = () => {
    if (!auth.isAuthenticated && !isMobile) {
      setShowOverlay(true);
      setHurryUpPopup(true);
    } else if(!isMobile){
      setShowOverlay(true);
      setHurryUpPopup(false);
      setCommentPopupOpen(true);
    }
  };
  const handleLoginPopup = () => {
    if (!auth.isAuthenticated && !isMobile) {
      setShowOverlay(true);
      setHurryUpPopup(true);
    }
  };
  const handleRatingPopup = () => {
    if (!auth.isAuthenticated && !isMobile) {
      setShowOverlay(true);
      setHurryUpPopup(true);
    } else if(!isMobile) {
      setShowOverlay(true);
      setHurryUpPopup(false);
      setCommentPopupOpen(false);
      setRatingPopupOpen(true);
    }
  };
  const handleOverlayDoubleClick = () => {
    setShowOverlay(false);
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      if (saved_app) {
        const save_apps = user?.products?.data?.saved?.map((app) => app._id);
        save_apps?.forEach((appId) => {
          if (appId === product._id) {
            // console.log('following', appId);
            setIsSaved(true);
            setAppRating(
              user.products.data.saved.find((app) => app._id === product._id)
                ?.user_ratings[0]?.rating
            );
            setAppCommentList(
              user.products.data.saved.find((app) => app._id === product._id)
                .comment
            );
            setAppInfo(
              user.products.data.saved.find((app) => app._id === product._id)
            );
            setCurrentStatus(
              user.products?.data?.saved?.find(
                (app) => app?._id === product?._id
              )?.status
            );
            setSubsciption(
              user.products?.data?.saved?.find(
                (app) => app?._id === product?._id
              )?.subscription
            );
          }
        });
      } else if (following_app) {
        const followed_apps = user?.products?.data?.following_app?.map(
          (app) => app._id
        );
        followed_apps?.forEach((appId) => {
          if (appId === product._id) {
            // console.log('following', appId);
            setIsFollowing(true);
            setAppRating(
              user.products.data.following_app.find(
                (app) => app._id === product._id
              )?.subscription?.user_ratings[0]?.rating
            );
            setAppCommentList(
              user.products.data.following_app.find(
                (app) => app._id === product._id
              ).subscription.comment
            );
            setAppInfo(
              user.products.data.following_app.find(
                (app) => app._id === product._id
              )
            );
            setCurrentStatus(
              user.products?.data?.following_app?.find(
                (app) => app?._id === product?._id
              )?.status
            ); 
            setSubsciption(
              user.products?.data?.saved?.find(
                (app) => app?._id === product?._id
              )?.subscription
            );
          }
        });
      } else {
        setIsFollowing(false);
        setIsSaved(false);
        setAppRating([]);
        setAppCommentList([]);
        setAppInfo(product);
        setCurrentStatus("");
      }
    } else {
      setIsFollowing(false);
      setIsSaved(false);
      setAppRating([]);
      setAppCommentList([]);
      //  setAppInfo()
      setCurrentStatus("");
    }
  }, [user?.products?.data?.following_app, user?.products?.data?.saved]);


  const average_calculator = (rating) => {
    //var rating = appRating
    var ratingValues = Object.values(rating);
    var totalValues = ratingValues.length;
    var sum = ratingValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    var average = sum / totalValues;
    return average;
  };
  if (appRating) {
    var average = average_calculator(appRating);
  } else {
    average = 0;
  }

  var product_rating = product?.rating || 0;
  var product_average_rating = average_calculator(product_rating);

  const handleDropdownChange = async(e) => {
    
    setCurrentStatus(e.target.value);          
  var applicationID = product?._id
  const body = {
    productId:applicationID,
    status:e.target.value,
  }
  console.log(body)
    try {
      
    await dispatch(updateUserProductStatus(body)).unwrap()
    await  dispatch(updateUserData(id)).unwrap()    
  
    } catch (error) {
      console.error("Error:", error);
    }
    console.log('done calling')
    
  };

  const handleCardOpen = () =>{
    if(isMobile){
      setCardOpen(!cardOpen)
    }
  }



  return (
    <>
      {showOverlay && hurryUpPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <HurryUp
            setHurryUpPopup={setHurryUpPopup}
            setLoginPopup={setLoginPopup}
            setRegisterPopup={setRegisterPopup}
          />
        </div>
      )}
      {showOverlay && loginPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <LoginPopup />
        </div>
      )}
      {showOverlay && registerPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RegisterPopup
            setLoginPopup={setLoginPopup}
            setRegisterPopup={setRegisterPopup}
          />
        </div>
      )}

      {showOverlay && commentPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <CommentPopup info={appInfo} savedApp={isSaved} />
        </div>
      )}
      {showOverlay && ratingPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RatingPopup
            info={appInfo}
            setRatingPopup={setRatingPopupOpen}
            savedApp={isSaved}
          />
        </div>
      )}

      <div className="product-card">
        <div className="product-card-top">
          <div className="product-card-left flex">
            <div className="product-card-product-image">
            <Link to={`/${product.slug}`}>
              <img src={product.logo} alt="product-image" />
              </Link>
            </div>
            <div className="card-left-div">
              <h2 className="dark-text">
                <Link to={`/${product.slug}`} className="product-link">
                  {" "}
                  {`${product.name.slice(0,15)}...`}
                </Link>
              </h2>
              <div className="stars flex">
                <StarRating rating={product_average_rating} isDisabled={true} />
              </div>
            </div>
            <select id="reaction-selector" onChange={handleDropdownChange} value={currentStatus} >
        <option value="I am using it 👍" name='hello'>🟢 I am using it </option>
        <option value="Yes, i want to 🤩"  name='Yes, I want to 🤩'>🟢 Yes, I want to </option>
         <option value="Maybe 🤔"  name='May be 🤔'>🟢 May be 🤔</option>
         <option value="No, i don't 😑" name="'No, I don't 😐'">🟢 No, I don't </option>
         <option value="" name="No Status">⚫ Select</option>
        </select>
          </div>

          <div className="product-card-right">
            <p className="description">{shortDescription}</p>

            <div className="flex rating-comment">
              <div className="flex rating" onClick={handleRatingPopup}>
                <p>My Rating </p>
                <div className="stars flex">
                  {isFollowing || isSaved ? (
                    <StarRating rating={average} isDisabled={true} />
                  ) : (
                    <StarRating isDisabled={true} />
                  )}
                </div>
              </div>
              <div className="flex">
                <div
                  className="flex comments"
                  onClick={handlePopup}
                  style={{ cursor: "pointer" }}
                >
                  <MdOutlineInsertComment color="#F11A7B"  size='20px' style={{marginRight: '10px'}}/>
                  {isFollowing || isSaved ? (
                    <p>
                      comment{" "}
                      <span style={{ color: "#00A82D" }}>
                        ({appCommentList.length})
                      </span>
                    </p>
                  ) : (
                    <p className="no-comment" onClick={handlePopup}>
                      Comment
                    </p>
                  )}
                </div>
              </div>

              {isSaved ? (
                <div className="product-item-saved">
                  <BsBookmark />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {
  cardOpen && isMobile &&
  <div className="card-open-components">
 


   <RatingComponent userRatings={appRating} productId={product?._id}/>

    <div className="card-open-reactions">
      <p className="dark-text">Status</p>
      <ReactionComponent currentStatus={currentStatus} product={product}/>
    </div>
    
    <SubscriptionComponent subscription={subscription} productId={ product?._id}/>

    <CommentComponent userComments={appCommentList}  productId={ product?._id} setUserComments={setAppCommentList} />
  </div>

}

          <div className="expand-collapse desktop-none" onClick={handleCardOpen}>
          {
            !cardOpen ? (
              <>
              <p>Expand</p>
              <MdOutlineExpandMore size='20px' />
              </>
            ):
            (
              <>
              <p>Collapse</p>
              <MdOutlineExpandLess  size='20px'/>
              </>
            )
          }
         
        </div>
        </div>
      
        <div className="product-card-bottom">
          <div className="reaction-card flex" onClick={handleLoginPopup}>
            <p className="card-question">Do you wish to use {product.name}?</p>
            {isFollowing || isSaved ? (
              <ReactionComponent
                currentStatus={currentStatus}
                product={product}
              />
            ) : (
              <ReactionComponent isDisabled={false} product={product} />
            )}
          </div>
        
        </div>
       
      </div>
    </>
  );
}

export default ProductItem;
