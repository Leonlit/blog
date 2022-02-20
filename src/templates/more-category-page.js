import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";
import PageNavigation from "../components/pageNavigation";

const MoreCategoriesPages = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  let title = `More posts of ${pageContext.category} - ${pageContext.currPage}`;
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

export default MoreCategoriesPages;

export const categoryTemplateMore = graphql`
  query BlogPostByCategoryMore($category: String!, $skipPage: Int!) {
    site {
      ...SiteInformations
    }
    allMarkdownRemark(
      filter: { frontmatter: { categories: { in: [$category] } } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skipPage
      limit: 10
    ) {
      ...PostDetails
    }
  }
`;
