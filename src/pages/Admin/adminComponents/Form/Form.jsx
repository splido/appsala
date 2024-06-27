import React, { useState, useEffect } from 'react';
import AppPricing from './AppPricing';
import SellerDetails from './SellerDetails';
import Rating from './Rating';
import CategoryDropDown from './CategoryDropDown';
import useCreateApplication from '../../adminHooks/useCreateApplication';
import { useParams } from 'react-router-dom';
import Spinner from '../../../../components/Spinner'

function Form() {

  const { applicationId } = useParams()
  let { applicationData, loading, createApplication, updateProductData } = useCreateApplication(applicationId)



  const [formData, setFormData] = useState({

    name: "",
    slug: "",
    shortname: "",
    rating: {
      Usability: 0,
      Performance: 0,
      Features: 0,
      Support: 0,
      Value: 0,
      Company: 0
    },
    logo: "",
    tag: [],
    Category: "",
    shortDescription: "",
    longDescription: "",
    review: "",
    sellerDetails: {

    },
    appPricing: [],

  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(applicationId){
      await updateProductData(formData)
    }else{
      await createApplication(formData)
    }
  }


  useEffect(() => {
    // Check if applicationData exists before setting formData
    if (applicationData) {
        // Modify the applicationData as needed before setting it into state
        const modifiedData = {
            ...applicationData,
            // Check if 'tag' exists and has elements, else set it to an empty array
            tag: applicationData.tag && applicationData.tag.length > 0 ? applicationData.tag : []
        };
        // Set the modified data into state
        setFormData(modifiedData);
    }
}, [applicationData]); 


  


  const handlePricingChange = (pricingData) => {
    setFormData((prevState) => ({
      ...prevState,
      appPricing: pricingData
    }));
  };

  // Function to handle selected category data
  const handleSelectedCategory = (category) => {
    setFormData(prevState => ({
      ...prevState,
      Category: category
    }));
  };

  const handleSellerChange = (sellerDetails) => {
    setFormData((prevState) => ({
      ...prevState,
      sellerDetails: sellerDetails
    }));
  };



  const handleRatingChange = (ratingData) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: ratingData
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target


    if (name === "tag") {
      // Split the input value by commas and trim each tag
      const tagArray = value.split(",").map(tag => tag.trim());

      // Update the tag array in the formData state directly
      setFormData(prevState => ({
        ...prevState,
        tag: tagArray
      }))
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }

  }

  return (
    <form onSubmit={handleSubmit} >
      <div>
        <label htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='Enter your Application Name'
          required
        />
      </div>
      <div>
        <label htmlFor="slug">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder='Enter Slug'
          required
        />
      </div>

      <div>
        <label htmlFor="shortname">
          shortname
        </label>
        <input
          type="text"
          id="shortname"
          name="shortname"
          value={formData.shortname}
          onChange={handleChange}
          placeholder='Enter Short Name'
          required
        />
      </div>


      <Rating onRatingChange={handleRatingChange} ratingData={applicationData} />
      {/* logo */}


      <div>
        <label htmlFor="tag">
          Tag
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={formData.tag.join(",")} // Join the array with commas to display in the input
          onChange={handleChange}
          placeholder="Enter Tag (comma-separated)"
           required
        />
      </div>

      <CategoryDropDown onCategorySelect={handleSelectedCategory} categoryData = {applicationData} />

      <div>
        <label htmlFor="shortDescription">
          shortDescription
        </label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder='Enter Short Description'
          rows="4"
          required
        />
      </div>

      <div>
        <label htmlFor="longDescription">
          longDescription
        </label>
        <textarea
          type="text"
          id="longDescription"
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          placeholder='Enter Long Description'
          required
        />
      </div>

      <div>
        <label htmlFor="review">
          Review
        </label>
        <input
          type="text"
          id="review"
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder='Enter your Review'
          required
        />
      </div>

      <h2>Seller Details</h2>
      <SellerDetails onSellerChange={handleSellerChange} sellerData={applicationData}/>
      <h2>App Pricing</h2>
      <AppPricing onPricingChange={handlePricingChange} AppPricingData={applicationData} />
      {loading ? <Spinner/> : (<button
        type="submit"
        className="button"
      >
       {applicationId? "Update" : "Submit"}
      </button>)}
    </form>
  )
}




export default Form;

