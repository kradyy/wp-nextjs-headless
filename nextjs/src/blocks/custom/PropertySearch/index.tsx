"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import Results from "./Results";
import Pagination from "./Pagination";
import Filters from "./Filters";
import qs from "query-string";
import { filterHandler } from "./action";

export const PropertySearch = ({ block }) => {
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
      const params = {
        ...qs.parse(window.location.search),
        size: paginationArgs.size,
        page: parseInt(paginationArgs.page || 0),
      };

      // The server way
      const fetchedData = await filterHandler(params);

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
    { dedupingInterval: process.env.NEXT_PUBLIC_FETCH_CACHE_TIMEOUT }
  );

  // Update filter args when query string changes
  useEffect(() => {
    const { page, minPrice, maxPrice, hasParking, petFriendly } = qs.parse(
      window.location.search
    );

    setFilterArgs({
      minPrice: parseInt(minPrice || 0),
      maxPrice: parseInt(maxPrice || 999999),
      hasParking: !!hasParking,
      petFriendly: !!petFriendly,
    });
  }, [paginationArgs.page]);

  // Action to take when filter form is submitted
  const onFilter = (e) => {
    e.preventDefault();

    // const params = qs.parse(window.location.search);

    const formData = new FormData(e.target);
    const filterParams = Object.fromEntries(formData.entries());

    const newParams = {
      ...filterParams,
    };

    const newQueryString = qs.stringify(newParams);

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${newQueryString}`
    );

    const { minPrice, maxPrice, hasParking, petFriendly } = newQueryString;

    setFilterArgs({
      minPrice: parseInt(minPrice || 0),
      maxPrice: parseInt(maxPrice || 999999),
      hasParking: !!hasParking,
      petFriendly: !!petFriendly,
    });
  };

  return (
    <>
      <Filters onFilter={onFilter} />
      <Results properties={data?.properties} />
      <Pagination
        paginationArgs={paginationArgs}
        setPaginationArgs={setPaginationArgs}
      />
    </>
  );
};

export default PropertySearch;
