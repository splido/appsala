// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons'
import { IoMdStar } from "react-icons/io";
import { useMemo, useState } from 'react';
function StarRating({ average, color, rating, handleStarClick, aspect, isDisabled }) {
  const [hover, setHover] = useState(null);

    // const averageRating = Math.floor(average)
    const getColor = (idx) => {
      if(hover >= idx) {return '#EFB027'}
      else if(!hover && rating >= idx){return '#EFB027' }
      return  '#D9D9D9'
    }

    const renderStars = useMemo(() => {
        return Array(5).fill(0).map((_, i) => i+1).map((idx) => {
          return <IoMdStar 
          key={idx} 
          onClick={() => handleStarClick(aspect,idx)} 
          onMouseEnter={()=>setHover(isDisabled ? null : idx)}
          onMouseLeave={()=> setHover(null)}
          style={{color:getColor(idx)}}
          size='25px'
          />
          //  <FontAwesomeIcon 
          // icon={faStar} 
          // key={idx} 
          // onClick={() => handleStarClick(aspect,idx)} 
          // onMouseEnter={()=>setHover(isDisabled ? null : idx)}
          // onMouseLeave={()=> setHover(null)}
          // style={{color:getColor(idx)}}/>
        }       
          )
    }, [ isDisabled,  handleStarClick, aspect, getColor, setHover])

    return <div>{renderStars}</div>;
  }

  StarRating.defaultProps = {
    average: 5,
    rating: 0,
    color: {
        filled: '#F11A7B',
        unfilled: '#D9D9D9',
    }
  }

  export default StarRating;