import { getMenuByLocation } from "@/query/menus";
import classNames from "classnames";
import Link from "next/link";

interface MenuWalkerProps {
    location: string;
    wrapper: (children: React.ReactElement[]) => JSX.Element | undefined;
    linkClass?: string | undefined;
    subMenuLinkClass?: string | undefined;
}

const MenuWalker: React.FC<MenuWalkerProps> = async ({location, wrapper: Wrapper, linkClass, subMenuLinkClass}) => {
  const { menuItems } = await getMenuByLocation(location)

    const mainLiClass = classNames(
        "relative"
    )

    const subLiClass = classNames(
        "relative"
    )

    const mainNavLinkClass = classNames(
        {"relative block py-5 px-4 text-white bg-blue-700 rounded md:bg-transparent hover:bg-blueDarker": !linkClass}
    );

    const subMenuNavLinkClass = classNames(
        {"relative block py-5 px-4 text-white bg-blue-700 rounded md:bg-transparent text-sm whitespace-nowrap": !subMenuLinkClass}
    );
    
    const SubMenuWalker: React.FC<{ item: any, depth: number }> = ({ item, depth }) => {
        const submenuClass = classNames(
            `submenu w-auto bg-blueDarker w-full absolute absolute top-[100%]
            transition duration-150 ease-in-out origin-top-left
            min-w-32 w-100 depth-${depth}`,
            {"left-[100%]": depth > 0},
            {"top-0": depth >= 1}
        );

      return (
        <ul className={submenuClass}>
          {item.children.map((childItem: any) => {
            return (
              <li key={childItem.id} className={`${subLiClass} depth-${depth}`}>
                <Link href={childItem.uri} className={subMenuNavLinkClass}>
                  {childItem.label}
                </Link>
    
                {childItem?.children?.length > 0 && (
                  <SubMenuWalker item={childItem} depth={depth + 1} />
                )}
              </li>
            );
          })}
        </ul>
      );
    };

    const menu = menuItems?.map((item: any) => {
        return (
          <li key={item.id} className={mainLiClass}>
            <Link href={item.uri} className={mainNavLinkClass}>
                {item.label}
            </Link>
            
            {item.children?.length > 0 && (<SubMenuWalker item={item} depth={0} />)}
          </li>
        );
      });
    
    return Wrapper ? Wrapper(menu) : <ul>{menu}</ul>;
}

export default MenuWalker