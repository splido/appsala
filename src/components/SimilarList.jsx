import React from 'react'
import { useEffect,useState } from 'react'
import StarRating from '../components/StarRating'
function SimilarList({similar}) {
    const [similar_products, setSimilar_products] = useState([])
  useEffect(()=>{
    const similar_products = similar?.slice(0,4)
    setSimilar_products(similar_products)
  },[similar])
 
  return (
  <>
        {
            similar_products?.map((product, index)=>(
                <div className="flex" key={index}>
                    <img src={product?.logo} alt="product-image" style={{height: 'auto', width: '70px'}}/>
            
                <div className="card-left-div">
        
                    <p className='dark-text'>{product?.name}</p>
                    <div className="stars">
                       
                    <StarRating rating={product?.averageRating} isDisabled ={true}/> 
                    </div>
                        <p>{product?.averageRating}</p>
                </div>
                </div>
            ))
        }
  </>
  )
}

export default SimilarList