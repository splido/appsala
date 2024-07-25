import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { useEffect } from "react";
import PrivateRoute from "./pages/PrivateRoute";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Reducers/userReducer'
import { fetchProducts, selectProducts } from './Reducers/ProductReducer'
import BlogPost from "./pages/BlogPost";
import AdminRoutes from "./pages/Admin/AdminRoutes";
import { Toaster } from "react-hot-toast";
function App() {
  const products = useSelector(selectProducts);
  const id = localStorage.getItem('userId')
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(id){
      dispatch(fetchUser(id));
    }
    dispatch(fetchProducts());
  }, [dispatch,id]);


  return (
  <>
   
    <Router>
     <Navbar products={products} /> 
    <Routes>
    <Route exact path="/" element={<Home products={products}/>} />
    <Route exact path="/blog" element={<Blog/>} />
    <Route exact path="/blog/:slug" element={<BlogPost/>} />
    <Route path="/category/:slug" element={<ProductList/>} />
    <Route path="/profile/:id" element={<PrivateRoute/>} >
    
    <Route path="/profile/:id" element={<Profile/>} />
    </Route>
    <Route path="/:slug" element={<Product products={products}/>} />
    <Route path="/admin/*" element={<AdminRoutes/>}/>
    </Routes>
    
    <Footer/>  
    </Router>
    
    <Toaster />
  
  </>
  );
}

export default App;
