import React from "react"
import { graphql} from "gatsby";

import PostCard from "../components/postCard";
import Layout from "../components/layout";
import SEO from "../components/seo";


const CategoryPageTemplate = ({ data, pageContext, location }) => {

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {category} = pageContext;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Blog post for #${category}`} description={`ALl post for #${category}`}/>
      <div>
        {posts.map(({ node }) => {
          return (
            <PostCard node={node} locationPlaceholder="../../"/>
          )
        })}
      </div>
    </Layout>
  )
}

export default CategoryPageTemplate

export const categoryTemplate = graphql`
  query BlogPostByCategory($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {categories: {in: [$category]}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
            postType
            categories
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1140, maxHeight: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`