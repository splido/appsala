import author from '../assets/img/author.png'
import { Link } from 'react-router-dom'

const BlogCard = ({blog}) => {
  return (
    <div className="blog-card">
    <Link to={`/blog/${blog.url}`}>
<img src={`https://res.cloudinary.com/creyo-com/image/upload/v1703682257/appsala/blog/${blog.featured_image}`} alt="blog-img"/></Link>
<p className="blog-type">{blog.post_type.name}</p>
<p className="blog-title">{blog.title}</p>
<p className="blog-desc">{blog.seo_description}</p>
<div className="author-info">
    <img  src={author}alt=""/>
    <div><p className="author-name">{blog.authors.name}</p>
      <div className="flex"><p className="text-light">
{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
</p>
          <p className="text-light time">3 min read</p>
      </div>
    </div>
    
</div>
</div>
  )
}

export default BlogCard