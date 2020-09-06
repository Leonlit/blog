import React from "react"
import { useStaticQuery, Link, graphql} from "gatsby"

const Archive = () => {
    
    const data = useStaticQuery(
        graphql` query groupByDates{
             allMarkdownRemark{
                edges {
                    node {
                        frontmatter {
                            date(formatString: "MMM,YYYY")
                        }
                    }
                }
            }
        }`
    );
    let groups = {}
    let {edges} = data.allMarkdownRemark;
    edges.forEach(({node})=> {
        let date = node.frontmatter.date;
        if (groups[date]) {
            groups[date]++;
        }else {
            groups[date] = 1;
        }
    })
    groups = Object.keys(groups).map((key) => [key, groups[key]]);
    groups.reverse();
  return (
    <div>        
        {groups.map( (arr, index) => {
            let directory = arr[0].split(",");
            return (
                <Link key={index} 
                className="side_menu_links"
                activeStyle={{ backgroundColor: "#bfbfbf" }}
                partiallyActive={true}
                to={`/archive/${directory[1]}/${directory[0]}`}
                >{`${directory.join(", ")} (${arr[1]})`}</Link>
            )
        })}
    </div>
  )
}
export default Archive;