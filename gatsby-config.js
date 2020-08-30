module.exports = {
  siteMetadata: {
    title: `A Somewhat Minimally Designed Blog`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
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
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
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
