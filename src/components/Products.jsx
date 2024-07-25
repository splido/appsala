import { useEffect, useState } from "react"
import ProductItem from "./ProductItem"
import Spinner from './Spinner'
function Products({products,isMobile}) {
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);

    return (
    <div>
       {

        loading ? <Spinner/> :
        products && typeof(products) != 'string' ? (
          products.map((product)=>(
                <ProductItem key={product._id} product = {product} isMobile={isMobile}/>
            ))
        ): <>
        <p>No Item</p>
         </>
           
        } 
    </div>
  )
}

export default Products