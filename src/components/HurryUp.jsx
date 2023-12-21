import notification from '../assets/img/notification1.png'
import notepad from '../assets/img/notepad2.png'
import ankr from '../assets/img/ankr.png'
import board from '../assets/img/board.png'
import { Link } from 'react-router-dom';
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
  return (
    <div className="login-pop hurry-pop">
         <div className="comment-heading">
    <h3>Hurry Up🔥</h3>  
     <p> <span style={{color:'#F11A7B'}} onClick={()=>handleClick('register')}>Register</span> and Start using the crazy features on Appsala!</p>
    </div>
    <div class="line"></div>
    <div className="hurryUp">
        <div className='hurrygrid'>
            <img src={ankr} alt="" />
            <div>
                <h4>Track</h4>
                <p>Tracking the web application you use need
            not be tiresome. Now you can track all the applications in one place.</p>
            </div>
        </div>
        <div className='hurrygrid'>
            <img src={notepad} alt="" />
            <div>
                <h4>Track</h4>
                <p>Tracking the web application you use need
            not be tiresome. Now you can track all the applications in one place.</p>
            </div>
        </div>
        <div className='hurrygrid'>
            <img src={notification} alt="" />
            <div>
                <h4>Track</h4>
                <p>Tracking the web application you use need
            not be tiresome. Now you can track all the applications in one place.</p>
            </div>
        </div>
        <div className='hurrygrid'>
            <img src={board} alt="" />
            <div>
                <h4>Track</h4>
                <p>Tracking the web application you use need
            not be tiresome. Now you can track all the applications in one place.</p>
            </div>
        </div>
    </div>
    <div className='hurry-button-div'>
                    <button type="submit" className='button-light' onClick={()=>handleClick('register')}>Register Now</button>
                    <div>
                    <p className='registered'> Already Registered?
                 <Link onClick={()=>handleClick('login')}> Login</Link></p>
                    </div>
                   
                    </div>
    </div>
  )
}

export default HurryUp