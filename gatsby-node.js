const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const categoryPage = path.resolve(`./src/templates/category-page.js`);
  const archivePage = path.resolve("./src/templates/archive-page.js");
  const morePage = path.resolve("./src/templates/more-page.js");
  const moreArchivePage = path.resolve("./src/templates/more-archive-page.js");
  const moreCategoriesPage = path.resolve("./src/templates/more-category-page.js");
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
            totalCount
          }
        }
        totalPosts: allMarkdownRemark {
          totalCount
        }
      }
    `
  );

  if (blog.errors) {
    throw blog.errors;
  }

  // Create blog posts pages.
  const posts = blog.data.posts.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    let folder = "/article";
    createPage({
      path: `${folder}${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  const postAvailable = blog.data.totalPosts.totalCount;
  if (postAvailable > 10) {
    // creating page for every pages for posts
    const page = Math.ceil(postAvailable / 10);
    for (let x = 1; x <= page; x++) {
      createPage({
        path: `/article/more/${x}`,
        component: morePage,
        context: {
          currPage: x,
          skipPage: (x - 1) * 10,
          maxPage: page,
          directory: "more",
        },
      });
    }
  }

  const categoriesFound = blog.data.categoriesGroup.group;
  if (categoriesFound.length > 0) {
    // creating page for every single catergory
    categoriesFound.forEach((item) => {
      const catePageAvailable = item.totalCount;
      if (catePageAvailable > 10) {
        // creating page for every pages for categories if its more
        const page = Math.ceil(catePageAvailable / 10);
        const dirPath = `/category/${item.fieldValue}/more/`;
        for (let x = 1; x <= page; x++) {
          createPage({
            path: `${dirPath}${x}`,
            component: moreCategoriesPage,
            context: {
              currPage: x,
              skipPage: (x - 1) * 10,
              maxPage: page,
              directory: dirPath,
              category: item.fieldValue,
            },
          });
        }
      }
      createPage({
        path: `/category/${item.fieldValue}`,
        component: categoryPage,
        context: {
          category: item.fieldValue,
          haveMorePage: catePageAvailable > 10
        },
      });
    });
  }

  //creating page for archive
  let archiveGroups = {};
  posts.forEach(({ node }) => {
    let date = node.frontmatter.date;
    if (archiveGroups[date] === undefined) {
      archiveGroups[date] = 1;
    }else {
      archiveGroups[date] += 1
    }
  });
  console.log(archiveGroups);
  Object.keys(archiveGroups).forEach((item) => {
    const archievePageAvailable = archiveGroups[item];
    let directory = item.split(",");
    createPage({
      path: `/archive/${directory[1]}/${directory[0]}`,
      component: archivePage,
      context: {
        haveMorePage: archievePageAvailable > 10,
        archive: item,
      },
    });
      if (archievePageAvailable > 10) {
        // creating page for every pages for categories if its more
        const page = Math.ceil(archievePageAvailable / 10);
        const dirPath = `/archive/${directory[1]}/${directory[0]}/more/`;
        for (let x = 1; x <= page; x++) {
          createPage({
            path: `${dirPath}${x}`,
            component: moreArchivePage,
            context: {
              archive: item,
              currPage: x,
              skipPage: (x - 1) * 10,
              maxPage: page,
              directory: dirPath,
            },
          });
        }
      }
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
