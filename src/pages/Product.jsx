import { MdOutlineInsertComment } from "react-icons/md";
import { CiGlobe,CiBookmark } from "react-icons/ci";
import StarRating from '../components/StarRating'
import product from '../assets/img/product-image.png'
import LoginPopup from '../components/LoginPopup'
import { useParams } from 'react-router'
import { useEffect, useState } from "react"
import SimilarList from '../components/SimilarList'
import Spinner from '../components/Spinner'
import { useSelector,useDispatch } from "react-redux";
import CommentPopup from '../components/CommentPopup'
import RatingPopup from '../components/RatingPopup'
import ReactionComponent from '../components/ReactionComponent'
import { selectUser } from '../Reducers/userReducer'
import HurryUp from '../components/HurryUp'
import RegisterPopup from '../components/RegisterPopup'
import {  fetchProducts, selectProducts } from '../Reducers/ProductReducer'
import { toast } from "react-hot-toast";
import RatingComponent from "../components/ProductCardComponents/RatingComponent";
import CommentComponent from "../components/ProductCardComponents/CommentComponent";

function Product() {
    const{ slug } = useParams()
    const user = useSelector(selectUser)
    const products = useSelector(selectProducts);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const dispatch = useDispatch();
    const [singleProduct, setSingleProduct] = useState([])
    var input_string = slug
    var output_string = input_string.replace(/-/g, " ")
    const [showOverlay, setShowOverlay] = useState(false);
    const auth = useSelector((state) => state.auth)
    const [similar, setSimilar] = useState([])
    const [hurryUpPopup, setHurryUpPopup] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);
    const [registerPopup, setRegisterPopup] = useState(false);
    const [loginPopupOpen, setLoginPopupOpen] = useState(false);
    const [commentPopupOpen, setCommentPopupOpen] = useState(false);
    const [ratingPopupOpen, setRatingPopupOpen] = useState(false);
    const [appRating, setAppRating] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [appInfo, setAppInfo] = useState([])
    const [appCommentList, setAppCommentList] = useState([])
    const [currentStatus, setCurrentStatus] = useState('')
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
    const [showComments, setShowComments] = useState(false)  
    const [showRatings, setShowRatings] = useState(false)  
  
    useEffect(() => {
      if (!products) {
        dispatch(fetchProducts());
      } else {
        const foundProducts = products?.filter((product) => product.slug === slug);
        setSingleProduct(foundProducts);
        if (foundProducts.length > 0) {
          setSimilar(products.filter((product) => product?.Category === foundProducts[0]?.Category));
        }
      }
  
      const handleResize = () => {
        setIsMobile(window.matchMedia('(max-width: 475px)').matches);
      };
  
      window.addEventListener('resize', handleResize);
      handleResize(); // Check initially
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [dispatch, products, slug]);

// Handle logic dependent on singleProduct
useEffect(() => {
  if (singleProduct && user?.products?.data) {
    const save_app = user.products.data.saved?.find((app) => app._id === singleProduct[0]?._id);
    const followed_app = user.products.data.following_app?.find((app) => app._id === singleProduct[0]?._id);

    if (followed_app) {
      setIsFollowing(true);
      setAppRating(followed_app.subscription?.user_ratings[0]?.rating);
      setAppCommentList(followed_app.subscription?.comment);
      setAppInfo(followed_app);
      setCurrentStatus(followed_app.status);
    } else if (save_app) {
      setIsSaved(true);
      setAppRating(save_app.user_ratings[0]?.rating);
      setAppCommentList(save_app.comment);
      setAppInfo(save_app);
      setCurrentStatus(save_app.status);
    } else {
      setIsFollowing(false);
      setIsSaved(false);
      setAppRating([]);
      setAppCommentList([]);
      setCurrentStatus('');
      setAppInfo(singleProduct[0]);
    }
  }
  
  if(isMobile){
    console.log('mob-version')
  }else{
    console.log('web-version')
  }
}, [singleProduct, user,isMobile]);

    
    const handlePopup = () => {
      if(!auth.isAuthenticated && !isMobile){
          setShowOverlay(true)
       setHurryUpPopup(true)
      }else if(!isMobile){
          setShowOverlay(true)
          setLoginPopupOpen(false)
          setCommentPopupOpen(true)
      } else if(auth.isAuthenticated && isMobile){
        setShowComments(!showComments)
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
      }else if(!isMobile){
          setShowOverlay(true)
          setLoginPopupOpen(false)
          setCommentPopupOpen(false)
          setRatingPopupOpen(true)
      }else if(auth.isAuthenticated && isMobile){
        setShowRatings(!showRatings)
      }
    }
   

      const handleOverlayDoubleClick = () => {
        setShowOverlay(false);
      };
    const handleSave = async() =>{
      if(!auth.isAuthenticated){
        setShowOverlay(true)
        setLoginPopupOpen(true)
    }else{ 
      const authToken = localStorage.getItem('token')
      const api = `https://appsala-backend.netlify.app/.netlify/functions/index/saved_product/${singleProduct[0]?._id}`
      const requestOptions = {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: '',
      };
      console.log(requestOptions)
      try {
        const response = await fetch(api, requestOptions);
        const data = await response.json();
        console.log('Response data:', data);
        toast.success('Product Saved')
      } catch (error) {
        toast.error('Error:', error);
        // Handle errors here
      }
    }
    }
    //   setSimilar(similar[0])
    if(appRating){
        
      var rating = appRating
      
      var ratingValues = Object.values(rating);
      var totalValues = ratingValues.length;
      
      var sum = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      var average = sum / totalValues;
      
    }else{
       average = 0
    }

    const website = `http://${singleProduct[0]?.sellerDetails?.companyWebsite}`

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }



    if(!singleProduct[0]){
      return <h2>Product not found</h2>
    }
    
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
    {showOverlay && ratingPopupOpen &&  (
        <div className="overlay" onDoubleClick={handleOverlayDoubleClick}>
          {
          appInfo ?
          <RatingPopup info={appInfo} setRatingPopup={setRatingPopupOpen}  savedApp={isSaved}/> : <></>
        }
         
        </div>
  )}

    <div>
    <div className="container bread-crumb">
          Home /{output_string}
          </div>
        <div className="container">
        <header> 
  <div className="product-page-card">         
<div className="product-card-left flex">
  <div>
  <img src={singleProduct[0]?.logo}  alt="product-image"/>
  </div>
  <div className="card-left-div">
    <h2 className="dark-text">{singleProduct[0]?.name}</h2>
    <div className="stars flex">
    <StarRating rating={singleProduct[0]?.averageRating} isDisabled ={true}/> </div>
  </div>
  <div className="mobile-globe-save">
    {
      !isFollowing &&  <>{
        isSaved ? <div className="flex" style={{color: '#F11A7B'}}> Saved 
        <CiBookmark className='icon'  color="#F11A7B"  size='20px'/>
        </div>: <div className="flex"> Save 
        <CiBookmark className='icon'  color="#F11A7B"  size='20px' onClick={handleSave}/>
        </div>
      }</>
    }
    
    <a href={`https://${singleProduct[0]?.sellerDetails?.companyWebsite}`} target='_blank'  rel='noopener noreferrer'>
    <CiGlobe className='icon'  color="#F11A7B"  size='20px'/>
        </a>
  </div>
</div>

<div className="product-card-right">
    <p className="description">{singleProduct[0]?.review}</p>
    <div className="flex rating-comment">             
    <div className="flex rating" onClick={handleRatingPopup}>
      <p>
        My Rating
      </p>
      <div className="stars flex">
                 {
                isFollowing || isSaved ? <StarRating rating={average}/> : <StarRating isDisabled ={true}/>
                }
      </div>
    </div>

    <div className="flex">
      <div  className="flex comments" onClick={handlePopup}>
      
      <MdOutlineInsertComment color="#F11A7B"  size='20px' style={{marginRight: '10px'}}/>
        {
            isFollowing || isSaved ? 
            <p>comment <span style={{color: '#00A82D'}}>({appCommentList?.length})</span></p>
             : <p className='no-comment' >Comment</p>
        }
      </div>
    </div>
  </div>
  {
    showRatings &&
    <div className="card-ratings-product-page">
    <RatingComponent userRatings={appRating} productId={singleProduct[0]._id}/></div>
  }
  {
    showComments && 
    <div className="card-comment-product-page">
    <CommentComponent setUserComments={setAppCommentList} userComments={appCommentList}  productId={singleProduct[0]._id}/>
    </div>
     }
</div>

<div className="save-globe desktop" style={{color: '#F11A7B'}}>
  
{
      !isFollowing &&  <>{
        isSaved ? <div className="flex" style={{color: '#F11A7B'}}> Saved 
        <CiBookmark className='icon'  color="#F11A7B"  size='20px'/>
        </div>: <div className="flex"> Save 
        <CiBookmark className='icon'  color="#F11A7B"  size='20px' onClick={handleSave}/>
        </div>
      }</>
    }
    <a href={`https://${singleProduct[0]?.sellerDetails?.companyWebsite}`} target='_blank'  rel='noopener noreferrer'>
<CiGlobe className='icon'  color="#F11A7B"  size='20px'/>
    </a>

</div>
</div>

<div className="question-answer product-page-ques-ans" >
    <p className="question" style={{color: '#454545'}}>What is {singleProduct[0]?.name}?</p>
    <p  className="answer" style={{color: '#454545'}}>{singleProduct[0]?.shortDescription} </p> </div>

     
       
        
        <div className="reaction-card flex product-page-reaction-card" onClick={handleLoginPopup}>
            <p className="card-question">Do you wish to use {output_string}?
            </p>            
            <ReactionComponent currentStatus={currentStatus} product={singleProduct[0]}/>
        </div>
    </header>

  
        <img src={product} alt="product-image" className="product-page-image"/>
  

    <section className="review">
    <h2>Review</h2>
   <p>         
{
  singleProduct[0]?.review
}
</p>
</section>
    </div>
<div className="container">
<h2>Similar Products / Alternatives</h2>
</div>
<div className="similar-products"> 
<div className="similar-products-list flex">         
{
loading ? <Spinner/> :
similar ? (
  <SimilarList similar={similar} key={similar._id}/> 
):  
<Spinner/> 
   
}
</div>
</div>
</div>



<div className="container">
    <section className="review">
      <h2>In-Dept Analysis</h2>
  
      <p>
      {
  singleProduct[0]?.longDescription
}
      </p>
  
      <h2 style={{color: "#00A82D"}}>Positive</h2>
  
  <p>
    Constant Contact , an innovative browser extension designed to streamline and optimize YouTube content creation, has garnered immense popularity among content creators and marketers. 
    With its array of time-saving features and data-driven functionalities, TubeBuddy has become an indispensable tool in the YouTube landscape. In this comprehensive review, we will explore the various aspects of TubeBuddy, 
    including its Video SEO capabilities, in-depth analytics, time-saving bulk processing, competitor analysis, engagement tools, A/B testing, and customer support. By examining these features and their impact on content creation, 
    we aim to shed light on how TubeBuddy has revolutionized YouTube channel management and success. Video SEO Made Simple: TubeBuddy's greatest strength lies in its Video SEO tools, which have transformed the way content creators optimize their videos for search and discovery. 
    Upon installing the extension, users are greeted with a powerful keyword research feature that enables them to identify high-traffic and relevant keywords for their content. The intuitive keyword analysis also presents insights into the competitiveness of these keywords, allowing creators to choose the most strategic
     terms for their target audience. Moreover, TubeBuddy empowers users to optimize their video titles, tags, and descriptions directly within the YouTube upload interface. The real-time suggestions and tag explorer functionality make the process efficient and effective, ensuring that videos are easily discoverable by the intended audience.
    Additionally, the extension provides an invaluable tool to track and manage video rankings,
     offering content creators greater visibility into their videos' performance on YouTube's search engine.
  </p>
  <h2 style={{color: "#FF0000"}}>Negative</h2>

  <p>
    Constant Contact , an innovative browser extension designed to streamline and optimize YouTube content creation, has garnered immense popularity among content creators and marketers. 
    With its array of time-saving features and data-driven functionalities, TubeBuddy has become an indispensable tool in the YouTube landscape. In this comprehensive review, we will explore the various aspects of TubeBuddy, 
    including its Video SEO capabilities, in-depth analytics, time-saving bulk processing, competitor analysis, engagement tools, A/B testing, and customer support. By examining these features and their impact on content creation, 
    we aim to shed light on how TubeBuddy has revolutionized YouTube channel management and success. Video SEO Made Simple: TubeBuddy's greatest strength lies in its Video SEO tools, which have transformed the way content creators optimize their videos for search and discovery. 
    Upon installing the extension, users are greeted with a powerful keyword research feature that enables them to identify high-traffic and relevant keywords for their content. The intuitive keyword analysis also presents insights into the competitiveness of these keywords, allowing creators to choose the most strategic
     terms for their target audience. Moreover, TubeBuddy empowers users to optimize their video titles, tags, and descriptions directly within the YouTube upload interface. The real-time suggestions and tag explorer functionality make the process efficient and effective, ensuring that videos are easily discoverable by the intended audience.
    Additionally, the extension provides an invaluable tool to track and manage video rankings,
     offering content creators greater visibility into their videos' performance on YouTube's search engine.
  </p>
  <h2>Conclusion</h2>

  <p>
    Constant Contact , an innovative browser extension designed to streamline and optimize YouTube content creation, has garnered immense popularity among content creators and marketers. 
    With its array of time-saving features and data-driven functionalities, TubeBuddy has become an indispensable tool in the YouTube landscape. In this comprehensive review, we will explore the various aspects of TubeBuddy, 
    including its Video SEO capabilities, in-depth analytics, time-saving bulk processing, competitor analysis, engagement tools, A/B testing, and customer support. By examining these features and their impact on content creation, 
    we aim to shed light on how TubeBuddy has revolutionized YouTube channel management and success. Video SEO Made Simple: TubeBuddy's greatest strength lies in its Video SEO tools, which have transformed the way content creators optimize their videos for search and discovery. 
    Upon installing the extension, users are greeted with a powerful keyword research feature that enables them to identify high-traffic and relevant keywords for their content. The intuitive keyword analysis also presents insights into the competitiveness of these keywords, allowing creators to choose the most strategic
     terms for their target audience. Moreover, TubeBuddy empowers users to optimize their video titles, tags, and descriptions directly within the YouTube upload interface. The real-time suggestions and tag explorer functionality make the process efficient and effective, ensuring that videos are easily discoverable by the intended audience.
    Additionally, the extension provides an invaluable tool to track and manage video rankings,
     offering content creators greater visibility into their videos' performance on YouTube's search engine.
  </p>

    </section>
  </div>

</>




  )
}

export default Product