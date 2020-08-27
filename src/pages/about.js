import React from "react"

import {siteMetadata} from "../../gatsby-config"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogAbout = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About Me" />
        <h2>About Me</h2>
          <p>
          I'm a self-taught developer. I'm currently a Computer Science student majoring in Network Security in a local university in my country.
           I've built some side projects like weather web apps, web RSS Reader, android app for converting currency and many more. Feel free to view my
           GitHub profile <a target="_blank" href={`https://github.com/${siteMetadata.social.github}`} rel="noreferrer">here</a>. 
              <br/><br/>
              I usually will work on my side projects when I have some free time. It's quite fun to goof around and create something using a different
               kind of technology.
          </p>
    </Layout>
  )
}

export default BlogAbout