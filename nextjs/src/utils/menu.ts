import client from "@/client";
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

  const menu = query.data.menus.nodes.find((node: any) =>
    node.locations.includes(location.toUpperCase())
  );

  return menu
    ? {
        ...menu.menu_cta_btn.menuCtaBtn,
      }
    : false;
}

export async function getMenuByLocation(location: string | undefined) {
  if (!location) throw new Error("Provide location");

  const menus = await getMenus();

  return menus.find((menu: any) => {
    return menu.location.includes(location.toUpperCase());
  });
}

export const assignMenuParents = (menuItems: Array<any>) => {
  menuItems?.sort((a: any, b: any) => a.order - b.order);

  let menu: Array<any> = [...menuItems];

  const AssignParents = (items: any) => {
    items.forEach((item: any, index: number) => {
      if (!item?.children) {
        item.children = [];
      }

      if (!item.depth) {
        item.depth = 0;
      }

      // Assign children
      if (item?.parentId) {
        const findParent = menu.find(
          (parent: any) => parent?.id === item?.parentId
        );

        if (findParent) {
          findParent.children?.push(item);
          item.isAssigned = true;

          // Traverse up and cound how many parents are there
          const deph = (item: any, previousItemId?: any) => {
            if (previousItemId) {
              const nextParent = menu.find(
                (findParent: any) => findParent?.id === previousItemId
              );

              if (!nextParent) return;

              item.depth++;
              deph(item, nextParent?.parentId);
            }
          };

          deph(item, item?.parentId);
        }
      }
    });

    // Remove parents from menu
    menu = menu.filter(
      (menuItem: any) => !menuItem.hasOwnProperty("isAssigned")
    );
  };

  AssignParents(menu);

  menu = menu.filter((menuItem: any) => {
    console.log(menuItem.isAssigned);
    return menuItem?.isAssigned !== false;
  });

  return menu;
};
