import React from "react"
import { Link, graphql, useStaticQuery} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Index = ({ location }) => {

  const blogQuery = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allFile(
          filter: {internal: {mediaType: {eq: "text/markdown"}}, sourceInstanceName: {eq: "blog"}},
          sort: { fields: [childMarkdownRemark___frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              childMarkdownRemark {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  title
                  description
                }
              }
            }
          }
        }
      }
    `
  )

  const siteTitle = blogQuery.site.siteMetadata.title
  const posts = blogQuery.allFile.edges
    
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      
      {posts.map(({ node }) => {
        node = node.childMarkdownRemark;
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small style={{
                fontWeight: "900",
              }}>{node.frontmatter.date}</small>
            </header>
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
    </Layout>
  )
}

export default Index