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
          ...SiteInformations
        }
        allMarkdownRemark(
          filter: {frontmatter: {postType: {eq: "blog"}}}
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          ...PostDetails
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
        {posts.map(({ node }) => {
          return (
            <PostCard node={node} locationPlaceholder="/blog" key={node.id}/>
          )
        })}
      </div>
    </Layout>
  )
}

export default Index;