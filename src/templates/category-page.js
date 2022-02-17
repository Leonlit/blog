import React from "react"
import {graphql, Link} from "gatsby";

import PostCard from "../components/postCard";
import Layout from "../components/layout";
import SEO from "../components/seo";


const CategoryPageTemplate = ({ data, pageContext, location }) => {

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {category, haveMorePage} = pageContext;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Blog post for #${category}`} description={`ALl post for #${category}`}/>
      <div>
        {posts.map(({ node }) => {
          return (
            <PostCard key={node.id} node={node} locationPlaceholder="../../" />
          )
        })}
        {haveMorePage === true && <div id="show_more"><Link to="more/1">more</Link></div>}
      </div>
    </Layout>
  )
}

export default CategoryPageTemplate

export const categoryTemplate = graphql`
  query BlogPostByCategory($category: String) {
    site {
      ...SiteInformations
    }
    allMarkdownRemark(
      limit: 10
      filter: {frontmatter: {categories: {in: [$category]}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...PostDetails
    }
  }
`