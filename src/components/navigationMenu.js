import React from "react";
import {Link} from "gatsby";

import {siteMetadata} from "../../gatsby-config";

const NavigationMenu = () => {
    const pages = siteMetadata.menuLinks;
  return (
        <nav>
            {pages.map(({name, link}, index) => {
                let extra = "";
                if (index < pages.length -1) {
                    extra = "|";
                }
            return (
                <span key={++index} >
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