import React from "react"
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ShareToMedia from "../components/shareToMedia";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const {excerpt, html, frontmatter} = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const {title, description, date, thumbnail_attr} = frontmatter;
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
        <Img className="postThumbnail" fluid={frontmatter.thumbnail.childImageSharp.fluid}/>
        {thumbnail_attr && (
          <span style={{
            textAlign: "center",
            display: "block",
          }}>{frontmatter.thumbnail_attr[0]} from &nbsp;
            <a href={frontmatter.thumbnail_attr[1]}>
              {frontmatter.thumbnail_attr[1]}
            </a>
          </span>
        )}
        <header>
          <h2>{title}</h2>
          <p>{date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr/>
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
        <ul>
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
        thumbnail_attr
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
