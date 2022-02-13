const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const categoryPage = path.resolve(`./src/templates/category-page.js`);
  const archivePage = path.resolve("./src/templates/archive-page.js");
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
                date(formatString: "MMM,YYYY")
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
    let folder = "/article";
    if (post.node.frontmatter.postType == "project") {
      folder = "/portfolio";
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
        path: `/category/${item.fieldValue}`,
        component: categoryPage,
        context: {
          category: item.fieldValue,
        },
      })
    })
  }

  //creating page for archive
  let groups = []
  posts.forEach(({node})=> {
      let date = node.frontmatter.date;
      if (!groups.some((item)=>item === date)) {
          groups.push(date);
      }
  })
  groups.forEach((item) => {
    let directory = item.split(",");
    createPage({
      path: `/archive/${directory[1]}/${directory[0]}`,
      component: archivePage,
      context: {
        archive: item,
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