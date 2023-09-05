import React, { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
// import DatePicker from "react-date-picker";
import { DatePicker } from 'antd'
function StatusPopup({setShowOverlay, setStatusPopup}) {
  const handleClick = () => {
    setShowOverlay(false);
    setStatusPopup(false);
  }
  // const [dateValue, onDateChange] = useState(new Date());
  return (
    <div className="status-popup">
    <div className="status-heading">
    <h3>Subscription Details</h3>  
    <p>Fill up the Details of the App/Service you are using.</p>
    </div>
    <div class="line"></div>
    <form action="" className="subscription-form">
        <div  className="subscription-form-child">
        <label htmlFor="">Start Date</label>
        <div className="date-picker-container">
          <DatePicker />
          <div className="arrow-down-container">
        <BiSolidDownArrow className="arrow-down" style={{color: '#F11A7B'}}/>
        </div>
        </div>
        </div>
        <div className="subscription-form-child">
        <label htmlFor="">Package</label>
        <div className="select-container">
        <select name="" class="custom-select">
          <option value="">Profession</option>
          <option value="">Free</option>
        </select>
        <div className="arrow-down-container">
        <BiSolidDownArrow className="arrow-down" style={{color: '#F11A7B'}}/>
        </div>
        </div>
        </div>
        <div className="subscription-form-child">
        <div>
        <label htmlFor="">Price 💵</label>
        <input type="text"  placeholder="12" className="price"/>
        </div>
       
        <div className="select-container">
        <select name="" class="custom-select">
          <option value="">Monthly</option>
          <option value="">Yearly</option>
        </select>
        <div className="arrow-down-container">
        <BiSolidDownArrow className="arrow-down" style={{color: '#F11A7B'}}/>
        </div>
        </div>
        <div className="checkbox-container">
        <label htmlFor="" className="notify">Notify me</label>
        <input type="checkbox"  className="checkbox"/>
        </div>
        </div>
    </form>

    <div className="rating-buttons status-bottons">
    <button className="button">Cancel</button>
    <button className="button-light" onClick={handleClick}>Submit</button>
    </div>
    </div>
  )
}

export default StatusPopup