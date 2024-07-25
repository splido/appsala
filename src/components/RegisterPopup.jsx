import NewLogo from '../assets/img/new-logo.png'
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../Reducers/AuthReducer';
import { RiCloseCircleFill } from "react-icons/ri";
import { toast } from 'react-hot-toast';
import Spinner from './Spinner';

function RegisterPopup({setLoginPopupOpen, setRegisterPopup}) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
const dispatch = useDispatch();
const user = useSelector((state) => state.auth.isAuthenticated);
const userId = useSelector((state) => state.auth.user);
const loading = useSelector((state) => state.auth.loading);
const error = useSelector((state) => state.auth.error);
const navigate = useNavigate()


useEffect(() => {
  if (userId) {
    navigate(`/profile/${userId}`);
  }
}, [userId, navigate]);

const handleClick = () => {
  setLoginPopupOpen(true);
  setRegisterPopup(false);
}

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
    }));
};

const handleSubmit =async(e) => {
    e.preventDefault();
    if(credentials.password !== credentials.confirmPassword){
      toast.error('password does not match')
    }else{
    let { email, password, name } = credentials
    try{
      await dispatch(signupUser({ email, password, name })).unwrap()
      setRegisterPopup(false)
      navigate(`/profile/${userId}`);
    }catch(error){
        toast.error(error)
      }
   
    // if (user) {
   
    // }
    };
    };

    const handleClose = () =>{
      setRegisterPopup(false)
    }

  return (
    <div className="login-component overlay-card">
       <div className="close-overlay" onClick={handleClose}>
      <RiCloseCircleFill size='20px' color='#F11A7B'/> 
      </div>
       <div className="login-component-top">
  <img src={NewLogo} alt="appsala"/>
  <p><span style={{color: '#F11A7B'}}>Register</span> and Start using the crazy features on Appsala!</p>
</div>
<div className="line"></div>
         
        <form onSubmit={handleSubmit} className= 'login-register-form'>
                    <div>
                        <label style={{marginRight: '10px'}}>Name</label>
                        <input
                        className='ml-30'
                            type="text"
                            name="name"
                            value={credentials.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
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
                    <div>
                        <label
                       className='ml-40'
                        >Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="radio">
            <input type="radio"/>
            <p style={{marginLeft: "1rem"}}>By creating an account, you agree to our Terms & Conditions</p>
        </div>
                </form>
                <div className="button-div" style={{alignSelf: 'center', display: "flex"}}>
    <button className="btn btn-dark" style={{marginRight: "1rem"}} onClick={handleSubmit}>
      {
        loading ? <div style={{height:'10px'}}><Spinner type='spinner-reverse'/></div>  : 'Register'
      }
      </button>
    <p>Already Registered? <u><Link onClick={handleClick}> Login</Link></u></p>
</div>
    </div>
  )
}

export default RegisterPopup