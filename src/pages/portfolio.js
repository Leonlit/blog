import React from "react"
import { Link, graphql, useStaticQuery} from "gatsby"

import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Portfollio = ({ location }) => {
  const portfolioQuery = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allFile(
          filter: {internal: {mediaType: {eq: "text/markdown"}}, sourceInstanceName: {eq: "portfolio"}},
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
                  thumbnail
                }
              }
            }
          }
        }
      }
    `
  )

  console.log(portfolioQuery);
  const siteTitle = portfolioQuery.site.siteMetadata.title;
  const posts = portfolioQuery.allFile.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Portfolio" />
      {posts.map(({ node }) => {
        node = node.childMarkdownRemark;
        const slug = node.fields.slug
        const title = node.frontmatter.title || 
        console.log(slug);
        console.log(`url("${node.frontmatter.thumbnail}")`);
        return (
          <div key={slug}>
            <header style={{
              backgroundImage: `url("${node.frontmatter.thumbnail}")`,
            }}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={slug}>
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
          </div>
        )
      })}
    </Layout>
  )
}

export default Portfollio