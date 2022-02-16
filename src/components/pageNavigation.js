
import React from "react";
import {withPrefix, Link } from "gatsby";
import {graphql} from "gatsby";

import "../style/desktop.css";
import "../style/mobile.css";

const PageNavigation = ({ number_of_page, thisPage, directory}) => {
    let elements = Array.from({length: number_of_page}, (_, i) => i + 1);
    return (
        <div id="page_nav_menu">
            {
                elements.map(page => {
                    console.log(page)
                    let link = `/${directory}/${page}`;
                    return (
                        <div><Link to={link}>test</Link></div>
                    )
                })
            }
        </div>
    );
}

export default PageNavigation;