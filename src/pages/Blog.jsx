import star from '../assets/img/star.png'
import blogImage from '../assets/img/blog-img.png'
import author from '../assets/img/author.png'
import monday from '../assets/img/monday.png'
import man from '../assets/img/man.png' 
import { useEffect, useState } from 'react'
import {supabase} from '../config/supabase.js'
function Blog() {
const [products, setProducts] = useState([])
const [articles, setArticles] = useState([])
  useEffect(()=>{
    const apiUrl = 'https://appsalabackend-p20y.onrender.com/products'
    // const fetchData = async() =>{
    //   const response = await fetch(apiUrl)
    //   var data = await response.json()
    //   const product_list =  data?.data?.slice(0,3)
    //   setProducts(product_list)
    // }
   
    //   fetchData()

    const fetchData =  async()=>{
      let { data, error } = await supabase
      .from('articles')
            .select(`
          *,
          articlestatus(*),
          authors(*),
          categories(*),
          post_type(*),
          publication(*)
          `).eq('status', 3).eq('publication_id', 2)
    if (error) {
    console.log(error);
    } else {
    setArticles(data);
    }
    }

    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const product_list =  data?.data?.slice(0,3)
      setProducts(product_list)
    });
    fetchData()
     
    },[] )
  return (
    <>
    
    <section className="blog-hero">
    <div className="container blog-hero-inner">
        <div >
            <div className="featured-blog">
                <img src={blogImage} alt="featured-blog" />
                <p className="blog-type">BE INSPIRED</p>
                <p className="blog-title">Your membership Won’t Last Without a Community 
            membership Won’t Last Without</p>
            <div className="author-info">
                <img src={author} alt=""/>
                <div>
                  <p className="author-name">Edem Metzler</p>
                  <div className="flex">
                      <p className="text-light">Sep 04 2023</p>
                      <p className="text-light time" >3 min read</p>
                  </div>
                </div>
                
            </div>
            </div>
        </div>
        <div className="top-reviews">
          <h1>Top App Reviews</h1>
          
          {  

          
            products.map((product, index)=>{
              return(
                <div className="blog-hero-card" key={index}>
                <div className="flex">
                <img src={product.logo} alt="card-img"/>
                <div className="star-name">
                  <h2 className="dark-text">{product.name}</h2>
                  <div className="stars flex">
                    <img src={star} alt="star"/>
                    <img src={star} alt="star"/>
                    <img src={star} alt="star"/>
                    <img src={star} alt="star"/>
                    <img src={star} alt="star"/>
                    <p>4/5</p>
                  </div>
                </div>
                </div>
                <p>{product.shortDescription.split(/\s+/).slice(0, 20).join(' ')}.....</p>
                </div>
              )
             
             
            })    
          }
          
           
        </div>
    </div>
</section>

<section className="articles container">
<h3 className="latest">Latest Articles</h3>
<div className="blogs-grid">
  
  {
    articles.map((article, index)=>{
      {
        console.log(article)
      }
      return(
        <div className="blog-card" key={index}>
        <img src={blogImage} alt="blog-img"/>
        <p className="blog-type">{article.post_type.name}</p>
        <p className="blog-title">{article.title}</p>
        <p className="blog-desc">{article.seo_description}</p>
        <div className="author-info">
            <img  src={author}alt=""/>
            <div><p className="author-name">Edem Metzler</p>
              <div className="flex"><p className="text-light">
  {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
</p>
                  <p className="text-light time">3 min read</p>
              </div>
            </div>
            
        </div>
        </div>
      )
    })
  }
   
  
</div>
<div className="bar">
          <h1>Can't Find a Review You are Looking For?</h1>
          <img src={man} alt="" />
          <div>
            <span>
            <p>
            Our team is willing and ready to do it in a short notice. Just submit the website URL,
             and we will be upto the task in no time!
            </p>
            <button className="button-light" 
            style={{height: '30px', width: '120px', padding: '5px'}}
            >Register Now</button>
            </span>
          </div>
        </div>
        <div className="blogs-grid">
  <div className="blog-card">
    <img src={blogImage} alt="blog-img"/>
    <p className="blog-type">BE INSPIRED</p>
    <p className="blog-title">Your membership Won’t Last Without a Community 
membership Won’t Last Without</p>
<p className="blog-desc">Learn the basics of the OTT business model, with examples
   and tips for launching your own OTT app as a video creator.</p>
<div className="author-info">
    <img src={author} alt=""/>
    <div>
      <p className="author-name">Edem Metzler</p>
      <div className="flex">
          <p className="text-light">Sep 04 2023</p>
          <p className="text-light time">3 min read</p>
      </div>
    </div>
    
</div>
</div>
  <div className="blog-card">
    <img src={blogImage} alt="blog-img"/>
    <p className="blog-type">BE INSPIRED</p>
    <p className="blog-title">Your membership Won’t Last Without a Community 
membership Won’t Last Without</p>
<p className="blog-desc">Learn the basics of the OTT business model, with examples
   and tips for launching your own OTT app as a video creator.</p>
<div className="author-info">
    <img src={author} alt=""/>
    <div>
      <p className="author-name">Edem Metzler</p>
      <div className="flex">
          <p className="text-light">Sep 04 2023</p>
          <p className="text-light time">3 min read</p>
      </div>
    </div>
    
</div>
</div>
  <div className="blog-card">
    <img src={blogImage} alt="blog-img"/>
    <p className="blog-type">BE INSPIRED</p>
    <p className="blog-title">Your membership Won’t Last Without a Community 
membership Won’t Last Without</p>
<p className="blog-desc">Learn the basics of the OTT business model, with examples
   and tips for launching your own OTT app as a video creator.</p>
<div className="author-info">
    <img src={author} alt=""/>
    <div>
      <p className="author-name">Edem Metzler</p>
      <div className="flex">
          <p className="text-light">Sep 04 2023</p>
          <p className="text-light time" >3 min read</p>
      </div>
    </div>
    
</div>
</div>
</div>

<div className="blogs-grid">
  <div className="blog-card">
    <img src={blogImage} alt="blog-img"/>
    <p className="blog-type">BE INSPIRED</p>
    <p className="blog-title">Your membership Won’t Last Without a Community 
membership Won’t Last Without</p>
<p className="blog-desc">Learn the basics of the OTT business model, with examples
   and tips for launching your own OTT app as a video creator.</p>
<div className="author-info">
    <img src={author} alt=""/>
    <div>
      <p className="author-name">Edem Metzler</p>
      <div className="flex">
          <p className="text-light">Sep 04 2023</p>
          <p className="text-light time">3 min read</p>
      </div>
    </div>
    
</div>
</div>
  <div className="blog-card">
    <img src={blogImage} alt="blog-img"/>
    <p className="blog-type">BE INSPIRED</p>
    <p className="blog-title">Your membership Won’t Last Without a Community 
membership Won’t Last Without</p>
<p className="blog-desc">Learn the basics of the OTT business model, with examples
   and tips for launching your own OTT app as a video creator.</p>
<div className="author-info">
    <img src={author} alt=""/>
    <div>
      <p className="author-name">Edem Metzler</p>
      <div className="flex">
          <p className="text-light">Sep 04 2023</p>
          <p className="text-light time">3 min read</p>
      </div>
    </div>
    
</div>
</div>
  <div className="blog-card">
    <img src={blogImage} alt="blog-img"/>
    <p className="blog-type">BE INSPIRED</p>
    <p className="blog-title">Your membership Won’t Last Without a Community 
membership Won’t Last Without</p>
<p className="blog-desc">Learn the basics of the OTT business model, with examples
   and tips for launching your own OTT app as a video creator.</p>
<div className="author-info">
    <img src={author} alt=""/>
    <div>
      <p className="author-name">Edem Metzler</p>
      <div className="flex">
          <p className="text-light">Sep 04 2023</p>
          <p className="text-light time" >3 min read</p>
      </div>
    </div>
    
</div>
</div>
</div>

<div className="navigator">
  <p>{'<<'}</p>
  <p>{'<'}
  </p>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
  <p>5</p>
  <p className="selected-navigator">6</p>
  <p>7</p>
  <p>8</p>
  <p>9</p>
  <p>10</p>
  <p>{'>'}</p>
  <p>{'>>'}</p>
</div>
</section>
    
    </>
  )
}

export default Blog 