import { getMenuCTAButton, getMenuByLocation } from "@/utils/menu";
import classNames from "classnames";
import Link from "next/link";
import Button from "../elements/Button";

interface MenuWalkerProps {
  location: string;
  wrapper: (children: React.ReactElement[]) => JSX.Element | undefined;
  linkClass?: string | undefined;
  subMenuLinkClass?: string | undefined;
}

const MenuWalker: React.FC<MenuWalkerProps> = async ({
  location,
  wrapper: Wrapper,
  linkClass,
  subMenuLinkClass,
}) => {
  const { menuItems, id: menuId } = await getMenuByLocation(location);

  // Get menu props..
  const ctaButton = await getMenuCTAButton(
    process.env.NEXT_PUBLIC_WP_MENU_PRIMARY
  );

  const mainLiClass = classNames("relative");
  const subLiClass = classNames("relative");

  const mainNavLinkClass = classNames({
    "relative block py-5 px-4 text-white bg-blue-700 rounded md:bg-transparent hover:bg-blueDarker":
      !linkClass,
  });

  const subMenuNavLinkClass = classNames({
    "relative block py-5 px-4 text-white bg-blue-700 rounded md:bg-transparent text-sm whitespace-nowrap":
      !subMenuLinkClass,
  });

  console.log(menuItems);
  const SubMenuWalker: React.FC<{ item: any; depth: number }> = ({
    item,
    depth,
  }) => {
    const submenuClass = classNames(
      `submenu bg-blueDarker w-auto absolute
            transition duration-150 ease-in-out origin-top-left
            min-w-32 w-100 depth-${depth}`,
      { "left-[100%]": depth > 0 },
      { "top-0": depth >= 1 },
      { "top-[100%]": depth === 0 }
    );

    return (
      <ul className={submenuClass}>
        {item.children.map((childItem: any) => {
          return (
            <li key={childItem.id} className={`${subLiClass} depth-${depth}`}>
              <Link href={childItem.uri} className={subMenuNavLinkClass}>
                {childItem.label}
              </Link>
              TODO: dynamic import
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

        {item.children?.length > 0 && <SubMenuWalker item={item} depth={0} />}
      </li>
    );
  });

  // Add CTA Button
  if (ctaButton) {
    menu.push(
      <li className="[&>a]:h-full">
        <Button destination={ctaButton?.url} label={ctaButton?.title} />
      </li>
    );
  }

  return Wrapper ? Wrapper(menu) : <ul>{menu}</ul>;
};

export default MenuWalker;
