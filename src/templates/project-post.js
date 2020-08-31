import React from "react"
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ShareToMedia from "../components/shareToMedia";
import { rhythm, scale } from "../utils/typography";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const {excerpt, html, frontmatter} = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const {title, description, date, thumbnail} = frontmatter;
  const { previous, next } = pageContext
  const postUrl = location.href;

  let pre_type = "";
  if (previous && previous.frontmatter.postType === "project") {
    pre_type = "portfolio";
  } else {
    pre_type = "blog";
  }

  let next_type = "";
  if (next && next.frontmatter.postType === "project") {
    next_type = "portfolio";
  } else {
    next_type = "blog";
  }


  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={title}
        description={ description || excerpt}
        url={postUrl}
      />
      <article>
        <header style={{
          marginBottom: "5%",
        }}>
          <h2
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
              backgroundImage: `url("${thumbnail}")`,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              ...scale(-1 / 9),
              display: `block`,
              marginTop: "10px",
              marginBottom: rhythm(1),
            }}
          >
            {date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      <ShareToMedia 
      url = {postUrl}
      title = {title}
      description = {description || excerpt}
      />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="post-navigation">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${pre_type}${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next_type}${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ProjectpostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
`
