import React from "react"
import {graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";

const ArchivePageTemplate = ({ data, pageContext, location }) => {

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {archive} = pageContext;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Post posted in ${archive}`} description={`ALl the blog post posted on ${archive}`}/>
      <div>
        {posts.map(({ node }) => {
          let folder = "blog";
          if (node.frontmatter.postType === "project") {
            folder = "portfolio";
          }
          
          return (
            <PostCard node={node} locationPlaceholder={`../../../${folder}`}/>
          )
        })}
      </div>
    </Layout>
  )
}

export default ArchivePageTemplate

export const ArchiveTemplate = graphql`
  query BlogPostByArchive($archive: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {dateToken: {eq: $archive}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            dateToken
            date (formatString: "MMMM DD, YYYY")
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