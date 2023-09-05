// import monday from '../assets/img/monday.png'
// import dribbble from '../assets/img/dribbble.png'
// import figma from '../assets/img/Group 96.png'
// import behance from '../assets/img/behance.png'
// import reviewIcon from '../assets/img/icon-1.svg'
import laptop from '../assets/img/Laptop.png'
import clibboard from '../assets/img/Clipboard.png'
import mobile from '../assets/img/mobile.png'
import laptop2 from '../assets/img/Rectangle.png'
import frame from '../assets/img/Frame 97.png'
import search from '../assets/img/search.svg'
import ProductCard from '../components/ProductCard'
import ReviewCard from '../components/ReviewCard'

function Home({products}) {
  return (
    <div>
     <header className="header">
        <div className="header-inner">

            <p className="large">Manage all your Web Applications in one place.</p>
            <p className="header-para"> Compare, Rate and Review web applications. Keep track of Web Applications you use or planning to use.
                 Get alerts before your payment is processed. Save your time, money or both!</p>
                 <div className="search">
                    <form>
                        <input type="text" id="search" placeholder="Search for Apps/Web Apps/Services"/>
                      </form>
                      </div>
        
                      <a href="/" className="btn btn-dark header-btn">Search<img src={search} alt=""/></a>
        </div>
            </header>
           
            <div className="container latest-reviews">
            <h1 className="heading">Latest Reviews</h1>
                <div className="reviews-section">
                    <ProductCard products={products.data}/>

            </div>
        <div className="features">
            <h1 className="heading">Top Feature</h1>
            <div className="feature-section">
            <ReviewCard products={products.data}/>
            </div>
        </div>
        <div className="market-place container">
            <div className="market-heading">
            <img src={laptop} alt=""/>
            <h1>Web Application Market Place</h1>
        </div>
            <div className="comment">
                <img src={clibboard} alt=""/>
                <pre>  Not just reviews, you can track
Applications and save money and time!
                </pre>
                <img src={mobile} alt=""/>
            </div>
        </div>

        <div className="reviews container">
            <h1 className="heading">Web Application Reviews</h1>
            <p>We provide a short review of the applications and also provide a rating and other details such as pricing, free trial, money back period etc so that you can take an immediate decision. You can also tag it to wishlist or not for me.
                 This will save you valuable time next time as you don't have to keep reading the same reviews</p>
            <img src={laptop2} alt=""/>
        </div>
        <div className="reviews container">
            <h1 className="heading">Signup for More</h1>
            <p>Once you sign up, you can keep track of the applications you use in the dashboard and also can get notification before payment. 
                This will help you to decide wisely before your card is charged</p>
            <img src={frame} alt=""/>
        </div>
        </div>
    </div>
  )
}

export default Home