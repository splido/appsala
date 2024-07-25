import { useState } from "react"
import { toast } from "react-hot-toast"
import { adminLogin } from "../../../Reducers/adminAuthReducer"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    // const { setAuthUser } = useAuthContext();
    //const {authUser, setAuthUser} = useState(false)


    const login = async (info) => {
        // const success = handleInputErrors(email, password);
		// if (!success) return;

        setLoading(true)

        try {
            dispatch(adminLogin(info));
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
            navigate('/admin/dashboard')
        }
    }

    return {loading , login}
}

export default useLogin

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}