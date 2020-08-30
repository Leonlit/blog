import React from "react"
import { Link, graphql, useStaticQuery} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"

const Index = ({ location }) => {

  const blogQuery = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(
          filter: {frontmatter: {postType: {eq: "blog"}}},
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
                thumbnail {
                  childImageSharp {
                    fluid(maxWidth: 1140, maxHeight: 1140) {
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
  )

  const siteTitle = blogQuery.site.siteMetadata.title
  const posts = blogQuery.allMarkdownRemark.edges
    
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      
      {posts.map(({ node }) => {
        const slug = node.fields.slug;
        const title = node.frontmatter.title || slug
        return (
          <article className="project-card" key={slug}>
            <Img className="headerImg" fluid={node.frontmatter.thumbnail.childImageSharp.fluid}/>
            <header className="project-header">
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
          </article>
        )
      })}
    </Layout>
  )
}

export default Index