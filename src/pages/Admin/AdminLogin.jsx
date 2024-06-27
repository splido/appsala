import React, { useState, useEffect } from 'react';
import useLogin from './adminHooks/useLogin'
import Spinner from '../../components/Spinner'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../Reducers/adminAuthReducer';
const AdminLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {loading, error,isAdmin} = useSelector((state)=> state.adminAuth)
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    // const { loading, login } = useLogin()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // await login(form)
        try {
            dispatch(adminLogin(form))
            // if(!loading){
            //     navigate('/admin/dasboard')
            // }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
      
        if (isAdmin) {
            navigate(`/admin/dashboard`);
          }
          if (error) {
            alert('Wrong Email or Password');
          }
    }, [isAdmin, navigate])
    
    return (
        <div className="container admin-login-page">
            <div className='admin-login-form'>
            <div>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                           value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex">

                        {/* <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a> */}
                    </div>
           {loading ?   <Spinner/> :(<button
                        type="submit"
                        className='button'>
                        Log In
                    </button>)}
                </form>
            </div>
            </div>
        </div>
    );
};

export default AdminLogin;
