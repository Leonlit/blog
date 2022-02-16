import React from "react";
import {graphql, useStaticQuery} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";
import PageNavigation from "../components/pageNavigation";

const Index = ({ location }) => {
  const blogQuery = useStaticQuery(
    graphql`
      query index{
        site {
          ...SiteInformations
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 5
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
            <PostCard node={node} key={node.id}/>
          )
        })}
      </div>
      <PageNavigation number_of_page={3} currentPage={1} />
    </Layout>
  )
}

export default Index;