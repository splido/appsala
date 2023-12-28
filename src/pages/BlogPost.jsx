import { useEffect, useState } from "react"
import { useParams } from 'react-router'
import {supabase} from '../config/supabase.js'
import author from '../assets/img/author.png'
function BlogPost() {
    const [article, setArticle] = useState([])
    const [body, setBody] = useState('')
    const{ slug } = useParams()
    useEffect(()=>{
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
                `).eq('status', 3).eq('publication_id', 2).eq('url', slug)
          if (error) {
          console.log(error);
          } else {
            setArticle(data);
            const parser = new DOMParser();
            const doc = parser.parseFromString(article[0]?.body, 'text/html');
            const plainText = doc.body.textContent || "";

            setBody(plainText);
          }
          }
          fetchData()
    })
  return (
    article &&    <>
    <section className="article-hero">

<div className="hero-nav">
 <p className="hero-nav-active">All</p>
 <p>Feature Updates</p>
 <p>Video Monestization</p>
 <p>Marketing</p>
 <p>Industry News</p>
 <p>Be Inspired</p>
 <input type="text" name="" id="" placeholder="Search"/>
</div>

<div className="image-title">
   <div className="title-div">
       <p className="title">{article[0]?.title}</p>
   </div>
   <img src={`https://res.cloudinary.com/creyo-com/image/upload/v1703682257/appsala/blog/${article[0]?.featured_image}`} alt="blog-img"/>
   <div className="flex article-info">
       <div className="author-info">
           <img  src={author} alt=""/>
           <div className="less-line">
             <p className="author-name">{article[0]?.authors.name}</p>
                 <p> {new Date(article[0]?.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
           </div>
       </div>
           <div className="less-line">
               <p className="blog-type">BE INSPIRED</p>
               <p>10 min read</p>
           </div> 
   </div>
  
</div>
</section>  
<section className="blog-content container">
<p>{body}</p>
</section>
   </>
  )
}

export default BlogPost