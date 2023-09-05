import React, { useState, useEffect } from 'react';

function ReactionComponent({currentStatus}) {
  // console.log(type  currentStatus);
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
  
  useEffect(() => {
    // If the currentStatus prop changes, update selectedReaction
    setSelectedReaction(currentStatus);
  }, [currentStatus]);
  const [selectedReaction, setSelectedReaction] = useState(currentStatus);

  const handleReactionClick = (reaction) => {
    setSelectedReaction(reaction);
  };

  return (
    <div className="comment-div">
      <div
        className={`reaction ${selectedReaction === 'thumbs-up' ? 'selected' : ''}`}
        onClick={() => handleReactionClick('thumbs-up')}
      >
        I am using it 👍
      </div>
      <div
        className={`reaction ${selectedReaction === 'excited' ? 'selected' : ''}`}
        onClick={() => handleReactionClick('excited')}
      >
        Yes, I want to 🤩
      </div>
      <div
        className={`reaction ${selectedReaction === 'maybe' ? 'selected' : ''}`}
        onClick={() => handleReactionClick('maybe')}
      >
        May be 🤔
      </div>
      <div
        className={`reaction ${selectedReaction === 'thumbs-down' ? 'selected' : ''}`}
        onClick={() => handleReactionClick('thumbs-down')}
      >
        No, I don't 😐
      </div>
    </div>
  );
}

export default ReactionComponent;
