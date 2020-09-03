import React from "react"
import {Link} from "gatsby"

const Tags = ({tags}) => {
    return (
        <div className="tags_container">
            {
            tags.map ((tag, index) => {
                return (
                    <Link key={index}
                    className="tags"
                    to={`/category/${tag}`}
                    >#{tag}</Link>
                )
            })
            }
        </div>
    )
}
export default Tags;