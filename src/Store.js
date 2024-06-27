import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/AuthReducer';
import adminAuthReducer from './Reducers/adminAuthReducer';
import productReducer from './Reducers/ProductReducer';   
import userReducer from './Reducers/userReducer';
 
const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        user: userReducer,
        adminAuth: adminAuthReducer,
    },
  });
  
  export default store;