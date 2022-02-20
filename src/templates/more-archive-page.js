import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";
import PageNavigation from "../components/pageNavigation";

const MoreArchivePages = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  let title = `More posts published on ${pageContext.archive} - ${pageContext.currPage}`;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description="More pages for the Contents." />
      <PageNavigation
        number_of_page={pageContext.maxPage}
        thisPage={pageContext.currPage}
        directory={pageContext.directory}
      />
      <div>
        {posts.map(({ node }) => {
          return <PostCard node={node} key={node.id} />;
        })}
      </div>
      <PageNavigation
        number_of_page={pageContext.maxPage}
        thisPage={pageContext.currPage}
        directory={pageContext.directory}
      />
    </Layout>
  );
};

export default MoreArchivePages;

export const ArchiveTemplateMore = graphql`
  query BlogPostByArchiveMore($archive: String!, $skipPage: Int!) {
    site {
      ...SiteInformations
    }
    allMarkdownRemark(
      filter: { frontmatter: { dateToken: { eq: $archive } } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skipPage
      limit: 10
    ) {
      ...PostDetails
    }
  }
`;
