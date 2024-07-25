const ResetPassPopup = ({email}) => {
  return (
<div className="profile-overlay overlay-card">
    <h2>Reset Password</h2>
    <p>We will send a password reset email to your email address at <span style={{color: "#F11A7B"}}>{email}</span></p>
    <div className="line"></div>
     <div className="button-div">
        <button className="btn btn-light">Cancel</button>
        <button className="btn btn-dark">Confirm</button>
     </div>
    </div>
  )
}

export default ResetPassPopup