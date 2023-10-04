"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import Results from "./Results";
import Pagination from "./Pagination";
import Filters from "./Filters";
import { filterHandler } from "./actions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";

interface PropertySearchProps {
  block: GutenbergBlock;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({ block }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [paginationArgs, setPaginationArgs] = useState({
    page: 0,
    size: 1,
    total: 0,
  });

  const [filterArgs, setFilterArgs] = useState({
    minPrice: 0,
    maxPrice: 0,
    hasParking: 0,
    petFriendly: 0,
  });

  // The SWR way
  const { data, error, isLoading } = useSWR(
    [
      "/api/search",
      paginationArgs.page,
      filterArgs.minPrice,
      filterArgs.maxPrice,
      filterArgs.hasParking,
      filterArgs.petFriendly,
    ],
    async (url) => {
      const searchParams = qs.parse(window.location.search);
      const params = {
        ...searchParams,
        size: paginationArgs.size,
        page: paginationArgs.page || 0,
      };

      // The server way
      const fetchedData = await filterHandler(params);

      // Re-set params due to server-action refreshing the page
      window.history.pushState({}, "", pathname + "?" + qs.stringify(params));

      // The API Way
      // const res = await fetch(`/api/search`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     page: parseInt(page || 1),
      //     minPrice: parseInt(minPrice || 0),
      //     maxPrice: parseInt(maxPrice || 999999),
      //     hasParking: !!hasParking,
      //     petFriendly: !!petFriendly,
      //     size: paginationArgs.size,
      //   }),
      // });
      // const fetchedData = await res.json();

      if (fetchedData?.pagination) {
        setPaginationArgs((prevArgs) => ({
          ...prevArgs,
          total: fetchedData?.pagination?.total,
        }));
      }

      return fetchedData;
    },
    {
      dedupingInterval: process.env.NEXT_PUBLIC_FETCH_CACHE_TIMEOUT as any,
      revalidateOnFocus: false,
    }
  );

  // Update filter args when query string changes
  useEffect(() => {
    const { page, minPrice, maxPrice, hasParking, petFriendly } = qs.parse(
      window.location.search
    );

    setFilterArgs({
      minPrice: Number(minPrice || 0),
      maxPrice: Number(maxPrice || 999999),
      hasParking: hasParking ? 1 : 0,
      petFriendly: petFriendly ? 1 : 0,
    });
  }, [paginationArgs.page]);

  // Handle filter form submit
  const onFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("form submitted");

    const formData = new FormData(e.currentTarget);
    const filterParams = Object.fromEntries(formData.entries());

    const newParams = {
      ...filterParams,
      ...(filterParams?.hasParking && {
        hasParking: filterParams.hasParking === "on",
      }),
      ...(filterParams?.petFriendly && {
        petFriendly: filterParams.petFriendly === "on",
      }),
    };

    const newQueryString = qs.stringify(newParams);

    setFilterArgs({
      minPrice: Number(filterParams.minPrice || 0),
      maxPrice: Number(filterParams.maxPrice || 999999),
      hasParking: filterParams.hasParking === "on" ? 1 : 0,
      petFriendly: filterParams.petFriendly === "on" ? 1 : 0,
    });

    window.history.pushState({}, "", pathname + "?" + newQueryString);
  };

  return (
    <>
      <Filters onFilter={onFilter} />
      {!isLoading ? (
        <Results properties={data?.properties} />
      ) : (
        <p>Loading..</p>
      )}
      {!isLoading && (
        <Pagination
          paginationArgs={paginationArgs}
          setPaginationArgs={setPaginationArgs}
        />
      )}
    </>
  );
};

export default PropertySearch;
