import Products from "../components/Products";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import hero from "../assets/img/hero-image.png";

function ProductList() {
  const { slug } = useParams();
  const [category, setCategory] = useState([]);
  const [population, setPopulation] = useState(5);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

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
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();

    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 475px)').matches);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [slug, setCategory]); // Only slug and setCategory are needed as dependencies

  useEffect(() => {
    if (category && population) {
      setProductList(category?.data?.slice(0, population));
    }
    if(isMobile){
      console.log('mob-version')
    }else{
      console.log('web-version')
    }
  }, [category, population,isMobile]); // productList dependency removed

  function capitalizeWordsAfterSpace(inputString) {
    return inputString.toLowerCase().replace(/(?:^|\s)\S/g, function (match) {
      return match.toUpperCase();
    });
  }

  var heading = slug.replace(/-/g, " ");
  heading = capitalizeWordsAfterSpace(heading);

  return (
    <div>
      <div className="container bread-crumb">
        <p>
          <Link
            to={"/"}
            className="bread-crumb-links"
            style={{ color: "#101112" }}
          >
            Home{" "}
          </Link>{" "}
          / {heading}
        </p>
      </div>

      <div className="product-list-hero">
        <div className="container hero-inner">
          <div>
            <h2>The Best {heading} Apps in</h2>
            <h1>2023</h1>
          </div>
          <img src={hero} alt="" />
        </div>
      </div>

      <div className="container">
        {loading ? ( // Conditionally render loading message while data is being fetched
          <Spinner />
        ) : (
          <>
            <div className="question-answer">
              <p className="question">What are Note & Writing Apps?</p>
              <p className="answer">
                Note-writing apps are digital tools designed to help users
                capture, organize, and manage their notes efficiently. These
                apps have become increasingly popular due to their convenience
                and versatility in various aspects of life, both personal and
                professional. Here's a brief overview of note-writing apps:
              </p>
            </div>
            <Products products={productList} isMobile={isMobile} />

            <div
              className="container flex"
              style={{justifyContent: 'center', marginBottom: '3rem'}}
            >
              <button
                onClick={handleClick}
                type="btn-border"
                className="btn btn-light"
                style={{ width: "auto" }}
              >
                Show More
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
