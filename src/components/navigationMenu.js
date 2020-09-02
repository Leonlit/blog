import React from "react"
import {Link} from "gatsby"

import {siteMetadata} from "../../gatsby-config";

const NavigationMenu = () => {
    let counter = 0;
    const pages = siteMetadata.menuLinks;
  return (
        <nav>
            {pages.map(({name, link}) => {
                let extra = ""
                if (counter < pages.length -1) {
                    extra = "|";
                }
            return (
                <span key={counter++} >
                <Link to={link}>
                        {name}
                </Link> {extra}&nbsp;
                </span>
            )
            })}
        </nav>
  )
}
export default NavigationMenu;