import React, { useState } from 'react';
import useFetchCategory from '../../adminHooks/useFetchCategory';
import Spinner from '../../../../components/Spinner';

function MainCategoryDropDown({ onCategorySelect }) {
  const { loading , categories } = useFetchCategory();
  const [selectedCategory, setSelectedCategory] = useState('');
  console.log(categories)

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <label htmlFor="main-category">Select Main Category:</label>
          <select
            id="main-category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default MainCategoryDropDown;
