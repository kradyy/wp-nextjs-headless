import React from "react";
import { getMenuByLocation, getMenuCTAButton } from "@/query/menus";
import { getSettings } from "@/query/wp";
import MenuWalker from "@/components/MenuWalker";
import Link from "next/link";

const Header = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <nav className="bg-blueDarker border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            {pageTitle}
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:flex md:w-auto menu-wrapper"
          id="navbar-default"
        >
          <MenuWalker
            location={process.env.NEXT_PUBLIC_WP_MENU_PRIMARY || ""}
            wrapper={(children: React.ReactElement[]) => (
              <ul className="font-medium flex flex-row p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 relative z-40">
                {children}
              </ul>
            )}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
