import {FaTwitter, FaReddit, FaFacebook, FaLinkedin} from "react-icons/fa";
import {IconContext} from "react-icons"
import React from "react"
import PropTypes from "prop-types"

const ShareToMedia = ({url, title, description}) => {
    const media_endpoint = [
        {
            link: `https://twitter.com/intent/tweet?text=${title} ${url}`,
            color: "rgb(0, 123, 255)",
            logo: <FaTwitter />,
        },
        {
            link:`https://www.reddit.com/submit?url=${url}&title=${title}`,
            color: "#FF4500",
            logo: <FaReddit />,
        },
        {
            link: `https://www.facebook.com/sharer.php?u=${url}`,
            color: "#4267B2",
            logo: <FaFacebook />,
        },
        {
            link: `https://www.linkedin.com/shareArticle?mini=true&url=${url.slice(0, url.length-1)}&title=${title}&summary=${description}&source=A_Somewhat_Minimally_Designed_Blog`,
            color: "#2867B2",
            logo: <FaLinkedin />,
        }
    ]
    let counter = 0;
  return (
    <div>
        {
            media_endpoint.map(media => {
                return (
                    <IconContext.Provider 
                        key={counter++} 
                        value={{ style: {fontSize: '40px', color: media.color}}}
                    >
                        <a 
                            href={media.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="socialMedias"
                        >
                            {media.logo}
                        </a>
                    </IconContext.Provider>
                )
            })
        }
    </div>
  )
}

ShareToMedia.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}
export default ShareToMedia;