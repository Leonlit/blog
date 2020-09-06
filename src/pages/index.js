import React from "react";
import {graphql, useStaticQuery} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";

const Index = ({ location }) => {
  const blogQuery = useStaticQuery(
    graphql`
      query index{
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(
          filter: {frontmatter: {postType: {eq: "blog"}}}
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
  )

  const siteTitle = blogQuery.site.siteMetadata.title
  const posts = blogQuery.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" description="Home page for the template site"/>
      <div>
        {posts.map(({ node }, index) => {
          return (
            <PostCard postKey={index} node={node} locationPlaceholder="/blog" key={`post-${index}`}/>
          )
        })}
      </div>
    </Layout>
  )
}

export default Index