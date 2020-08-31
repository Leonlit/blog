const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const projectPost = path.resolve(`./src/templates/project-post.js`)
  const blog = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                postType
              }
            }
          }
        }
      }
    `
  )

  if (blog.errors) {
    throw blog.errors
  }

  // Create blog posts pages.
  const posts = blog.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    let comType = blogPost;
    let folder = "blog";
    if (post.node.frontmatter.postType == "project") {
      comType = projectPost;
      folder = "portfolio";
    }
    createPage({
      path:`${folder}${post.node.fields.slug}`,
      component: comType,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode});
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
