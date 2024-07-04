import React, { useState } from 'react';
import useCreateCategory from '../../adminHooks/useCreateCategory';
import Spinner from '../../../../components/Spinner';
import MainCategoryDropDown from './MainCategoryDropDown';

const CreateCategoryDropDown = ({ categories }) => {
  const { loading, createCategory } = useCreateCategory();

  const [formData, setFormData] = useState({
    type: 'main',
    name: '',
    slug: '',
    subCategory_ids: [],
    description: '',
    image: { url: '', public_id: '' },
    parentCategory: ''
  });

  

 
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory(formData);
    // Handle form submission, e.g., send data to an API
  };

 

  


  const handleCategorySelect = (categoryId)=>{
    setFormData({
      ...formData,
      parentCategoryID : categoryId
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      
        

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Enter category slug"
            required
          />
        </div>


        <div>
          <label htmlFor="type">Type of Category:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="main">Main Category</option>
            <option value="sub">Subcategory</option>
          </select>
        </div>

        {formData.type === 'sub' && (
          <MainCategoryDropDown  onCategorySelect={handleCategorySelect}/>
        )}

        <div className="mb-4">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            required
          />
        </div>

       

        <div className="button-div">
          <button
            type="submit"
            className="button"
          >
            {loading ? <Spinner /> : "Submit"}
          </button>

          
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryDropDown;
