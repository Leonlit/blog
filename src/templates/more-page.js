import React from "react";
import {graphql, useStaticQuery} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";
import PageNavigation from "../components/pageNavigation";

const MorePages = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="More pages" description="More pages for the blog."/>
      <div>
        {posts.map(({ node }) => {
          return (
            <PostCard node={node} key={node.id}/>
          )
        })}
      </div>
      <PageNavigation number_of_page={pageContext.maxPage} thisPage={pageContext.currPage} />
    </Layout>
  )
}

export default MorePages;

export const blogQuery = graphql`
    query pages ($skipPage: Int!){
        site {
            ...SiteInformations
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 10
            skip: $skipPage
        ) {
            ...PostDetails
        }
    }
`
