import React from "react"
import { useStaticQuery, Link } from "gatsby"

const RecentPost = () => {
    const data = useStaticQuery(graphql`
    query{
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
  `)
    const {edges} = data.allMarkdownRemark
    let counter = 0;
    if (edges.length > 9) {
        edges.splice(9, edges.length - 9);
    }
  return (
    <div>
        {edges.map( ({node: post}) => {
            const {frontmatter: contents} = post;
            return (
                <Link key={counter++} 
                style={{
                    padding: "5px",
                    borderRadius: "5px",
                    boxShadow: "none",
                    display:"block",
                }}
                activeStyle={{ backgroundColor: "#bfbfbf" }}
                partiallyActive={true}
                to={post.fields.slug}
                >{contents.title}</Link>
            )
        })}
    </div>
  )
}
export default RecentPost;