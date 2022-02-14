
import React from "react";
import {withPrefix, Link } from "gatsby";
import Helmet from "react-helmet"
import {graphql} from "gatsby";

import "../style/desktop.css";
import "../style/mobile.css";
import RecentPost from "./feature/recentPost";
import Archive from "./feature/archive";
import Tags from "./feature/tags";
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
    const open_nav = () => {
      let navbar = document.getElementById("navbar");
      navbar.removeAttribute("style")
    }
  return (
    <div className="blogContainer">
      <div>
        <header>
          <img alt="Blog's logo" src={withPrefix("blog-ico.png")} className="blogLogo"/>
          {header}
        </header>
      </div>
      <NavigationMenu/>
      <div id="nav_bg">
        <div id="nav-trigger" onClick={open_nav}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      
      <hr id="content_divider" style={{
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
          <h4 style={{marginTop:"50px",}}>Categories</h4>
          <hr/>
          <Tags/>
        </aside>
      </div>
      <Footer/>
      <Helmet>
        <script src={withPrefix('scripts.js')} type="text/javascript" />
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