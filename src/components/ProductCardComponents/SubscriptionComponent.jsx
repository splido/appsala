import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { DatePicker } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  updateUserData,
  updateSubscriptionDetails,
} from "../../Reducers/userReducer";

const SubscriptionComponent = ({subscription, productId}) => {
    const dispatch = useDispatch();  
    const id = localStorage.getItem("userId");
    const [form, setForm] = useState({
        date: null,
        package: "Professional",
        amount: "",
        duration: "Monthly",
        notify_me: true,
        total_amount: "",
      });
      const [isEdited, setIsEdited] = useState(false);

      
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsEdited(true);
  };

  const handleDateChange = (date, dateString) => {
    setForm((prevData) => ({
      ...prevData,
      date: dateString, // Update the date in the form with the formatted date string
    }));
    setIsEdited(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    setIsEdited(false);
    const body={
      Id:productId,
      form:form
    }
    try {
        console.log(form)
        await dispatch(updateSubscriptionDetails(body)).unwrap()
        toast.success('Subscription Updated')
        await dispatch(updateUserData(id)).unwrap()
      } catch (error) {
        toast.error('Error:', error);
      }
    };

    
  useEffect(() => {
    setForm({
      date: subscription?.date || null,
      package: subscription?.package || "Professional",
      amount: subscription?.amount || "",
      duration: subscription?.duration || "Monthly",
      notify_me: subscription?.notify_me || true,
      total_amount: "",
    });
  }, [subscription]);

  return (
    <div>
    <p className="dark-text">Subscription Details</p>
    <div className="card-open-form" onChange={handleInputChange}>
      <select name="duration" id="" value={form.duration}>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <div className="date-picker-container">
        <DatePicker
          onChange={handleDateChange}
          value={form.date ? moment(form.date, "DD-MM-YYYY") : null} 
          format="DD-MM-YYYY"
        />
        <div className="arrow-down-container">
        </div>
      </div>

      <select
        onChange={handleInputChange}
        value={form.package}
        name="package"
      >
        <option  value="Professional">Professional</option>
        <option value="Free">Free</option>
      </select>

      <div className="flex">
        <label htmlFor="">Price</label>
        <input
          type="text"
          placeholder="$9"
          onChange={handleInputChange}
          value={form.amount}
          name="amount"
        />
      </div>

      <div className="flex">
        <label htmlFor="">Notify Me</label>
        <input
          type="checkbox"
          onChange={handleInputChange}
          name="notify_me"
          checked={form.notify_me}
        />
      </div>
      <div className="flex">
        <label htmlFor="">Total</label>
        <input
          type="text"
          placeholder="$200"
          onChange={handleInputChange}
          name="total_amount"
          value={form.total_amount}
        />
      </div>
    {
      isEdited && 
      <button className="btn btn-light" onClick={handleFormSubmit}>
      Save Changes
      </button>
    }
      
    </div>
  </div>
  )
}

export default SubscriptionComponent