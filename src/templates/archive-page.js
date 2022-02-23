import React from "react"
import {graphql, Link} from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import PostCard from "../components/postCard";

const ArchivePageTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {archive, haveMorePage} = pageContext;
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={`Post posted in ${archive}`} description={`ALl the blog post posted on ${archive}`}/>
      <div>
        {posts.map(({ node }) => {
          let folder = "article";         
          return (
            <PostCard key={node.id} node={node} locationPlaceholder={`../../../${folder}`}/>
          )
        })}
        {haveMorePage === true && <div id="show_more"><Link to="more/1">more</Link></div>}
      </div>
    </Layout>
  )
}

export default ArchivePageTemplate

export const ArchiveTemplate = graphql`
  query BlogPostByArchive($archive: String) {
    site {
      ...SiteInformations
    }
    allMarkdownRemark(
      limit: 10
      filter: {frontmatter: {dateToken: {eq: $archive}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...PostDetails
    }
  }
`