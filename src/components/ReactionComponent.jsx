import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { updateUserData,updateUserProductStatus } from "../Reducers/userReducer";

function ReactionComponent({currentStatus,isDisabled,product}) {
  // console.log(currentStatus)
  const dispatch = useDispatch();
  if(currentStatus){
    if(currentStatus.startsWith("I am")){
      currentStatus = "thumbs-up"
    }if (currentStatus.startsWith("Yes")){
      currentStatus = "excited"
    }if (currentStatus.startsWith("May")){
      currentStatus = "maybe"
    }if (currentStatus.startsWith("No")){
      currentStatus = "thumbs-down"
    }
  }

  
const id = localStorage.getItem('userId')
  
  useEffect(() => {
    // If the currentStatus prop changes, update selectedReaction
    setSelectedReaction(currentStatus);
  }, [currentStatus]);
  const [selectedReaction, setSelectedReaction] = useState(currentStatus);

  const handleReactionClick = async(reaction, value) => {
    if(isDisabled){
      setSelectedReaction(null)
    }else{
      setSelectedReaction(reaction);
      

  try {
    const body = {
      productId:product?._id,
      status:value,
    }
    await dispatch(updateUserProductStatus(body)).unwrap()
    await  dispatch(updateUserData(id)).unwrap()  
  } catch (error) {
    console.error("Error:", error);
  }
  console.log('done calling')

    }


    // console.log(value)
    // console(reaction)


  };

  return (
    <div className="reactions flex">
      <div
        className={`reaction ${selectedReaction === 'thumbs-up' ? 'selected-reaction' : ''}`}
        onClick={() => handleReactionClick('thumbs-up', 'I am using it 👍')}
        value = 'I am using it 👍'
      >
        I am using it 👍
      </div>
      <div
        className={`reaction ${selectedReaction === 'excited' ? 'selected-reaction' : ''}`}
        onClick={() => handleReactionClick('excited','Yes, i want to 🤩')}
        value = 'Yes, I want to 🤩'
      >
        Yes, I want to 🤩
      </div>
      <div
        className={`reaction ${selectedReaction === 'maybe' ? 'selected-reaction' : ''}`}
        onClick={() => handleReactionClick('maybe','Maybe 🤔')}
        value = 'Maybe 🤔'
      >
        May be 🤔
      </div>
      <div
        className={`reaction ${selectedReaction === 'thumbs-down' ? 'selected-reaction' : ''}`}
        onClick={() => handleReactionClick('thumbs-down',"No, i don't 😑")}
        value = "No, I don't 😐"
      >
        No, I don't 😐
      </div>
    </div>
  );
}

export default ReactionComponent;
