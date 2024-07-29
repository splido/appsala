import NewLogo from '../assets/img/new-logo.png'
import facebook from '../assets/img/facebook.png'
import google from '../assets/img/google.png'
import twitter from '../assets/img/twitter.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Reducers/AuthReducer';
import { useEffect } from 'react';
import { RiCloseCircleFill } from "react-icons/ri";
import toast from 'react-hot-toast';
import Spinner from './Spinner';

function LoginPopup({setLoginPopupOpen}) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',});
const dispatch = useDispatch();
const loading = useSelector((state) => state.auth.loading);
const error = useSelector((state) => state.auth.error);
const userId = useSelector((state) => state.auth.user);
const navigate = useNavigate()


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
    }));
};

const handleSubmit = async(e) => {
    e.preventDefault();
    let { email, password } = credentials
    try{
      await dispatch(loginUser({ email, password })).unwrap()
      setLoginPopupOpen(false)
    }catch(error){
      toast.error(error)
    }
    };

    useEffect(() => {
      if (userId) {
        navigate(`/`);
        setLoginPopupOpen(false)
      }
    }, [userId, navigate,error,setLoginPopupOpen]);

    const handleClose = () =>{
      setLoginPopupOpen(false)
    }

  return (
    <div className="login-component overlay-card">
      <div className="close-overlay" onClick={handleClose}>
      <RiCloseCircleFill size='20px' color='#F11A7B'/> 
      </div>
      <div className="login-component-top">
    <img  src={NewLogo} alt="appsala"/>
    <p><span style={{color: '#F11A7B'}}>Login</span> and Start using the crazy features on Appsala!</p>
  </div>
  
        <div className="line"></div>
         
        <form onSubmit={handleSubmit} className= 'login-register-form'>
                    <div>
                        <label style={{marginRight: '10px'}}>Email</label>
                        <input
                        
                          className='ml-30'
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
               
                
                <Link to={"/forgetpassword"} className='forget-pass'>Forget Password?</Link>
                <div className="button-div" style={{alignSelf: "center"}}>
                {
        loading ? <Spinner/>  :   <button className="btn btn-dark">
        Login
         </button>
        
      }
       
</div>
<div className="flex social">
    <img src={facebook} alt="" />
            <img src={google} alt="" />
            <img src={twitter} alt="" />
    </div>
 </form>
    </div>
  )
}

export default LoginPopup
