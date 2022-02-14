import React from "react";
import {Link} from "gatsby";

import {siteMetadata} from "../../gatsby-config";

function close_nav() {
    let navbar = document.getElementById("navbar");
    navbar.style.left = "-100%";
}

const NavigationMenu = () => {
    const pages = siteMetadata.menuLinks;
  return (
        <nav id="navbar">
            <div id="close_nav_btn" onClick={close_nav}>X</div>
            <div>
                {pages.map(({name, link}, index) => {
                return (
                    <span key={++index} >
                    <Link to={link}>
                            {name}
                    </Link>&nbsp;
                    </span>
                )
                })}
            </div>
            
        </nav>
  )

  
}
export default NavigationMenu;