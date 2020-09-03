const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const categoryPage = path.resolve(`./src/templates/category-page.js`);
  const blog = await graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                postType
                categories
              }
            }
          }
        }
        categoriesGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `
  )

  if (blog.errors) {
    throw blog.errors
  }

  // Create blog posts pages.
  const posts = blog.data.posts.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    let folder = "blog";
    if (post.node.frontmatter.postType == "project") {
      folder = "portfolio";
    }
    createPage({
      path:`${folder}${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  const categoriesFound = blog.data.categoriesGroup.group;
  if (categoriesFound.length > 0) {
    // creating page for every single catergory
    categoriesFound.forEach(item => {
      createPage({
        path: `category/${item.fieldValue}`,
        component: categoryPage,
        context: {
          category: item.fieldValue,
        },
      })
    })
  }
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