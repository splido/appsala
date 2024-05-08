import Products from '../components/Products'
import { useState, useEffect } from "react"
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

function ProductList() {
    const { slug } = useParams();
    const [category, setCategory] = useState([]);
    const [population, setPopulation] = useState(5);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const handleClick = () => setPopulation(population + 5);

    useEffect(() => {
      const apiCategoryUrl = `https://appsala-backend.netlify.app/.netlify/functions/index/category/${slug}`;
      
      const fetchCategory = async () => {
        try {
          const response = await fetch(apiCategoryUrl);
          const data = await response.json();
          setCategory(data);
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
      fetchCategory();
    }, [slug, setCategory]); // Only slug and setCategory are needed as dependencies
    
    useEffect(() => {
      if (category && population) {
        setProductList(category?.data?.slice(0, population));
      }
    }, [category, population]); // productList dependency removed

    function capitalizeWordsAfterSpace(inputString) {
      return inputString
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, function (match) {
          return match.toUpperCase();
        });
    }

    var heading = slug.replace(/-/g, " ");
    heading = capitalizeWordsAfterSpace(heading);

    return (
      <div>
        <p className="page-path"><Link to={'/'} className='product-link' style={{color:'#101112'}}>Home </Link>/ {heading}</p>
        <header className="product-header">
          <div className="product-header-inner">
            <h1 className="product-heading">
              The Best {heading} Apps in <span>2023</span>
            </h1>
          </div>
        </header>
        <div className="product-section container">
          {loading ? ( // Conditionally render loading message while data is being fetched
            <Spinner/>
          ) : (
            <>
              <div className="product-question">
                <p className="question">What are {heading} Apps?</p>
                <p>Note-writing apps are digital tools designed to help users capture, organize, and manage their notes efficiently. These apps have become increasingly popular due to their convenience and versatility in various aspects of life, both personal and professional. Here's a brief overview of note-writing apps:</p>
              </div>  
              <Products products={productList}/>
              <button onClick={handleClick} type="btn-border" className='button' style={{width:'auto'}}>Show More</button>
            </>
          )}
        </div>
      </div>
    );
}

export default ProductList;
