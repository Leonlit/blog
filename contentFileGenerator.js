const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

const questions = [
  {
    type: "text",
    name: "title",
    message: "What is title for the post?",
  },
  {
    type: "text",
    name: "description",
    message: "What is the description for the post?",
  },
  {
    type: "text",
    name: "categories",
    message:
      "Please input the categories for the post. (separated using comma)",
  },
  {
    type: "text",
    name: "thumbnail",
    message: "Please input the path to the thumbnail for the post.",
  },
  {
    type: "text",
    name: "thumbnail_attr",
    message: "Please input the attribute to the thumbnail of the post.",
  },
  {
    type: "text",
    name: "thumbnail_link",
    message: "Please input the link associated with the image.",
  },
];

createContentDirIfNotExists();
createPostDirectory();

function createContentDirIfNotExists() {
  var dir = "./content/article";

  if (!fs.existsSync(dir)) {
    console.log("Content directory not found, creating the folder...");
    fs.mkdirSync(dir, { recursive: true }, (err) => {
      if (err) throw err;
      else console.log('Created directory "Content"');
    });
  }
}

async function createPostDirectory() {
  const response = await prompts(questions);
  console.log("Creating new directory for the post...");
  const postDirName = response.title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .join("-");
  console.log("test");
  const sysDirname = path.resolve(__dirname, `content/article/${postDirName}`);
  if (!fs.existsSync(sysDirname)) {
    testCall = await fs.promises.mkdir(sysDirname);
    console.log(testCall);
    console.log('Created directory "Content"');
    createPostFile(
      path.resolve(__dirname, `content/article/${postDirName}`),
      response
    );
  }else {
      console.log("A directory with the same name found!!!");
  }
}
async function createPostFile(postDirName, response) {
  await fs.open(path.resolve(postDirName, "index.md"), "w", function (err) {
    if (err) throw err;
    console.log(`Created index.md file for the new post at ${postDirName}`);
    insertMetaDataToFile(postDirName, response);
  });
}

function insertMetaDataToFile(postDirName, responseJson) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const {
    title,
    description,
    categories,
    thumbnail,
    thumbnail_attr,
    thumbnail_link,
  } = responseJson;
  const dateObj = new Date();
  const datetime = dateObj.toISOString();
  const dateToken = `${monthNames[dateObj.getMonth()]},${dateObj.getFullYear()}`;
  let categoriesArr = categories.trim().split(",");
  categoriesArr = categoriesArr.map((ele) => {
    return ele.trim().split(" ").join("-");
  });
  const attr = [thumbnail_attr, thumbnail_link];

  let content = 
`---
title: "${title.replace(/"/g, '\\"')}"
date: "${datetime}"
dateToken: "${dateToken}"
description: "${description.replace(/"/g, '\\"')}"
categories: ${JSON.stringify(categoriesArr)}
thumbnail: "${thumbnail}"
thumbnail_attr: ${JSON.stringify(attr)}
---
    
    `;

  fs.writeFile(path.resolve(postDirName, "index.md"), content, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The index file was saved!");
  });
}
