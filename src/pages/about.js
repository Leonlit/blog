import React from "react"

import {siteMetadata} from "../../gatsby-config"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogAbout = ({ data, location }) => {
  const siteTitle = siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About Me" />
        <h2>About Me</h2>
          <p>
          Since this site is just for experimenting how Gatsby works. There's no need for an actual introduction. But for a brief introduction,
          I can only say I'm just another developer :D. I usually will work on my side projects when I have some free time. It's quite fun to goof 
          around and create something using a different kind of technology. Feel free to check out my Github profile&nbsp;
          <a target="_blank" href={`https://github.com/${siteMetadata.social.github}`} rel="noreferrer">here</a> or go to my portfolio page to get a 
          glance at what I've done.
          </p>
    </Layout>
  )
}

export default BlogAbout