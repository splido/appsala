import { FaStar } from 'react-icons/fa'
import { MdOutlineInsertComment } from "react-icons/md";
import { FaArrowCircleRight } from 'react-icons/fa'
import monday from '../assets/img/monday.png'
const SubscriptionCard = () => {
  return (
    <div className="dashboard-page-card">
    <div className="unsubscribe-edit">
        <button className="btn btn-light">Unsubscribe</button>
        <button className="btn btn-light">  
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clip-path="url(#clip0_2689_35182)">
              <path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" fill="#F11A7B"/>
            </g>
            <defs>
              <clipPath id="clip0_2689_35182">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          Edit
        </button>
    </div>
    <div className="product-card-left flex" style={{justifyContent: "center"}}>
      <img src={monday} alt="product-image"/>
      <div className="desktop-none">
        <p className="card-heading ">monday.com</p>
        <div className="stars flex">
        <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: " #D9D9D9"}}/>
        </div>
      </div>
    </div>
    <div className="product-card-right">
        <div className="flex mobile-none">
            <p className="card-heading ">monday.com</p>
            <div className="stars flex">
            <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: " #D9D9D9"}}/>
            </div>
          </div>
        <p className="description">
          Monday.com is a comprehensive and versatile note-taking app that allows users to capture, organize, 
          and sync various types of information across multiple devicesMonday.com is a comprehensive and versatile.
        </p>
        <div className="desktop-none flex f-12 comments">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5.4375 9.04297L10.0208 1.66797L14.6042 9.04297H5.4375ZM14.7083 18.3346C13.6806 18.3346 12.8194 17.9874 12.125 17.293C11.4306 16.5985 11.0833 15.7374 11.0833 14.7096C11.0833 13.6819 11.4306 12.8207 12.125 12.1263C12.8194 11.4319 13.6806 11.0846 14.7083 11.0846C15.7361 11.0846 16.5972 11.4319 17.2917 12.1263C17.9861 12.8207 18.3333 13.6819 18.3333 14.7096C18.3333 15.7374 17.9861 16.5985 17.2917 17.293C16.5972 17.9874 15.7361 18.3346 14.7083 18.3346ZM2.5 17.8138V11.4805H8.83333V17.8138H2.5ZM14.7101 17.0846C15.3756 17.0846 15.9375 16.8549 16.3958 16.3954C16.8542 15.9359 17.0833 15.3734 17.0833 14.7079C17.0833 14.0424 16.8536 13.4805 16.3941 13.0221C15.9346 12.5638 15.3721 12.3346 14.7066 12.3346C14.0411 12.3346 13.4792 12.5644 13.0208 13.0239C12.5625 13.4834 12.3333 14.0459 12.3333 14.7114C12.3333 15.3769 12.5631 15.9388 13.0226 16.3971C13.4821 16.8555 14.0446 17.0846 14.7101 17.0846ZM3.75 16.5638H7.58333V12.7305H3.75V16.5638ZM7.6875 7.79297H12.3542L10.0208 4.02214L7.6875 7.79297Z" fill="#757575"/>
            </svg>
        <p>Marketing  <FaArrowCircleRight style={{margin:'0 10px'}}/> <u>Email Marketing</u></p>

      </div>
        <div className="flex rating-comment">  
            
            
        <div className="flex">
            <div  className="flex comments mobile-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5.4375 9.04297L10.0208 1.66797L14.6042 9.04297H5.4375ZM14.7083 18.3346C13.6806 18.3346 12.8194 17.9874 12.125 17.293C11.4306 16.5985 11.0833 15.7374 11.0833 14.7096C11.0833 13.6819 11.4306 12.8207 12.125 12.1263C12.8194 11.4319 13.6806 11.0846 14.7083 11.0846C15.7361 11.0846 16.5972 11.4319 17.2917 12.1263C17.9861 12.8207 18.3333 13.6819 18.3333 14.7096C18.3333 15.7374 17.9861 16.5985 17.2917 17.293C16.5972 17.9874 15.7361 18.3346 14.7083 18.3346ZM2.5 17.8138V11.4805H8.83333V17.8138H2.5ZM14.7101 17.0846C15.3756 17.0846 15.9375 16.8549 16.3958 16.3954C16.8542 15.9359 17.0833 15.3734 17.0833 14.7079C17.0833 14.0424 16.8536 13.4805 16.3941 13.0221C15.9346 12.5638 15.3721 12.3346 14.7066 12.3346C14.0411 12.3346 13.4792 12.5644 13.0208 13.0239C12.5625 13.4834 12.3333 14.0459 12.3333 14.7114C12.3333 15.3769 12.5631 15.9388 13.0226 16.3971C13.4821 16.8555 14.0446 17.0846 14.7101 17.0846ZM3.75 16.5638H7.58333V12.7305H3.75V16.5638ZM7.6875 7.79297H12.3542L10.0208 4.02214L7.6875 7.79297Z" fill="#757575"/>
                  </svg>
              <p>Marketing <FaArrowCircleRight style={{margin:'0 10px'}}/> <u>Email Marketing</u></p>

            </div>
          </div>

        <div className="flex rating">
          <p>
            My Rating
          </p>
          <div className="stars flex">
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: "#F11A7B"}}/>
          <FaStar style={{color: " #D9D9D9"}}/>
          </div>
        </div>

        <div className="flex">
          <div  className="flex comments">
           
          <MdOutlineInsertComment color="#F11A7B"  size='20px' style={{marginRight: '10px'}} />
            <p>Comments (<span>2</span>)</p>
          </div>
        </div>

        <div className="dashboard-card-check-box flex mobile-none">
            <label htmlFor="">Notify Me</label>
            <input type="checkbox"/>
        </div>
      </div>
        <div className="flex subscription-details">  
            
            
        <div className="flex">
            <div  className="flex">
                
              <p>Package<FaArrowCircleRight style={{margin:'0 10px'}}/><u>Professional</u></p>

            </div>
          </div>

          <div  className="flex">
           
          <p>Start Date<FaArrowCircleRight style={{margin:'0 10px'}}/><u>27 Dec 2023</u></p>

        </div>

        <div  className="flex">
         
          <p>Duration<FaArrowCircleRight style={{margin:'0 10px'}}/><u>Monthly</u></p>

        </div>
        <div  className="flex">
           
          <p>Amount<FaArrowCircleRight style={{margin:'0 10px'}}/><u>$9.00</u></p>

        </div>
        <div  className="flex">
           
          <p>Total Paid<FaArrowCircleRight style={{margin:'0 10px'}}/><u>$200.00</u></p>

        </div>
        <div className="dashboard-card-check-box flex desktop-none">
          <label htmlFor="">Notify Me</label>
          <input type="checkbox"/>
      </div>
      </div>
    </div>

   
  </div>
  )
}

export default SubscriptionCard