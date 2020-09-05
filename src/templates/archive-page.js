import React from "react"
import { Link, graphql} from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Tags from "../components/feature/tags";

const ArchivePageTemplate = ({ data, pageContext, location }) => {

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {archive} = pageContext;
  console.log(siteTitle);
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`${archive} | ${siteTitle}`} description={`ALl post for #${archive}`}/>
      <div>
        {posts.map(({ node }) => {
          const slug = node.fields.slug;
          const title = node.frontmatter.title || slug
          const tags = node.frontmatter.categories;

          let folder = "blog";
          if (node.frontmatter.postType === "project") {
            folder = "portfolio";
          }

          return (
            <article className="card blog-card" key={slug}>
              <Img className="headerImg" fluid={node.frontmatter.thumbnail.childImageSharp.fluid}/>
              <header>
                <h3>
                  <Link style={{ boxShadow: `none` }} to={`../../${folder}${slug}/.`}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.fullFormat}</small>
              </header>
              {tags && <Tags tags={tags}/>}
              <hr/>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default ArchivePageTemplate

export const ArchiveTemplate = graphql`
  query BlogPostByArchive($archive: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {dateToken: {eq: $archive}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            dateToken
            date (formatString: "MMMM DD, YYYY")
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