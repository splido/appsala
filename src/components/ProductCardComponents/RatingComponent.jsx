import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import {
    updateUserData,
    updateUserRatings
  } from "../../Reducers/userReducer";
import { toast } from "react-hot-toast";
import StarRating from "../StarRating";

const RatingComponent = ({userRatings, productId}) => {
    const dispatch = useDispatch();  
    const id = localStorage.getItem("userId");
    const [isRatingEdited, setIsRatingEdited] = useState(false);
    const [selectedRatings, setSelectedRatings] = useState({
      Usability: 0,
      Performance: 0,
      Features: 0,
      Company: 0,
      Value: 0,
      Support: 0,
    });

    useEffect(() => {
        setSelectedRatings({
          Usability: userRatings?.Usability || 0,
          Performance: userRatings?.Performance || 0,
          Features: userRatings?.Features || 0,
          Company: userRatings?.Company || 0,
          Value: userRatings?.Value || 0,
          Support: userRatings?.Support || 0,
        });
      }, [userRatings]);

      function handleStarClick(aspect, value) {
        // console.log(aspect, value);
        setSelectedRatings((prevRatings) => ({
          ...prevRatings,
          [aspect]: value,
        }));
        setIsRatingEdited(true)
      }
    
      const handleUpdateRatings = async (e) => {
        e.preventDefault();
        const body = {
          Id: productId,
          ratings: selectedRatings,
        };
        try {
          await dispatch(updateUserRatings(body)).unwrap();
          setIsRatingEdited(false)
          toast.success("Rating Updated");
          await dispatch(updateUserData(id)).unwrap();
        } catch (error) {
          console.error("Error:", error);
        }
      };
    

  return (
    <div className="ratings">
              <div className="rating flex">
                <p>Usability</p>
                <StarRating
                  aspect="Usability"
                  average={userRatings?.Usability}
                  rating={selectedRatings.Usability}
                  setSelectedRatings={setSelectedRatings}
                  handleStarClick={handleStarClick}
                />
              </div>
              <div className="rating flex">
                <p>Performance</p>
                <StarRating
                  aspect="Performance"
                  average={userRatings?.Perfomance}
                  rating={selectedRatings.Performance}
                  setSelectedRatings={setSelectedRatings}
                  handleStarClick={handleStarClick}
                />
              </div>
              <div className="rating flex">
                <p>Features</p>
                <StarRating
                  aspect="Features"
                  average={userRatings?.Features || 0}
                  rating={selectedRatings.Features}
                  setSelectedRatings={setSelectedRatings}
                  handleStarClick={handleStarClick}
                />
              </div>
              <div className="rating flex">
                <p>Company</p>
                <StarRating
                  aspect="Company"
                  average={userRatings?.Company || 0}
                  rating={selectedRatings.Company}
                  setSelectedRatings={setSelectedRatings}
                  handleStarClick={handleStarClick}
                />
              </div>
              <div className="rating flex">
                <p>Value</p>
                <StarRating
                  aspect="Value"
                  average={userRatings?.Value || 0}
                  rating={selectedRatings.Value}
                  setSelectedRatings={setSelectedRatings}
                  handleStarClick={handleStarClick}
                />
              </div>
              <div className="rating flex">
                <p>Support</p>
                <StarRating
                  aspect="Support"
                  average={userRatings?.Support || 0}
                  rating={selectedRatings.Support}
                  setSelectedRatings={setSelectedRatings}
                  handleStarClick={handleStarClick}
                />
              </div>
              {
                isRatingEdited &&  <button className="btn btn-light" onClick={handleUpdateRatings}>
                Save Changes
              </button>
              }
             
            </div>
  )
}

export default RatingComponent