import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { adminLogout } from "../../../Reducers/adminAuthReducer"

const useLogOut = () => {
	const [loading, setLoading] = useState(false);
	// const { setAuthUser } = useAuthContext();
	const [authUser, setAuthUser] = useState(false)

    const dispatch = useDispatch();
	const logout = async () => {
		setLoading(true);
		try {
            dispatch(adminLogout());
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogOut;
