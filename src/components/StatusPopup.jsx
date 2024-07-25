import React, { useState } from "react";
import moment from 'moment';
import { DatePicker } from 'antd'
import { updateUserData,updateSubscriptionDetails } from "../Reducers/userReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
function StatusPopup({setShowOverlay, setStatusPopup, info}) {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const ID =  info._id
  const [form, setForm] = useState({
    date: null,
    package: 'Professional',
    amount: '',
    duration:  'Monthly',
    notify_me: true,
    total_amount: ''
  })
  // const [dateValue, setDateValue] = useState()
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const handleDateChange = (date, dateString) => {
  setForm((prevData) => ({
    ...prevData,
    date: dateString, // Update the date in the form with the formatted date string
  }));
};

const handleSubmit = async(e) => {
  e.preventDefault()
  const body={
    Id:ID,
    form:form
  }
  try {
    console.log(form)
    await dispatch(updateSubscriptionDetails(body)).unwrap()
    toast.success('Subscription Updated')
    await dispatch(updateUserData(userId)).unwrap()  
  } catch (error) {
    toast.error('Error:', error);
  }

}
  const handleClick = () => {
    setShowOverlay(false);
    setStatusPopup(false);
  }
  // const [dateValue, onDateChange] = useState(new Date());
  return (
    <div className="subscription-component overlay-card">
     <h2>Subscription Details 💰</h2>
  <p>Fill up the Details of the App/Service you are using.</p>
    <div className="line"></div>

    <form action="" className="subscription-form" onSubmit={handleSubmit} >
      <div className="flex">
        <div  className="flex" style={{marginRight:'10px'}}>
        <label htmlFor="">Start Date</label>
        <div className="date-picker-container">
          <DatePicker   onChange={handleDateChange} // Handle date change and format it as needed
              value={form.date ? moment(form.date, 'DD-MM-YYYY') : null} // Convert form.date to moment object
              format="DD-MM-YYYY"  />
          <div className="arrow-down-container">
        {/* <BiSolidDownArrow className="arrow-down" style={{color: '#F11A7B'}}/> */}
        </div>
        </div>
        </div>

        <div className="select-container">
          <label htmlFor="">Duration</label>
        <select className="custom-select" value={form.duration} name='duration' onChange={handleInputChange}>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <div className="arrow-down-container">
        {/* <BiSolidDownArrow className="arrow-down" style={{color: '#F11A7B'}}/> */}
        </div>
        </div>    
        </div>

   
        <div className="flex">
        <div>
        <label htmlFor="">Price $</label>
        <input type="text"  placeholder="12" className="price" 
        value={form.amount}
        name="amount"
        onChange={handleInputChange}/>
        </div>
       
        <div className="flex" style={{marginLeft:"-15px"}}>
        <label htmlFor="">Package</label>
        <div className="select-container">
        <select className="custom-select" value={form.package}
        name="package"
        onChange={handleInputChange}>
          <option value="Professional">Professional</option>
          <option value="Free">Free</option>
        </select>
        <div className="arrow-down-container">
        </div>
        </div>
        </div>
        </div>

        <div className="flex">
        <div>
        <label htmlFor="">Total Paid $</label>
        <input type="text"  placeholder="12" className="price" 
        value={form.total_amount}
        name="total_amount"
        onChange={handleInputChange}/>
        </div>
        <div className="dashboard-card-check-box flex">
        <label htmlFor="" className="notify">Notify me</label>
        <input type="checkbox" 
        id="notify_me" 
        name="notify_me" 
        className="checkbox" 
        checked={form.notify_me} 
        onChange={handleInputChange} />
        </div>
        </div>
    </form>

    <div className="button-div" style={{alignSelf: "center"}}>
    <button className="btn btn-light" style={{marginRight:'10px'}}>Cancel</button>
    <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
</div>
    </div>
  )
}

export default StatusPopup