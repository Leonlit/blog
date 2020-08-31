import React from "react";
import { Link } from "gatsby";

import { rhythm, scale } from "../utils/typography";
import {siteMetadata} from "../../gatsby-config";
import "./layout.css";
import RecentPost from "./recentPost";

const Layout = ({ title, children }) => {
  const pages = siteMetadata.menuLinks;
  let counter = 0;

  let header = (
      <h1
        style={{
          ...scale(1.1),
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
  return (
    <div
      style={{
        marginLeft: `5%`,
        maxWidth: "100%",
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    > 
      <div>
        <header>{header}</header>
      </div>
      <nav style={{
        marginBottom: "20px",
      }}>
        {pages.map(({name, link}) => {
          return (
            <Link key={counter++} to={link}>
                  {name}
            </Link>
          )
        })}
      </nav>
      <hr style={{
        marginBottom: "5%",
      }}/>
      <div id="container">
        <main>{children}</main>
        <aside>
          <h4 style={{marginBottom: "10px",}}>Recent Post</h4>
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