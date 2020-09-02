import React from "react"
import {Link} from "gatsby"

import {siteMetadata} from "../../gatsby-config";

const Footer = () => {
    let counter = 0;
    const pages = siteMetadata.menuLinks;
  return (
        <nav className="footer_nav">
            {pages.map(({name, link}) => {
            return (
                <span key={counter++} className="footer_page_nav">
                <Link to={link}>
                        {name}
                </Link>
                </span>
            )
            })}
            <credits>
                © {new Date().getFullYear()} {siteMetadata.author.name}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
            </credits>
        </nav>
  )
}
export default Footer;