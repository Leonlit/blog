import React from "react"
import {Link, graphql, useStaticQuery} from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const Index = ({ location }) => {

  const blogQuery = useStaticQuery(
    graphql`
      query index{
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
  )

  const siteTitle = blogQuery.site.siteMetadata.title
  const posts = blogQuery.allMarkdownRemark.edges
    
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <div>
        {posts.map(({ node }) => {
          const slug = node.fields.slug;
          const title = node.frontmatter.title || slug
          return (
            <article className="card blog-card" key={slug}>
              <Img className="headerImg" fluid={node.frontmatter.thumbnail.childImageSharp.fluid}/>
              <header>
                <h3>
                  <Link style={{ boxShadow: `none` }} to={`../blog${slug}/.`}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
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

export default Index