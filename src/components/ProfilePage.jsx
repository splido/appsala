import { PiPencilDuotone, PiPencilSlashDuotone } from 'react-icons/pi'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser ,updateUser} from '../Reducers/userReducer'

function ProfilePage() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  var name = user.products.data.name
  var email = user.products.data.email

  const [edit, setEdit] = useState({
    nameEdit: false,
    emailEdit: false,
  })
  
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const [form, setForm] = useState({
    name: name,
    email: email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form.newPassword !== form.confirmPassword){
      alert('password does not match')
    }
    else{
    let { currentPassword, newPassword } = form
    dispatch(updateUser({ currentPassword, newPassword }));
    console.log('password updated')
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    let { name, email } = form
    dispatch(updateUser({ name, email }));
    console.log('updated')
  }    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
    }));
  };
  
  return (
    <div className="dashboard-main">
      <h2>
      My Profile
      </h2>
      <form action="" className='profile-name-email'>
        <div>
        <div className='flex'>
          <label htmlFor="">Name</label>
          <input type="text" value={form.name} placeholder={name}  disabled={!edit.nameEdit} name="name" onChange={handleChange} />
          {
            edit.nameEdit ? <PiPencilSlashDuotone className='profile-icon' onClick={() => setEdit({...edit, nameEdit: false})}/> : <PiPencilDuotone className='profile-icon' onClick={() => setEdit({...edit, nameEdit: true})}/>
          }
          {/* <PiPencilDuotone className='profile-icon'/> */}
        </div>
        <div className='flex'>
          <label htmlFor="">Email </label>
          <input type="text"  value={form.email} placeholder={email} disabled={!edit.emailEdit} name="email" onChange={handleChange}/>
          {
            edit.emailEdit ? <PiPencilSlashDuotone className='profile-icon' onClick={() => setEdit({...edit, emailEdit: false})}/> : <PiPencilDuotone className='profile-icon' onClick={() => setEdit({...edit, emailEdit: true})}/>
          }
        </div>
        </div>
        <button className="btn btn-dark" onClick={handleUpdate}>Update</button>
      </form>
      <form action="" className="profile-password">
      <h3>Update Password</h3>
      <div  className='form-div'>     
       
          <div >
            <label htmlFor="">Curent Password</label>
            <div>
            <input type={showPassword.currentPassword ? 'text' : 'password'} name="currentPassword"  value={form.currentPassword}  onChange={handleChange}/>
            {
              showPassword.currentPassword ? <AiOutlineEye className='profile-icon' onClick={() => setShowPassword({...showPassword, currentPassword: false})}/> : 
              <AiOutlineEyeInvisible className='profile-icon' onClick={() => setShowPassword({...showPassword, currentPassword: true})}/>
            }
            {/* <AiOutlineEyeInvisible  className='profile-icon'/> */}
            </div>
          </div>
          <div >
            <label htmlFor="">New Password</label>
            <div>
            <input type={showPassword.newPassword ? 'text' : 'password'}  value={form.newPassword} name="newPassword" onChange={handleChange}/>
            {
              showPassword.newPassword ? <AiOutlineEye className='profile-icon' onClick={() => setShowPassword({...showPassword, newPassword: false})}/> : 
              <AiOutlineEyeInvisible  className='profile-icon' onClick={() => setShowPassword({...showPassword, newPassword: true})}/>
            }
           
            </div>
           
          </div>
          <div >
            <label htmlFor="">Confirm Password</label>
            <div >
            <input type={showPassword.confirmPassword ? 'text' : 'password'}  value={form.confirmPassword} name="confirmPassword" onChange={handleChange}/>
            {
              showPassword.confirmPassword ? <AiOutlineEye className='profile-icon' onClick={() => setShowPassword({...showPassword, confirmPassword: false})}/> :
              <AiOutlineEyeInvisible className='profile-icon' onClick={() => setShowPassword({...showPassword, confirmPassword: true})}/>
           }
      
            </div>
          </div>
          </div>
          
          <button className="btn btn-dark" onClick={handleSubmit}>Update Password</button>
        </form>
     
    </div>
  )
}

export default ProfilePage