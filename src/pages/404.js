import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Dead End</h1>
      <p>Sorry but it seems that you've reached an inevitable dead-end in this website</p>
      <p>Please make sure you followed the URL correctly and didn't mix up the location</p>
      <p>There's no treasure here so no need to start a treasure hunt here :D</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
