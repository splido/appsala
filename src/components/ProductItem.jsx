
// import monday from '../assets/img/monday.png'
import { Link } from 'react-router-dom'
import { LiaCommentSolid } from 'react-icons/lia'
import { BsBookmark } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import StarRating from './StarRating'
// import StarRating from './StarRating'
import { selectUser } from '../Reducers/userReducer'
import { useSelector } from 'react-redux';
import LoginPopup from './LoginPopup'
import RegisterPopup from './RegisterPopup'
import ReactionComponent from './ReactionComponent'
import CommentPopup from './CommentPopup'
import RatingPopup from './RatingPopup'
import HurryUp from './HurryUp'

function ProductItem({product}) {
    const isDisabled = true
    const [isSaved, setIsSaved] = useState(false)
    const [hurryUpPopup, setHurryUpPopup] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);
    const [commentPopupOpen, setCommentPopupOpen] = useState(false);
    const [ratingPopupOpen, setRatingPopupOpen] = useState(false);
    const [registerPopup, setRegisterPopup] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const user = useSelector(selectUser)
    const auth = useSelector((state) => state.auth)
    const [appRating, setAppRating] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [appInfo, setAppInfo] = useState([])
    const [appCommentList, setAppCommentList] = useState([])
    const [currentStatus, setCurrentStatus] = useState('')
    var shortDescription = product.shortDescription
    const words = shortDescription.split(/\s+/);
    const first20Words = words.slice(0, 20).join(" ");
    shortDescription = first20Words + '...'
    const saved_app = user?.products?.data?.saved.find((app)=> app._id == product._id) ? true : false
    const following_app = user?.products?.data?.following_app.find((app)=> app._id == product._id) ? true : false
    // console.log(saved_app)
      const handlePopup = () => {
        
        if(!auth.isAuthenticated){
            setShowOverlay(true)
            setHurryUpPopup(true)
        }else{

            setShowOverlay(true)
            setHurryUpPopup(false)
            setCommentPopupOpen(true)
      }
      }
      const handleLoginPopup = () => {
        if(!auth.isAuthenticated){
            setShowOverlay(true)
            setHurryUpPopup(true)
        }
      }
      const handleRatingPopup = () => {
        if(!auth.isAuthenticated){
            setShowOverlay(true)
            setHurryUpPopup(true)
        }else{
            setShowOverlay(true)
            setHurryUpPopup(false)
            setCommentPopupOpen(false)
            setRatingPopupOpen(true)
        }
      }
      const handleOverlayDoubleClick = () => {
        setShowOverlay(false);
      };
    useEffect(() => {
        if (auth.isAuthenticated) {
          if (saved_app){
            const save_apps = user?.products?.data?.saved?.map((app)=>app._id)
            save_apps?.forEach((appId) => {
                if (appId === product._id) {
                  // console.log('following', appId);
                  setIsSaved(true)
                 setAppRating(user.products.data.saved.find((app)=> app._id === product._id)?.user_ratings[0]?.rating)
                 setAppCommentList(user.products.data.saved.find((app)=> app._id === product._id).comment)
                 setAppInfo(user.products.data.saved.find((app)=> app._id === product._id))
                setCurrentStatus(user.products?.data?.saved?.find((app)=> app?._id === product?._id)?.status)
                } 
              });
          }
          else if(following_app){
            const followed_apps = user?.products?.data?.following_app?.map((app)=>app._id)
            followed_apps?.forEach((appId) => {
                if (appId === product._id) {
                  // console.log('following', appId);
                  setIsFollowing(true)
                 setAppRating(user.products.data.following_app.find((app)=> app._id === product._id)?.subscription?.user_ratings[0]?.rating)
                 setAppCommentList(user.products.data.following_app.find((app)=> app._id === product._id).subscription.comment)
                 setAppInfo(user.products.data.following_app.find((app)=> app._id === product._id))
                setCurrentStatus(user.products?.data?.following_app?.find((app)=> app?._id === product?._id)?.status)
                } 
              });
            }
            else {
              setIsFollowing(false)
              setIsSaved(false)
             setAppRating([])
             setAppCommentList([])
             setAppInfo(product)
            setCurrentStatus('')
            }
            }             
            else {
              setIsFollowing(false)
              setIsSaved(false)
             setAppRating([])
             setAppCommentList([])
            //  setAppInfo()
            setCurrentStatus('')
            }

      }, [user?.products?.data?.following_app,user?.products?.data?.saved]);
//   }, [ user?.products?.data?.following_app, product._id, auth.isAuthenticated, product, setIsFollowing,setAppRating, setAppCommentList, setAppInfo, setCurrentStatus]

const average_calculator = (rating) =>  {
  //var rating = appRating
  var ratingValues = Object.values(rating);
  var totalValues = ratingValues.length;
  var sum = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  var average = sum / totalValues;
  return average
}
      if(appRating){
        var average = average_calculator(appRating)
        
      }else{
          average = 0
      }
      
  var product_rating = product?.rating || 0
  var product_average_rating  = average_calculator(product_rating)

  return (
    <>
{showOverlay && hurryUpPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <HurryUp setHurryUpPopup={setHurryUpPopup} setLoginPopup={setLoginPopup} setRegisterPopup={setRegisterPopup} />
        </div>
  )}
{showOverlay && loginPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <LoginPopup/>
        </div>
  )}
  {showOverlay && registerPopup && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RegisterPopup setLoginPopup={setLoginPopup} setRegisterPopup={setRegisterPopup} />
        </div>
  )}

   {showOverlay && commentPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <CommentPopup info={appInfo} savedApp={isSaved}/>
        </div>
  )}
    {showOverlay && ratingPopupOpen && (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          <RatingPopup info={appInfo} setRatingPopup={setRatingPopupOpen} savedApp={isSaved}/>
        </div>
  )}
     <div className="product-info">
    <div className="product-card">
            <div className="product-reviews-card">
                <div>
                    <img src={product.logo}alt="" style={{height: '50px'}}/>
                </div>
                <div className="details">


<Link to={`/${product.slug}`} className='product-link'> {product.name}</Link>
                    <div className="stars">
                        <StarRating rating={product_average_rating} isDisabled ={true} />
                    </div>
                    <div className="ratings">
                        <p>{product.averageRating}<span>(149 Follows)</span></p>
                    </div>
                </div>
            </div>
            <div>
            <p style={{ fontSize: "20px" ,color: "#757575"}}>
                {
                    shortDescription
                }
            </p>
            <div className='comment-rating'>
            <div className='my-rating' onClick={handleRatingPopup}>
                <p>My Rating </p>
            {
                isFollowing || isSaved ? <StarRating rating={average}/> : <StarRating isDisabled ={true} />
            }
            {/* <StarRating average={average}/> */}
            </div>
   
        <div className='my-comments' onClick={handlePopup} style={{cursor: 'pointer'}}>
        <LiaCommentSolid />
        {
            isFollowing  || isSaved  ? 
            <p>comment <span style={{color: '#00A82D'}}>({appCommentList.length})</span></p>
          : <p className='no-comment' onClick={handlePopup}>Comment</p>
        }
        {/* <p>comment {followingappInfo.length} </p> */}
        </div>

        {
          isSaved ? <div className='product-item-saved'>
           <BsBookmark/>
          </div> : <></>
        }
        </div>
            </div>
           
        </div>
       
            <div className="product-bar" onClick={handleLoginPopup}>
                <p>
                    Do you wish to use {product.name}?
                </p>
                {
                    isFollowing || isSaved ? <ReactionComponent currentStatus={currentStatus} product={product}/> : <ReactionComponent isDisabled={false}  product={product}/>
                }
                {/* // <ReactionComponent currentStatus={currentStatus}/> */}
            </div>
            </div>
            </>
  )
}


export default ProductItem