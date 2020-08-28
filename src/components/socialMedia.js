import {FaTwitter, FaReddit, FaFacebook, FaGooglePlus,
         FaEnvelope, FaLinkedin} from "react-icons/fa";
import {ShareButtonRectangle} from "react-custom-share";

const ShareToMedia = {
  url: "https://localhost:8000/",
  button: ShareButtonRectangle,
  buttons: [
    { network: "Twitter", icon: FaTwitter },
    { network: "Reddit", icon: FaReddit },
    { network: "Facebook", icon: FaFacebook },
    { network: "GooglePlus", icon: FaGooglePlus },
    { network: "Email", icon: FaEnvelope },
    { network: "Linkedin", icon: FaLinkedin }
  ],
  text: `Give it a try - mywebsite.com `,
  longtext: `Take a look at this super website I have just found.`
}

export default  ShareToMedia;