import React from "react"
import { useStaticQuery, Link, graphql} from "gatsby"

const Tags = () => {

    const data = useStaticQuery(
        graphql` query {
            allMarkdownRemark {
                distinct(field: frontmatter___categories)
            }
        }`
    );

    console.log(data.allMarkdownRemark);
    const {distinct} = data.allMarkdownRemark;
    console.log(distinct)
    return (
        <div className="tags_container">
            {
            distinct.map ((tag, index) => {
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