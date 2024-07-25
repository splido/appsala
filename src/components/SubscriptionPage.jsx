import SubscriptionCard from "./SubscriptionCard"
const SubscriptionPage = () => {
  return (
  <div className="dashboard-main">
     <h2>My Subscriptions</h2>

<div className="flex">

    <div className="flex sort-by" style={{marginRight: "10px"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 9.25V7.75H16.25V3H17.75V7.75H21V9.25H13ZM16.25 21V10.75H17.75V21H16.25ZM6.25 21V16.5H3V15H11V16.5H7.75V21H6.25ZM6.25 13.5V3H7.75V13.5H6.25Z" fill="black"/>
          </svg>
          <p>Sort by latest</p>
    </div>
    <button className="btn btn-dark">Add New Subscription</button>
</div>  
    <SubscriptionCard/>
  </div>
  )
}

export default SubscriptionPage