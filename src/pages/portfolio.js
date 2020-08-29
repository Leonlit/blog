import React from "react"

import {siteMetadata} from "../../gatsby-config"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Portfollio = ({ data, location }) => {
  const siteTitle = siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Portfolio" />
        <h2>Portfolio</h2>
          <p>
          WIP
          </p>
    </Layout>
  )
}

export default Portfollio