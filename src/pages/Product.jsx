import monday from '../assets/img/monday.png'
import dribbble from '../assets/img/dribbble.png'
import figma from '../assets/img/Group 96.png'
import behance from '../assets/img/behance.png'
// import evernote from '../assets/img/Group.png'
import product from '../assets/img/product-image.png'
import Button from '../components/Button'
import { FaBookmark, FaGlobe } from 'react-icons/fa';
import { useParams } from 'react-router'
import SingleProduct from '../components/SingleProduct'
import { useEffect, useState } from "react"
import SimilarList from '../components/SimilarList'
import Spinner from '../components/Spinner'
function Product({products}) {
    const{ slug } = useParams()
    var input_string = slug
    var output_string = input_string.replace(/-/g, " ")

    const [singleProduct, setSingleProduct] = useState([])
    const [loading, setLoading] = useState(true);
    const [similar, setSimilar] = useState([])
     useEffect(()=>{
      const apiUrl = 'https://appsalabackend-p20y.onrender.com/products'
      const fetchData = async() =>{
        const response = await fetch(apiUrl)
        const data = await response.json()
        const foundProducts = data.data.filter((product) => product.slug === slug);
        setSingleProduct(foundProducts)
        setSimilar(data.data.filter((product) => product?.Category === singleProduct[0]?.Category))
        // setSimilar(similar)
        console.log(similar)
        // similar ? setLoading(false) : setLoading(true);
        setLoading(false)
      }
        fetchData()
      },[slug])

    //   setSimilar(similar[0])
  return (
    <>
    <div>
      <header className="product-page-header container">
        <p className="page-path">Home / {output_string}</p>
        <div className="product-info-grid">
        <img src={singleProduct[0]?.logo} alt=""/>
    <div className="product-text">
    <p className="product-info-heading">{singleProduct[0]?.name}</p>
    <p style={{color: "#454545"}}>{singleProduct[0]?.review}</p>
    <p>749  Follows</p>
    </div>
            <div className="buttons">
                <Button type= "btn-light"> <FaBookmark style={{margin: "10px"}}/> Save</Button>
                <Button type= "btn-dark"> <FaGlobe style={{margin: "10px"}}/>Visit Web</Button>
            </div>
        </div>
        <div className="product-question">
            <p className="question">What is {singleProduct[0]?.name}?</p>
            <p style={{color: "#454545"}}>{singleProduct[0]?.shortDescription} </p>
        </div>
        <div className="product-bar">
            <p>
                Do you wish to use {output_string}?
            </p>
            <div className="comment-div">
            <div className="reaction selected">
                I am using it 👍
            </div>
            <div className="reaction">
                Yes, I want to 🤩
            </div>
            <div className="reaction">
               May be 🤔
            </div>
            <div className="reaction">
              No, I don't 😐
            </div>
        </div>
        </div>
    </header>
    <div className="image-section container">
        <p className="highlighted">Productivity</p>
        <img src={product} alt=""/>
    </div>

    <div className="product-review-section container">
        <p className="bold">Review</p>
            

TubeBuddy, an innovative browser extension designed to streamline and optimize YouTube content creation, has garnered immense popularity among content creators and marketers. With its array of time-saving features and data-driven functionalities, TubeBuddy has become an indispensable tool in the YouTube landscape. In this comprehensive review, we will explore the various aspects of TubeBuddy, including its Video SEO capabilities, in-depth analytics, time-saving bulk processing, competitor analysis, engagement tools, A/B testing, and customer support. By examining these features and their impact on content creation, we aim to shed light on how TubeBuddy has revolutionized YouTube channel management and success.

<p>Video SEO Made Simple:</p>
    

<p>TubeBuddy's greatest strength lies in its Video SEO tools, which have transformed the way content creators optimize their videos for search and discovery. Upon installing the extension, users are greeted with a powerful keyword research feature that enables them to identify high-traffic and relevant keywords for their content. The intuitive keyword analysis also presents insights into the competitiveness of these keywords, allowing creators to choose the most strategic terms for their target audience.
</p>
<p>Moreover, TubeBuddy empowers users to optimize their video titles, tags, and descriptions directly within the YouTube upload interface. The real-time suggestions and tag explorer functionality make the process efficient and effective, ensuring that videos are easily discoverable by the intended audience. Additionally, the extension provides an invaluable tool to track and manage video rankings, offering content creators greater visibility into their videos' performance on YouTube's search engine.
</p>
    </div>

<div className="alternatives">
    <div className="container" style={{width:"60%"}}>
    <h1 className="heading">Similar Products / Alternatives</h1>
    </div>
        {/* { similar ? (
  <SimilarList similar={similar}/> 
        ) :
        <Spinner/>
          } */}

{

loading ? <Spinner/> :
similar ? (
  <SimilarList similar={similar}/> 
):  
<Spinner/> 
   
}
</div>
</div>


<div className="product-review-section container">
    <p>In-Depth Analytics:</p>

<p>Understanding channel performance is pivotal for content creators seeking to refine their content strategy. TubeBuddy's analytics suite offers comprehensive insights into various performance metrics, including views, watch time, subscriber growth, audience demographics, and more. By utilizing these data-driven insights, content creators can make informed decisions about their content direction, allowing them to cater to their audience's preferences effectively.</p>

<p>The analytical tools also allow for historical data tracking, which is vital for identifying long-term trends and seasonal patterns in viewership. Creators can observe their channel's growth over time, aiding them in setting realistic goals and tracking progress towards milestones. TubeBuddy's analytics go beyond the basic YouTube Studio metrics, providing a more robust and detailed view of channel performance.</p>

<p>Time-Saving Bulk Processing:</p>

<p>Managing a YouTube channel often involves handling a significant number of videos, which can be time-consuming and repetitive. TubeBuddy's bulk processing tools come to the rescue, offering a range of actions that can be applied to multiple videos simultaneously. From updating video cards and annotations to changing privacy settings, these batch updates save creators valuable time, enabling them to focus on content creation and other aspects of channel growth.</p>

<p>Content creators with vast video libraries benefit greatly from these features, as they can efficiently maintain and optimize their entire content catalog without individually editing each video. This feature is especially valuable for seasoned creators and businesses with extensive video libraries.</p>

<p>Competitor Analysis:</p>

<p>Staying ahead of the competition is a constant challenge in the dynamic YouTube ecosystem. TubeBuddy's competitor analysis feature provides creators with an edge by offering insights into competitors' strategies, keywords, and video performance. This powerful tool allows users to identify popular keywords and trends that competitors are leveraging successfully, enabling them to tailor their content and maximize their reach.</p>

<p>Furthermore, the feature allows users to compare their own performance with that of their competitors, offering valuable benchmarks for improvement. By understanding the strengths and weaknesses of competitors, content creators can identify opportunities and refine their content to stand out in their niche.</p>

<p>Engagement and Promotion:</p>

<p>Building a loyal and engaged community is essential for the sustained growth of a YouTube channel. TubeBuddy facilitates this process through its suite of engagement and promotion tools. Creators can efficiently interact with their audience, respond to comments, and thank subscribers, fostering a stronger sense of connection and loyalty.</p>

<p>Additionally, the platform offers seamless integration with popular social media platforms, allowing creators to promote their videos and channel across multiple channels effortlessly. The ability to cross-promote content increases visibility and drives traffic to the channel, contributing to audience growth and video performance.</p>



</div>
<div className="pros-cons container">
    <p className="bold" style={{color:"#00A82D"}}>Positive</p>
    <p>The economy plan offered by GoDaddy.com provides essential services for most users, and is a great plan to start a website with. You will find it easy to access the basic package, as designed for everyone.The economy plan offered by GoDaddy.com provides essential services for most users, and is a great plan to start a website with. You will find it easy to access the basic package, as designed for everyone.</p>
    <p className="bold" style={{color:"#FF1818"}}>Negative</p>
    <p>The economy plan offered by GoDaddy.com provides essential services for most users, and is a great plan to start a website with. You will find it easy to access the basic package, as designed for everyone.The economy plan offered by GoDaddy.com provides essential services for most users, and is a great plan to start a website with. You will find it easy to access the basic package, as designed for everyone.</p>
    <p className="bold">Conclusion</p>
    <p>The economy plan offered by GoDaddy.com provides essential services for most users, and is a great plan to start a website with. You will find it easy to access the basic package, as designed for everyone.The economy plan offered by GoDaddy.com provides essential services for most users, and is a great plan to start a website with. You will find it easy to access the basic package, as designed for everyone.</p>
</div>
</>




  )
}

export default Product