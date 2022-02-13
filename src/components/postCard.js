import React from "react"
import {Link} from "gatsby"
import Tags from "../components/feature/tags";
import Img from "gatsby-image";

const PostCard = ({node}) => {
    const slug = node.fields.slug;
    const title = node.frontmatter.title
    const tags = node.frontmatter.categories;

  return (
    <article className="card blog-card">
        {/* <Img className="headerImg" fluid={node.frontmatter.thumbnail.childImageSharp.fluid}/> */}
        <header>
        <h3>
            <Link style={{ boxShadow: `none` }} to={`/blog${slug}.`}>
            {title}
            </Link>
        </h3>
        <small>{node.frontmatter.date}</small>
        </header>
        {tags && <Tags tags={tags}/>}
        <hr/>
        <section>
        <p
            dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
            }}
        />
        </section>
    </article>
  )
}
export default PostCard;