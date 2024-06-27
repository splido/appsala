import React, { useState, useEffect } from 'react';
import useFetchsubCategory from '../../adminHooks/useFetchsubCategory';
import Spinner from '../../../../components/Spinner'
function CategoryDropDown({ onCategorySelect, categoryData }) {
  const { subCategories, loading } = useFetchsubCategory();
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to handle category selection change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category); // Update the selected category state
    onCategorySelect(category); // Call the function passed as prop with the selected category
  };

  // Set the selected category when categoryData changes
  useEffect(() => {
    console.log("categoryData in useEffect:", categoryData);
    if (categoryData && categoryData.Category) {
      setSelectedCategory(categoryData.Category);
    }
  }, [categoryData])

 

  return (
    <>
      {loading ? (
        <Spinner/>
      ) : (
        <div>
          <h2 >Category</h2>
          <select
            id="categories"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">{selectedCategory  ? selectedCategory :"Please select a category"}</option>
            {subCategories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default CategoryDropDown;
