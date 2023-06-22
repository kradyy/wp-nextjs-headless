import client from "@/client";
import { parseBlocks } from "@/utils/blocks/helpers";
import { assignMenuParents } from "@/utils/theme";
import { gql } from "@apollo/client";

export async function getMenus() {
    const { data } = await client.query({
      query: gql`
        query MenuQuery {
          menus {
          nodes {
            menuId
            locations
            name
            menuItems {
              nodes {
                id
                title
                target
                path
                parentId
                uri
                cssClasses
              }
            }
          }
        }
        }
      `,
    });

    const menus = data.menus.nodes.map((node) => ({
      id: node.menuId,
      location: node.locations,
      menuItems: assignMenuParents(node.menuItems.nodes),
    }))

    return menus;
  }
  
  export async function getMenuByLocation(location) {
    const menus = await getMenus();

    return menus.find((menu) => {
        return menu.location.includes(location.toUpperCase())
    })
  }