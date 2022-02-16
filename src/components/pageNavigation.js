
import React from "react";
import {withPrefix, Link } from "gatsby";
import {graphql} from "gatsby";

import "../style/desktop.css";
import "../style/mobile.css";

const PageNavigation = ({ number_of_page, thisPage}) => {
    return (
        <div>{number_of_page}</div>
    );
}

export default PageNavigation;