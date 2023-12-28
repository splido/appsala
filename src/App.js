import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Addcompany from "./components/Addcompany";
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

function App() {
  const products = useSelector(selectProducts);
  const id = localStorage.getItem('userId')
  const dispatch = useDispatch();
  useEffect(()=>{
    // fetchData()
    dispatch(fetchUser(id));
    dispatch(fetchProducts());
  }, [dispatch,id]);

  // const apiUrl = 'https://appsalabackend-p20y.onrender.com/products'
  // const fetchData = async() =>{
  //   const response = await fetch(apiUrl)
  //   const data = await response.json()
  //   setProducts(data)
   
  // }


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
    <Route path="/form" element={<PrivateRoute/>} >
    <Route path="/form" element={<Addcompany/>} />
    </Route>
    <Route path="/:slug" element={<Product products={products}/>} />
    </Routes>
    <Footer/>  
    </Router>
  
  </>
  );
}

export default App;
