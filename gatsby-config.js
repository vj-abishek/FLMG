module.exports = {
  siteMetadata: {
    title: `FLMG`,
    description: `Editor For Last Minute Guys (FLMG), Generated images or pdf from the text `,
    author: `@vj_abishek`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `For Last Minute Guys`,
        short_name: `FLMG`,
        start_url: `/`,
        background_color: `#FCA311`,
        theme_color: `#FCA311`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-theme-ui`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
