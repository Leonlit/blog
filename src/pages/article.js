import React from "react";
import {graphql, useStaticQuery} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";

const Article = ({ location }) => {
  const blogQuery = useStaticQuery(
    graphql`
      query article{
        site {
          ...SiteInformations
        }
        allMarkdownRemark(
          filter: {frontmatter: {postType: {eq: "blog"}}}
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 10
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
      <SEO title="Article" description="Articles page for the site"/>
      <div>
        {posts.map(({ node }) => {
          return (
            <PostCard node={node} key={node.id}/>
          )
        })}
      </div>
    </Layout>
  )
}

export default Article;