import React from "react"
import {Link} from "gatsby"

const BlogPostTags = ({blogTags}) => {
    return (
        <div className="tags_container">
            {
            blogTags.map ((tag, index) => {
                return (
                    <Link key={index}
                    className="tags"
                    to={`/category/${tag}`}
                    >{tag}</Link>
                )
            })
            }
        </div>
    )
}
export default BlogPostTags;