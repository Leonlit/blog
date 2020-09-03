import {FaTwitter, FaGithub, FaLinkedin} from "react-icons/fa";
import {IconContext} from "react-icons"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const SocialMedia = () => {
    const {site} = useStaticQuery(
        graphql`
          query SocialQuery {
            site {
              siteMetadata {
                social {
                  twitter {
                    url
                    name
                  }
                  github {
                    url
                    name
                  }
                  linkedIn {
                    url
                    name
                  }
                }
              }
            }
          }
        `
      )

    const {twitter, github, linkedIn} = site.siteMetadata.social;
    return (
        <div>
            <IconContext.Provider 
            key="twitter"
            value={{ style: {fontSize: '40px', color: "rgb(0, 123, 255)"}}}>
            <a 
                href={twitter.url} 
                target="_blank" 
                rel="noreferrer" 
                className="socialMedias"
            >
                <FaTwitter/>
            </a>
            </IconContext.Provider>
            <IconContext.Provider 
            key="github"
            value={{ style: {fontSize: '40px', color: "black"}}}>
            <a 
                href={github.url} 
                target="_blank" 
                rel="noreferrer" 
                className="socialMedias"
            >
                <FaGithub/>
            </a>
            </IconContext.Provider>
            <IconContext.Provider 
            key="linkedIn"
            value={{ style: {fontSize: '40px', color: "#4267B2"}}}>
            <a 
                href={linkedIn.url} 
                target="_blank" 
                rel="noreferrer" 
                className="socialMedias"
            >
                <FaLinkedin/>
            </a>
            </IconContext.Provider>
        </div>
    )
}
export default SocialMedia;