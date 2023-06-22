import { getMenuByLocation } from "@/query/menus";

interface MenuWalkerProps {
    location: string;
    wrapper: (children: any) => JSX.Element | undefined;
    linkClass: string | undefined;
}   

const MenuWalker: React.FC<MenuWalkerProps> = async ({location, wrapper, linkClass}) => {
    const { menuItems } = await getMenuByLocation(location)


    console.log(menuItems)


    const menu = menuItems?.map((item: any) => {
        const hasChildren = item?.child_items?.nodes?.length > 0

        console.log(item.children)
    })

    return <strong>Meny</strong>

    //return wrapper ? wrapper(menu) : menu;
}

export default MenuWalker