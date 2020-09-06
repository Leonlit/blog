import React from "react"
import { Link, graphql} from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Tags from "../components/feature/tags";

const CategoryPageTemplate = ({ data, pageContext, location }) => {

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const {category} = pageContext;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Blog post for #${category}`} description={`ALl post for #${category}`}/>
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
                <small>{node.frontmatter.date}</small>
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

export default CategoryPageTemplate

export const categoryTemplate = graphql`
  query BlogPostByCategory($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {categories: {in: [$category]}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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