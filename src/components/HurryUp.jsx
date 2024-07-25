import { Link } from 'react-router-dom';
import { RiCloseCircleFill } from "react-icons/ri";
function HurryUp({setLoginPopup, setRegisterPopup, setHurryUpPopup}) {

    const handleClick = (n) => {
        if (n === 'register'){
            setLoginPopup(false)
            setRegisterPopup(true)
            setHurryUpPopup(false)
        } if (n === 'login'){
            setLoginPopup(true)
            setRegisterPopup(false)
            setHurryUpPopup(false)
        }
       
    }

    const handleClose = () =>{
      setHurryUpPopup(false)
    }
  return (
    <div className="hurry-up-component overlay-card">
      <div className="close-overlay" onClick={handleClose}>
      <RiCloseCircleFill size='20px' color='#F11A7B'/> 
      </div>
         <div className="hurry-up-component-top">
    <h2>Hurry Up🔥</h2>  
     <p> <span style={{color:'#F11A7B'}} onClick={()=>handleClick('register')}>Register</span> and Start using the crazy features on Appsala!</p>
    </div>
    <div className="line"></div>
    <div className="hurry-up">
        <div className='hurry-up-item'>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M6.39844 20.2185V13.2034L24.7615 4.125L43.1246 13.2034V20.2185M6.39844 29.2969V36.312L24.7615 45.3904M24.7615 45.3904L43.1246 36.312V29.2969M24.7615 45.3904V33.8361" stroke="#F11A7B" stroke-width="3.09491" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.7659 33.8365C27.1736 33.8365 29.4828 32.88 31.1853 31.1775C32.8878 29.4749 33.8443 27.1658 33.8443 24.7581C33.8443 22.3503 32.8878 20.0412 31.1853 18.3387C29.4828 16.6362 27.1736 15.6797 24.7659 15.6797C22.3582 15.6797 20.049 16.6362 18.3465 18.3387C16.644 20.0412 15.6875 22.3503 15.6875 24.7581C15.6875 27.1658 16.644 29.4749 18.3465 31.1775C20.049 32.88 22.3582 33.8365 24.7659 33.8365Z" stroke="#F11A7B" stroke-width="3.09491" stroke-miterlimit="10"/>
              </svg>
            <div>
                <h3>Track</h3>
                <p>Tracking the web application you use need
            not be tiresome. Now you can track all the applications in one place.</p>
            </div>
        </div>
        <div className='hurry-up-item'>
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                <path d="M33.6952 14.1911C35.1062 14.1911 36.4594 13.6306 37.4571 12.6329C38.4548 11.6352 39.0153 10.2819 39.0153 8.87095C39.0153 7.45995 38.4548 6.10675 37.4571 5.10902C36.4594 4.1113 35.1062 3.55078 33.6952 3.55078C32.2842 3.55078 30.931 4.1113 29.9332 5.10902C28.9355 6.10675 28.375 7.45995 28.375 8.87095C28.375 10.2819 28.9355 11.6352 29.9332 12.6329C30.931 13.6306 32.2842 14.1911 33.6952 14.1911Z" stroke="#F11A7B" stroke-width="2.6388" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24.8275 3.55078H15.9606C7.09365 3.55078 3.54688 7.09756 3.54688 15.9645V26.6048C3.54688 35.4718 7.09365 39.0186 15.9606 39.0186H26.6009C35.4679 39.0186 39.0147 35.4718 39.0147 26.6048V17.7379" stroke="#F11A7B" stroke-width="2.6388" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            <div>
                <h3>Notify</h3>
                <p>Getting unexpected credit card charges could be a thing of the past. Get notification before due date so that you can decide to cancel a subscription if not needed.</p>
              </div>
        </div>
        <div className='hurry-up-item'>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M41.6693 17.1888V37.5013C41.6693 43.7513 37.9401 45.8346 33.3359 45.8346H16.6693C12.0651 45.8346 8.33594 43.7513 8.33594 37.5013V17.1888C8.33594 10.418 12.0651 8.85547 16.6693 8.85547C16.6693 10.1471 17.1901 11.3138 18.0443 12.168C18.8984 13.0221 20.0651 13.543 21.3568 13.543H28.6484C31.2318 13.543 33.3359 11.4388 33.3359 8.85547C37.9401 8.85547 41.6693 10.418 41.6693 17.1888Z" stroke="#F11A7B" stroke-width="3.125" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.6641 27.0846H24.9974M16.6641 35.418H33.3307M33.3307 8.85547C33.3307 11.4388 31.2266 13.543 28.6432 13.543H21.3516C20.0599 13.543 18.8932 13.0221 18.0391 12.168C17.1849 11.3138 16.6641 10.1471 16.6641 8.85547C16.6641 6.27214 18.7682 4.16797 21.3516 4.16797H28.6432C29.9349 4.16797 31.1016 4.6888 31.9557 5.54297C32.8099 6.39714 33.3307 7.5638 33.3307 8.85547Z" stroke="#F11A7B" stroke-width="3.125" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            <div>
                <h3>Review</h3>
                <p>You might spend countless hours going through application reviews. Now do your own reviews which you can share only with your team-mates.</p>
              </div>
        </div>
        <div className='hurry-up-item'>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M45.1228 21.7496L43.0811 30.4579C41.3311 37.9787 37.8728 41.0204 31.3728 40.3954C30.3311 40.3121 29.2061 40.1246 27.9978 39.8329L24.4978 38.9996C15.8103 36.9371 13.1228 32.6454 15.1644 23.9371L17.2061 15.2079C17.6228 13.4371 18.1228 11.8954 18.7478 10.6246C21.1853 5.5829 25.3311 4.22874 32.2894 5.87457L35.7686 6.68707C44.4978 8.72874 47.1644 13.0412 45.1228 21.7496Z" stroke="#F11A7B" stroke-width="3.91339" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M26.3287 17.7708L36.4328 20.3333M24.287 25.8333L30.3287 27.375M31.3703 40.3958C30.0787 41.2708 28.4537 42 26.4745 42.6458L23.1828 43.7292C14.912 46.3958 10.5578 44.1667 7.87034 35.8958L5.20367 27.6667C2.53701 19.3958 4.74534 15.0208 13.0162 12.3542L16.3078 11.2708C17.162 11 17.9745 10.7708 18.7453 10.625C18.1203 11.8958 17.6203 13.4375 17.2037 15.2083L15.162 23.9375C13.1203 32.6458 15.8078 36.9375 24.4953 39L27.9953 39.8333C29.2037 40.125 30.3287 40.3125 31.3703 40.3958Z" stroke="#F11A7B" stroke-width="3.91339" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            <div>
                <h3>Notes</h3>
                <p>There is a chance you need to look for certain features or do further review later. Keep note of everything by keeping private notes on an application.</p>
              </div>
        </div>
    </div>
    <div className='button-div' style={{alignSelf: 'center'}}>
                    <button type="submit" className="btn btn-dark" onClick={()=>handleClick('register')}>Register Now</button>
                    <div>
                    <p className='registered'> Already Registered?
                 <Link onClick={()=>handleClick('login')}> Login</Link></p>
                    </div>
                   
                    </div>
    </div>
  )
}

export default HurryUp