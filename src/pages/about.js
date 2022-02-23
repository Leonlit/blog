import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SocialMedia from "../components/feature/socialMedia"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogAbout = ({ location }) => {
  const data = useStaticQuery(
    graphql`
      query MediaQuery {
        site {
          siteMetadata {
            title
            author {
              name
              summary
            }
          }
        }
      }
    `
  )

  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About Me" description="A little self introduction"/>
        <h2>About Me</h2>
          <p>
          I'm currently a final year student at my local University. I'm majoring in network security for my studies. During my journey in learning programming and cyber security, I created some web and desktop applications and terminal tools to help me solve some of the problems I encountered. Some of them are featured here, but most of them can be found on my Github profile.
  
Currently, I'm working on my final year project for my degree. The project involves securing a network using various network security software and tools.

    On the red teaming side, I'm currently sharpening my craft in TryHackMe to learn Ethical Hacking and how malware works by reading the Practical Malware Analysis book.
          
    my full portfolio can be found in my <a target="_blank" href="https://leonlit.github.io/"  rel="noreferrer">porfolio website</a>&nbsp;&nbsp;
          </p>
          <SocialMedia/>
    </Layout>
  )
}

export default BlogAbout