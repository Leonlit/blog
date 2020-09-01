import React from "react"
import { Link, graphql, useStaticQuery} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const Portfollio = ({ location }) => {
  const portfolioQuery = useStaticQuery(
    graphql`
      query portfolio{
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(
          filter: {frontmatter: {postType: {eq: "project"}}},
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
                website
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

  const siteTitle = portfolioQuery.site.siteMetadata.title;
  const posts = portfolioQuery.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Portfolio" />
      <div className="flex">
        {posts.map(({ node }) => {
          const slug = node.fields.slug
          const title = node.frontmatter.title || slug;
          const {date, description, website} = node.frontmatter;
          return (
            <div className="card project-card" key={slug}>
              <Img className="headerImg" fluid={node.frontmatter.thumbnail.childImageSharp.fluid}/>
              <header>
                <h3>
                  <Link style={{ boxShadow: `none` }} to={`../portfolio${slug}/.`}>
                    {title}
                  </Link>
                </h3>
                <small>{date}</small>
                <div>
                  Website: <a href={`https://${website[1]}`} target="_blank" rel="noreferrer">{website[0]}</a>
                </div>
              </header>
              <hr/>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description || node.excerpt,
                  }}
                />
              </section>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Portfollio