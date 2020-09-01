import {FaTimes, FaBars} from "react-icons/fa";
import React from "react";
import { Link } from "gatsby";

import {siteMetadata} from "../../gatsby-config";
import "./layout.css";
import RecentPost from "./recentPost";

const Layout = ({ title, children }) => {
  const pages = siteMetadata.menuLinks;
  let counter = 0;

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
    <div className="titleContainer"> 
      <div>
        <header>{header}</header>
      </div>
      <nav className="title_nav">
      <FaBars id="openNav" className="navLogo"/>
      <FaTimes id="closeNav" className="navLogo"/>
        {pages.map(({name, link}) => {
          return (
            <span>
              <Link key={counter++} to={link}>
                    {name}
              </Link>
            </span>
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