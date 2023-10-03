import Image from "next/image";
import React from "react";
import PropertyCard from "../PropertyCard";
import Pagination from "../Pagination";

interface ResultsProps {
  properties: Array<Property> | undefined;
  paginationArgs: PaginationArgs;
  setPaginationArgs: any;
}

const Results: React.FC<ResultsProps> = ({ properties }) => {
  return (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
        {properties &&
          properties.map((property) => {
            return (
              <PropertyCard key={property.databaseId} property={property} />
            );
          })}
      </div>
    </>
  );
};

export default Results;
