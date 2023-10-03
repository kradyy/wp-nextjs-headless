import React, { useRef } from "react";
import Input from "@/components/elements/Input";
import { formHandler } from "../action";
import useSWR from "swr";

interface FiltersProps {
  properties: Array<Property> | undefined;
  paginationArgs: PaginationArgs;
  setPaginationArgs: any;
  onFilter: (form: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ properties, onFilter }) => {
  return (
    <>
      <form
        // action={formHandler}
        className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-blue/20 border-2 p-5"
        onSubmit={(e) => onFilter(e)}
      >
        <div className="flex-1">
          <div>
            <label className="cursor-pointer">
              <input type="checkbox" name="hasParking" />
              <span className="pl-2">has parking</span>
            </label>
          </div>
          <div>
            <label className="cursor-pointer">
              <input type="checkbox" name="petFriendly" />
              <span className="pl-2">pet friendly</span>
            </label>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <span>Min price</span>
          <Input type="number" name="minPrice" />
        </div>
        <div className="flex-1 flex flex-col">
          <span>Max price</span>
          <Input type="number" name="maxPrice" />
        </div>

        <input type="submit" className="btn bg-blue" value="Sök" />
      </form>
    </>
  );
};

export default Filters;
