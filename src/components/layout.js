import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import {siteMetadata} from "../../gatsby-config"
import "./layout.css"
import RecentPost from "./recentPost"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const pages = siteMetadata.menuLinks;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
          id="title"
          >
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
  } else {
    header = (
      <h2
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
        id="title"
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h2>
    )
  }
  return (
    <div
      style={{
        marginLeft: `5%`,
        maxWidth: "100%",
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <nav>
        {pages.map(({name, link}) => {
          return (
            <Link to={link}>
                  {name}
            </Link>
          )
        })}
      </nav>
      <hr/>
      <div id="container">
        <main>{children}</main>
        <aside>
          <h4>Recent Post</h4>
          <hr/>
          <RecentPost/>
        </aside>
      </div>

      <footer>
        © {new Date().getFullYear()} {siteMetadata.author.name}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
    
  )
}

export default Layout