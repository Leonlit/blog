import React from "react"
import { useStaticQuery, Link } from "gatsby"

const RecentPost = () => {
    const data = useStaticQuery(graphql`
    query{
        site {
            siteMetadata {
              title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                    }
                }
            }
        }
    }
  `)
    const {edges} = data.allMarkdownRemark
    if (edges.length >9) {
        edges.splice(9, edges.length - 9);
    }
  return (
    <div>
        {edges.map( ({node: post}) => {
            const {frontmatter: contents} = post;
            return (
                <div style={{
                    marginBottom: "15px",
                }}>
                    <Link 
                    style={{
                        padding: "5px",
                        borderRadius: "5px",
                        boxShadow: "none",
                    }}
                    activeStyle={{ backgroundColor: "#bfbfbf" }}
                    partiallyActive={true}
                    to={post.fields.slug}
                    >{contents.title}</Link>
                </div>
            )
        })}
    </div>
  )
}
export default RecentPost;