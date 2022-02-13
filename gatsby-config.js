module.exports = {
  pathPrefix: "/A_Somewhat_Minimally_Designed_Blog",
  siteMetadata: {
    title: `A Somewhat Minimally Designed Blog`,
    logo: "public/blog-ico.png",
    author: {
      name: `Leon Lit`,
      summary: `I'm Creating some fun side project.`,
    },
    description: `A blog for testing Gatsby.`,
    siteUrl: `https://github.com/Leonlit`,
    social: {
      twitter: {
        url: `https://twitter.com/leonlit`,
        name: `leonlit`
      },
      github: {
        url: `https://github.com/Leonlit`,
        name: `Leonlit`
      },
      linkedIn: {
        url: `https://www.linkedin.com/in/leon-lit-152480142/`,
        name: "leon-lit"
      },
      portfolio: {
        url: `https://leonlit.github.io/`,
        name: "leonlit"
      }
    },
    menuLinks : [
      {
        name: "Home",
        link: "/"
      },
      {
        name: "Portfolio",
        link: "/portfolio"
      },
      {
        name: "About Me",
        link: "/about"
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/portfolio`,
        name: `portfolio`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `A Somewhat Minimally Designed Blog`,
        short_name: `Minimally designed blog template`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/blog-ico.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
