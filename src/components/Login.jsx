import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Reducers/AuthReducer';


const Login = () => {
    // const [token, setToken] = useState('');
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',});
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const user = useSelector((state) => state.auth.isAuthenticated);
    const userId = useSelector((state) => state.auth.user);
    const navigate = useNavigate()
    // const [isAuthenticated, setIsAuthenticated]=useState(false)
   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        let { email, password } = credentials
        dispatch(loginUser({ email, password }));
        if (user) {
                //   setIsAuthenticated(true);
                //   const accessToken = result.data.token;
                //   localStorage.setItem('access_token', accessToken);
                //   setToken(accessToken);
                  navigate(`/profile/${userId}`);
                } else {
                  alert('wrong email or password');
                }
        // try {
        //     let res = await fetch("https://appsalabackend-p20y.onrender.com/login", {
        //       method: "post",
        //       body: JSON.stringify({ email, password }),
        //       headers: {
        //         "Content-Type": "application/json"
        //       }
        //     });
        //     // console.log(res)
        //     // const token = await res.headers['x-api-token']
        //     // console.log(token)
        //     let result = await res.json();
           
        //     // console.log(result)
        
        //     if (result.status) {
        //       setIsAuthenticated(true);
        //       const accessToken = result.data.token;
        //       localStorage.setItem('access_token', accessToken);
        //       setToken(accessToken);
        //       navigate(`/profile/${result.data.userId}`);
        //     } else {
        //       alert('wrong email or password');
        //     }
        
        //     // Reset the form fields after submission
        //     // setCredentials({
        //     //   email: '',
        //     //   password: '',
        //     // });
        //   } catch (error) {
        //     console.error("Error during fetch:", error);
        //     alert('An error occurred during the login process.');
        //   }
        };
    return (
        <>
            <div className="container">

                <form onSubmit={handleSubmit}>
                    <div>
                        <label><strong>Email:</strong></label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p><Link to={"/"}>  Don't have account ?</Link> <Link to={"/forgetpassword"}>Forget Password</Link></p>
                </form>
            </div>

        </>
    );
};

export default Login;
