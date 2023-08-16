import client from "@/client";
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
                label
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
  }));

  return menus;
}

export async function getMenuByLocation(location: string | undefined) {
  if (!location) throw new Error("Provide location");

  const menus = await getMenus();

  return menus.find((menu: any) => {
    return menu.location.includes(location.toUpperCase());
  });
}

interface CTAButton {
  target: string;
  title: string;
  url: string;
}

export async function getMenuCTAButton(
  location: string | undefined
): Promise<CTAButton> {
  if (!location) throw new Error("Provide location");

  const MENU_QUERY = gql`
    query MenuQuery {
      menus {
        nodes {
          menuId
          locations
          menu_cta_btn {
            menuCtaBtn {
              target
              title
              url
            }
          }
        }
      }
    }
  `;

  const query = await client.query({
    query: MENU_QUERY,
  });

  const menu = query.data.menus.nodes.find((node) =>
    node.locations.includes(location.toUpperCase())
  );

  return menu
    ? {
        ...menu.menu_cta_btn.menuCtaBtn,
      }
    : false;
}
