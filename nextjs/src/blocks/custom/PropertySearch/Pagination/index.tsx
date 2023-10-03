import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import PropertyCard from "../PropertyCard";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface PaginationProps {
  paginationArgs: PaginationArgs;
  setPaginationArgs: any;
}

const Pagination: React.FC<PaginationProps> = ({
  paginationArgs,
  setPaginationArgs,
}) => {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();

  const searchQuery = window.location.search;

  const addQueryString = useCallback(
    (name: string, value: any) => {
      const params = new URLSearchParams(searchQuery);
      params.set(name, value);

      return params.toString();
    },
    [searchQuery]
  );

  const pages = Math.ceil(paginationArgs.total / paginationArgs.size) || 0;
  const currentPage = paginationArgs.page;

  const updatePath = (index: number) => {
    window.history.pushState(
      {},
      "",
      pathname + "?" + addQueryString("page", index)
    );

    if (index != currentPage) {
      changePage(index);
    }
  };

  const changePage = useCallback(
    (index: number) => {
      if (
        index === currentPage ||
        index * paginationArgs.size > paginationArgs.total
      )
        return;

      setPaginationArgs({
        ...paginationArgs,
        page: index,
      });
    },
    [setPaginationArgs, paginationArgs, currentPage]
  );

  if (!paginationArgs) return null;

  return (
    <>
      <div className="max-w-5xl mx-auto flex flex-row space-x-4">
        {new Array(pages).fill(0).map((number, index) => {
          const pageClass = classNames({
            "p-3 text-center bg-blue/10 w-10 hover:text-white hover:bg-blue duration-500 transition cursor-pointer":
              true,
            "!bg-blue text-white": currentPage === index,
          });

          return (
            <span
              key={index}
              className={pageClass}
              onClick={() => updatePath(index)}
            >
              {index + 1}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
