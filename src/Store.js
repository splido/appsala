import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/AuthReducer';
import productReducer from './Reducers/ProductReducer';   
import userReducer from './Reducers/userReducer';
 
const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        user: userReducer,
    },
  });
  
  export default store;