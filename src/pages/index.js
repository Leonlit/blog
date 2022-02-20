import React from "react";
import {graphql, useStaticQuery, Link} from "gatsby";

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
          totalCount
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
        {blogQuery.allMarkdownRemark.totalCount > 10 && <div id="show_more"><Link to="article/more/1">more</Link></div>}
      </div>
    </Layout>
  )
}

export default Index;