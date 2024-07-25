export function handleStarClick(aspect, value, setSelectedRatings) {
    setSelectedRatings(prevRatings => ({
      ...prevRatings,
      [aspect]: value,
    }));
  }