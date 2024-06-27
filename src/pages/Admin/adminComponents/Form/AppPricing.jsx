import React, { useState, useEffect } from 'react';

const AppPricing = ({ onPricingChange ,AppPricingData}) => {
  const [pricingData, setPricingData] = useState([
    {
      package: '',
      price: '',
      description: '',
      duration: 'month'
    }
  ]);

 
  useEffect(()=>{
  if(AppPricingData && AppPricingData.appPricing) {  setPricingData(AppPricingData.appPricing)}
  },[AppPricingData])

  const handleAddField = () => {
    setPricingData([...pricingData, {
      package: '',
      price: '',
      description: '',
      duration: 'month'
    }]);
  };

  const handleRemoveField = (index) => {
    const updatedPricingData = [...pricingData];
    updatedPricingData.splice(index, 1);
    setPricingData(updatedPricingData);
    onPricingChange(updatedPricingData); // Notify parent after removing a field
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPricingData = [...pricingData];
    updatedPricingData[index][name] = value;
    setPricingData(updatedPricingData);
    onPricingChange(updatedPricingData); // Notify parent on every change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPricingChange(pricingData); // Notify parent on form submission
  };

  return (
    <div>
     <form onSubmit={handleSubmit}>
        
        {pricingData.map((pricing, index) => (
          <div key={index} 
          style={{
            position:'relative'
          }}
          >
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="admin-delete-cross button"
            >
              &#x2716;
            
            </button>
            <div>
              <label htmlFor={`package-${index}`}>Package:</label>
              <input
                type="text"
                id={`package-${index}`}
                name="package"
                value={pricing.package}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter package name"
                required
              />
            </div>
            <div>
              <div>
                <label htmlFor={`price-${index}`}>Price:</label>
                <input
                  type="number"
                  id={`price-${index}`}
                  name="price"
                  value={pricing.price}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter price"
                  required
                />
              </div>
              <div>
                <label htmlFor={`duration-${index}`}>Duration:</label>
                <select
                  id={`duration-${index}`}
                  name="duration"
                  value={pricing.duration}
                  onChange={(e) => handleChange(index, e)}
                  required
                >
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor={`description-${index}`}>Description:</label>
              <textarea
                id={`description-${index}`}
                name="description"
                value={pricing.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter description"
                required
              ></textarea>
            </div>
          </div>
        ))}
        <div className="flex">
          <button
            type="button"
            className='button-light'
            onClick={handleAddField}
          >
            Add Package
          </button>
        
        </div>
      </form>
    </div>
  );
};

export default AppPricing;
