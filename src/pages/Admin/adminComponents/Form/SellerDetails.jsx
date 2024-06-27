import React, { useState, useEffect } from 'react';
import YearDropDown from './YearDropDown';

const SellerDetails = ({ onSellerChange, sellerData }) => {
  const [formData, setFormData] = useState({
    seller: '',
    Website: '',
    companyWebsite: '',
    yearFounded: '',
    HQLocation: '',
    socialmedia: {
      twitter: '',
      linkedInPage: ''
    }
  });
  

  useEffect(()=>{
    if(sellerData && sellerData.sellerDetails){
      setFormData(sellerData.sellerDetails)
    }
   
  },[sellerData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [name]: value
      };
      // Call the parent callback with the updated form data
      onSellerChange(updatedFormData);
      return updatedFormData;
    });
  };

  const handleYearChange = (year) => {
    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        yearFounded: year
      };
      // Call the parent callback with the updated form data
      onSellerChange(updatedFormData);
      return updatedFormData;
    });
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="seller">Seller:</label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={formData.seller}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Website">Website:</label>
          <input
            type="text"
            id="Website"
            name="Website"
            value={formData.Website}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="companyWebsite">Company Website:</label>
          <input
            type="text"
            id="companyWebsite"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            required
          />
        </div>
        <YearDropDown onYearChange={handleYearChange} yearData ={formData.yearFounded}/>
        <div>
          <label htmlFor="HQLocation">HQ Location:</label>
          <input
            type="text"
            id="HQLocation"
            name="HQLocation"
            value={formData.HQLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h2>Social Media Links</h2>
          <div>
            <label htmlFor="twitter">Twitter:</label>
            <input
              type="text"
              id="twitter"
              name="twitter"
              value={formData.socialmedia.twitter}
              onChange={(e) => {
                const { value } = e.target;
                setFormData((prevState) => {
                  const updatedFormData = {
                    ...prevState,
                    socialmedia: {
                      ...prevState.socialmedia,
                      twitter: value
                    }
                  };
                  // Call the parent callback with the updated form data
                  onSellerChange(updatedFormData);
                  return updatedFormData;
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="linkedInPage">LinkedIn Page:</label>
            <input
              type="text"
              id="linkedInPage"
              name="linkedInPage"
              value={formData.socialmedia.linkedInPage}
              onChange={(e) => {
                const { value } = e.target;
                setFormData((prevState) => {
                  const updatedFormData = {
                    ...prevState,
                    socialmedia: {
                      ...prevState.socialmedia,
                      linkedInPage: value
                    }
                  };
                  // Call the parent callback with the updated form data
                  onSellerChange(updatedFormData);
                  return updatedFormData;
                });
              }}
            />
          </div>
        </div>
       
      </form>
    </div>
  );
};

export default SellerDetails;
