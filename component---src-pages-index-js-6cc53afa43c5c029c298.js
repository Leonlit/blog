"use strict";(self.webpackChunkleonlit_blog=self.webpackChunkleonlit_blog||[]).push([[678],{7628:function(e,t,n){var a=n(7294),l=n(1082);t.Z=function(e){var t=e.blogTags;return a.createElement("div",{className:"tags_container"},t.map((function(e,t){return a.createElement(l.Link,{key:t,className:"tags",to:"/category/"+e},e)})))}},5209:function(e,t,n){var a=n(7294),l=n(1082),r=n(7628);t.Z=function(e){var t=e.node,n=t.fields.slug,o=t.frontmatter.title,c=t.frontmatter.categories;return a.createElement("article",{className:"card blog-card"},a.createElement("header",null,a.createElement("h3",null,a.createElement(l.Link,{style:{boxShadow:"none"},to:"/article"+n+"."},o)),a.createElement("small",null,t.frontmatter.date)),c&&a.createElement(r.Z,{blogTags:c}),a.createElement("hr",null),a.createElement("section",null,a.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt}})))}},6558:function(e,t,n){n.r(t);var a=n(7294),l=n(1082),r=n(5843),o=n(9357),c=n(5209);t.default=function(e){var t=e.location,n=(0,l.useStaticQuery)("2331601150"),i=n.site.siteMetadata.title,m=n.allMarkdownRemark.edges;return a.createElement(r.Z,{location:t,title:i},a.createElement(o.Z,{title:"Home",description:"Leonlit's blog"}),a.createElement("div",null,m.map((function(e){var t=e.node;return a.createElement(c.Z,{node:t,key:t.id})})),n.allMarkdownRemark.totalCount>10&&a.createElement("div",{id:"show_more"},a.createElement(l.Link,{to:"article/more/1"},"more"))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-6cc53afa43c5c029c298.js.map