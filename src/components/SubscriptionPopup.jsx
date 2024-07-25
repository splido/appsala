const SubscriptionPopup = () => {
  return (
    <div className="subscription-component overlay-card" style={{height: "50%"}}>
      <h2>Subscription Details 💰</h2>
      <p>Edit the Details of the App/Service you are using.</p>
      <div className="line"></div>
      <div
        className="flex"
        style={{justifyContent: "space-around", alignItems: "center"}}
      >
        <div className="product-card-left flex" style={{justifyContent:"center"}}>
          <img src="images/monday.png" alt="product-image" />
          <div>
            <p className="card-heading">monday.com</p>
            <div className="stars flex">
              <img src="images/star.png" alt="star" />
              <img src="images/star.png" alt="star" />
              <img src="images/star.png" alt="star" />
              <img src="images/star.png" alt="star" />
              <img src="images/star.png" alt="star" />
            </div>
          </div>
        </div>
        <form action="" className="subscription-form">
          <div className="flex">
            <div style={{marginRight: "15px"}}>
              <label htmlFor="">Start Date</label>
              <select name="" id="">
                <option value="">12/3/23</option>
              </select>
            </div>
            <div className="flex">
              <label htmlFor="">Package</label>
              <select name="" id="">
                <option value="">Professional</option>
              </select>
            </div>
          </div>

          <div className="flex">
            <div>
              <label htmlFor="">Price $</label>
              <input type="text" placeholder="9" />
            </div>
            <div style={{marginLeft: "-25px"}}>
              <label htmlFor="">Duration</label>
              <select name="" id="">
                <option value="">Monthly</option>
              </select>
            </div>
                   
          </div>
          <div className="flex" >
            <div >
              <label htmlFor="">Total Paid $</label>
              <input type="text" placeholder="200"/>
            </div>
            <div className="dashboard-card-check-box flex" style={{marginRight: "15px"}}>
              <label htmlFor="">Notify Me</label>
              <input type="checkbox" />
            </div>
            
          </div>

          <div className="button-div" style={{alignSelf: "center"}}>
            <button className="btn btn-light">Cancel</button>
            <button className="btn btn-dark">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubscriptionPopup