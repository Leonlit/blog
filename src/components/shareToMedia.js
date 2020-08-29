import {FaTwitter, FaReddit, FaFacebook, FaLinkedin} from "react-icons/fa";
import {IconContext} from "react-icons"
import React from "react"
import PropTypes from "prop-types"

//const icon_url = [<FaTwitter/>, <FaReddit/>, <FaFacebook/>, <FaLinkedin/>]

const ShareToMedia = ({url, title, description}) => {
    const media_endpoint = [
        `https://twitter.com/intent/tweet?text=${title} ${url}`,
        `https://www.reddit.com/submit?url=${url}&title=${title}`,
        `https://www.facebook.com/sharer.php?u=${url}`,
        `https://www.linkedin.com/shareArticle?mini=true&url=${url.slice(0, url.length-1)}&title=${title}&summary=${description}&source=A_Somewhat_Minimally_Designed_Blog`,
    ]
    console.log(url, title, description);
    let counter = 0;
  return (
    <div>
        <IconContext.Provider value={{ style: {fontSize: '40px', color: "rgb(0, 123, 255)"}}}>
            <a key={counter++} href={media_endpoint[0]} target="_blank" rel="noreferrer" className="socialMedias">
                <FaTwitter />
            </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ style: {fontSize: '40px', color: "#FF4500"}}}>
            <a key={counter++} href={media_endpoint[1]} target="_blank" rel="noreferrer" className="socialMedias">
                <FaReddit />
            </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ style: {fontSize: '40px', color: "#4267B2"}}}>
            <a key={counter++} href={media_endpoint[2]} target="_blank" rel="noreferrer" className="socialMedias">
                <FaFacebook />
            </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ style: {fontSize: '40px', color: "#2867B2"}}}>
            <a key={counter++} href={media_endpoint[3]} target="_blank" rel="noreferrer" className="socialMedias">
                <FaLinkedin />
            </a>
        </IconContext.Provider>
    </div>
  )
}

ShareToMedia.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}
export default ShareToMedia;