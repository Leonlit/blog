
import React from "react";
import {withPrefix, Link } from "gatsby";
import Helmet from "react-helmet"
import {graphql} from "gatsby";

import "../style/desktop.css";
import "../style/mobile.css";
import RecentPost from "./feature/recentPost";
import Archive from "./feature/archive";
import NavigationMenu from "./navigationMenu";
import Footer from "./footer";

const Layout = ({ title, children }) => {
  let header = (
      <h1 id="title">
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  return (
    <div className="blogContainer">
      <div>
        <header>
          <img alt="Blog's logo" src="/blog-ico.png" className="blogLogo"/>
          {header}
        </header>
      </div>
      <NavigationMenu/>
      <hr style={{
        marginBottom: "5%",
      }}/>
      <div id="container">
        <main>{children}</main>
        <aside>
          <h4 style={{marginBottom: "10px",}}>Recent Post</h4>
          <hr/>
          <RecentPost/>
          <h4 style={{marginTop:"50px",}}>Archive</h4>
          <hr/>
          <Archive/>
        </aside>
      </div>
      <Footer/>
      <Helmet>
        <script src={withPrefix('navigationMenu.js')} type="text/javascript" />
      </Helmet>
    </div>
  )
}

export default Layout

export const globalFragmentQuery = graphql`
  fragment SiteInformations on Site {
    siteMetadata {
      title
    }
  }
  fragment PostDetails on MarkdownRemarkConnection {
    edges {
      node {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          dateToken
          date (formatString: "MMMM DD, YYYY")
          title
          description
          postType
          categories
          website
          thumbnail_attr
          thumbnail {
            childImageSharp {
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;