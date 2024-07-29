import {
  MdOutlineCategory,
  MdOutlineExpandMore,
  MdOutlineExpandLess,
} from "react-icons/md";
import { MdOutlineInsertComment } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import RatingPopup from "./RatingPopup";
import StarRating from "./StarRating";
import StatusPopup from "./StatusPopup";
import CommentPopup from "./CommentPopup";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  updateUserProductStatus,
} from "../Reducers/userReducer";
import ReactionComponent from "./ReactionComponent";
import { Link } from "react-router-dom";
import SubscriptionComponent from "./ProductCardComponents/SubscriptionComponent";
import CommentComponent from "./ProductCardComponents/CommentComponent";
import RatingComponent from "./ProductCardComponents/RatingComponent";

function ProfileProductItem({ info, savedApp, isMobile }) {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState();
  const [followingApp, setFollowingApp] = useState();
  const currentUser = useSelector(
    (state) => state?.user?.products?.data?.saved
  );
  const currentUserApps = useSelector(
    (state) => state?.user?.products?.data?.following_app
  );
  const [cardOpen, setCardOpen] = useState(false);
  const [userRatings, setUserRatings] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [subscription, setSubsciption] = useState();

  const id = localStorage.getItem("userId");
  useEffect(() => {
    if (savedApp) {
      var filteredProducts = currentUser?.filter(
        (product) => product?._id === info?._id
      )[0];
      setSaved(filteredProducts);
      setCurrentStatus(filteredProducts?.status);
      setUserRatings(filteredProducts?.user_ratings[0]?.rating || {});
      setUserComments(filteredProducts?.comment);
      setSubsciption(filteredProducts?.subscription);
    } else {
      var filteredProduct = currentUserApps?.filter(
        (product) => product?._id === info?._id
      )[0];
      setFollowingApp(filteredProduct);
      setCurrentStatus(filteredProduct?.status);
      setUserRatings(
        filteredProduct?.subscription?.user_ratings[0]?.rating || {}
      );
      setUserComments(filteredProduct?.subscription?.comment);
      setSubsciption(filteredProduct?.subscription);
    }
  }, [info, currentUser, currentUserApps, userComments]);


  const [showOverlay, setShowOverlay] = useState(false);
  const [commentsPopup, setCommentsPopup] = useState(false);
  const [ratingPopup, setRatingPopup] = useState(false);
  const [statusPopup, setStatusPopup] = useState(false);
  const handleOverlayDoubleClick = () => {
    setShowOverlay(false);
  };

  if (info?.subscription?.date) {
    var inputDate = new Date(info.subscription.date);
    var formattedDate = inputDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  } else {
    formattedDate = "";
  }

  if (followingApp) {
    var comments = followingApp?.subscription?.comment.length;
  } else if (savedApp) {
    var comments = currentUser?.find((app) => app?._id === info?._id)?.comment
      .length;
  } else {
    comments = 0;
  }
  if (followingApp) {
    var rating = followingApp?.subscription?.user_ratings[0]?.rating;
    if (rating) {
      var ratingValues = Object.values(rating);
      var totalValues = ratingValues.length;
      var sum = ratingValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      var average = sum / totalValues;
    }
  } else if (savedApp) {
    var filteredProducts = currentUser?.filter(
      (product) => product?._id === info?._id
    )[0];
    var rating = filteredProducts?.user_ratings[0]?.rating;
    if (rating) {
      var ratingValues = Object.values(rating);
      var totalValues = ratingValues.length;
      var sum = ratingValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      var average = sum / totalValues;
    }
  } else {
    average = 0;
  }

  if (info?.logo) {
    var logo = info.logo;
  }

  if (info?.name) {
    var name = info.name;
  }
  if (info?.shortDescription) {
    var shortDescription  = info.shortDescription;
    const words = shortDescription.split(/\s+/);
    const first20Words = words.slice(0, 20).join(" ");
    shortDescription = first20Words + "...";
  }
  if (subscription) {
    var subscriptionPackage = subscription.package;
    var subscriptionAmount = subscription.amount;
    var subscriptionDuration = subscription.duration;
  } else {
    subscriptionPackage = "";
    subscriptionAmount = "";
    subscriptionDuration = "";
  }

  if (info?.Category) {
    var category = info.Category;
    const convertedText = category
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    category = convertedText;
  }

  const handleDropdownChange = async (e) => {
    if (e.target.value === "I am using it 👍" && !isMobile) {
      setStatusPopup(true);
      setShowOverlay(true);
      setCommentsPopup(false);
      setRatingPopup(false);
    }
    setCurrentStatus(e.target.value);
    var applicationID = info?._id;
    const body = {
      productId: applicationID,
      status: e.target.value,
    };
    try {
      await dispatch(updateUserProductStatus(body)).unwrap();
      await dispatch(updateUserData(id)).unwrap();
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("done calling");
  };

  const handleCommentPopup = () => {
    if (!isMobile) {
      setShowOverlay(true);
      setCommentsPopup(true);
      setRatingPopup(false);
      setStatusPopup(false);
    }
  };

  const handleRatingPopup = () => {
    if (!isMobile) {
      setShowOverlay(true);
      setCommentsPopup(false);
      setRatingPopup(true);
      setStatusPopup(false);
    }
  };

  const handleCardOpen = () => {
    if (isMobile) {
      setCardOpen(!cardOpen);
    }
  };

  

  return (
    <>
      <div className="dashboard-page-card">
        <div
          className="product-card-left flex"
          style={{ justifyContent: "center" }}
        >
          <Link to={`/${info?.slug}`}>
            <img src={logo} alt="product-image" />
          </Link>
          <div className="desktop-none">
            <p className="card-heading ">
              <Link to={`/${info?.slug}`} className="product-link">
                {`${name.slice(0, 15)}...`}
              </Link>
            </p>
            <div className="stars flex">
              <StarRating rating={info.averageRating} isDisabled={true}/>
            </div>
          </div>
          {!cardOpen && (
            <select
              id="dropdown"
              onChange={handleDropdownChange}
              value={currentStatus}
              className="desktop-none"
            >
              <option value="I am using it 👍" name="hello">
                🟢 I am using it{" "}
              </option>
              <option value="Yes, i want to 🤩" name="Yes, I want to 🤩">
                🟢 Yes, I want to{" "}
              </option>
              <option value="Maybe 🤔" name="May be 🤔">
                🟢 May be 🤔
              </option>
              <option value="No, i don't 😑" name="'No, I don't 😐'">
                🟢 No, I don't{" "}
              </option>
              <option value="" name="No Status">
                ⚫ Select
              </option>
            </select>
          )}
        </div>

        <div className="product-card-right">
          <div className="flex mobile-none">
            <p className="card-heading ">{name}</p>
            <div className="stars flex">
            <StarRating rating={info.averageRating} isDisabled={true}/>
            </div>
          </div>
          <p className="description">{shortDescription}</p>
          <div className="desktop-none flex f-12 comments">
            <MdOutlineCategory />
            <p>
              Marketing
              <FaArrowCircleRight style={{ margin: "0 10px" }} />
              <Link to={`/category/${info?.Category}`} style={{color:'#757575'}} target='_blank'>
                  <u>{category}</u></Link>
            </p>
          </div>
          <div className="flex rating-comment">
            <div className="flex">
              <div className="flex comments mobile-none">
                <MdOutlineCategory />
                <p>
                  Marketing
                  <FaArrowCircleRight style={{ margin: "0 10px" }} />
                  <Link to={`/category/${info?.Category}`} style={{color:'#757575'}} target='_blank'>
                  <u>{category}</u></Link>
                </p>
              </div>
            </div>
            {!cardOpen && isMobile ? (
              <>
                <div className="flex rating">
                  <p>My Rating</p>
                  <div className="stars flex" onClick={handleRatingPopup}>
                    <StarRating rating={average} isDisabled={true} />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex comments">
                    <MdOutlineInsertComment
                      color="#F11A7B"
                      size="20px"
                      style={{ marginRight: "10px" }}
                      onClick={handleCommentPopup}
                    />
                    <p>
                      comment{" "}
                      <span style={{ color: "#00A82D" }}>({comments})</span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {!isMobile && (
              <>
                <div className="flex rating">
                  <p>My Rating</p>
                  <div className="stars flex" onClick={handleRatingPopup}>
                    <StarRating rating={average} />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex comments">
                    <MdOutlineInsertComment
                      color="#F11A7B"
                      size="20px"
                      style={{ marginRight: "10px" }}
                      onClick={handleCommentPopup}
                    />
                    <p>
                      comment{" "}
                      <span style={{ color: "#00A82D" }}>({comments})</span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {cardOpen && isMobile && (
          <div className="card-open-components">
            <div className="flex rating">
              <p className="dark-text">My Rating</p>
              <div className="stars flex">
                <StarRating rating={average} />
              </div>
            </div>

            <RatingComponent userRatings={userRatings} productId={info._id}/>
            
            <div className="card-open-reactions">
              <p className="dark-text">Status</p>
              <ReactionComponent currentStatus={currentStatus} product={info} />
            </div>

           <SubscriptionComponent subscription={subscription} productId={info._id}/>
            
          <CommentComponent userComments={userComments} productId={info._id} setUserComments={setUserComments}/>

          </div>
        )}

        <div className="dashboard-card-right mobile-none">
          <select
            id="dropdown"
            onChange={handleDropdownChange}
            value={currentStatus}
          >
            <option value="I am using it 👍" name="hello">
              🟢 I am using it{" "}
            </option>
            <option value="Yes, i want to 🤩" name="Yes, I want to 🤩">
              🟢 Yes, I want to{" "}
            </option>
            <option value="Maybe 🤔" name="May be 🤔">
              🟢 May be 🤔
            </option>
            <option value="No, i don't 😑" name="'No, I don't 😐'">
              🟢 No, I don't{" "}
            </option>
            <option value="" name="No Status">
              ⚫ Select
            </option>
          </select>
          <p>
            {subscriptionPackage} {subscriptionAmount}
            {subscriptionPackage && <>$</>}
          </p>
          <p>{subscriptionDuration}</p>
        </div>
        <div className="expand-collapse desktop-none" onClick={handleCardOpen}>
          {!cardOpen ? (
            <>
              <p>Expand</p>
              <MdOutlineExpandMore size="20px" />
            </>
          ) : (
            <>
              <p>Collapse</p>
              <MdOutlineExpandLess size="20px" />
            </>
          )}
        </div>
      </div>

      {showOverlay && commentsPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <CommentPopup info={info} id={id} savedApp={savedApp} />
        </div>
      )}

      {showOverlay && ratingPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RatingPopup
            info={info}
            setRatingPopup={setRatingPopup}
            id={id}
            savedApp={savedApp}
          />
        </div>
      )}

      {showOverlay && statusPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <StatusPopup
            info={info}
            id={id}
            setShowOverlay={setShowOverlay}
            setStatusPopup={setStatusPopup}
          />
        </div>
      )}
    </>
  );
}

export default ProfileProductItem;
