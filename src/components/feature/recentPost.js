import React from "react"
import { useStaticQuery, Link, graphql} from "gatsby"

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
                        postType
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
            let folder = "blog";
            if (contents.postType === "project") {
                folder = "portfolio"
            }
            return (
                <Link key={counter++} 
                className="side_menu_links"
                activeStyle={{ backgroundColor: "#bfbfbf" }}
                partiallyActive={true}
                to={`/${folder}${post.fields.slug}`}
                >{contents.title}</Link>
            )
        })}
    </div>
  )
}
export default RecentPost;