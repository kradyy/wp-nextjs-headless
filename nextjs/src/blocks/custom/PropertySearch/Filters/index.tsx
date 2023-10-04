import React, { useRef } from "react";
import Input from "@/components/elements/Input";
import qs from "query-string";

interface FiltersProps {
  onFilter: (form: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const { page, minPrice, maxPrice, hasParking, petFriendly } = qs.parse(
    window.location.search
  );

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
              <input
                type="checkbox"
                name="hasParking"
                defaultChecked={!!hasParking}
              />
              <span className="pl-2">has parking</span>
            </label>
          </div>
          <div>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                name="petFriendly"
                defaultChecked={!!petFriendly}
              />
              <span className="pl-2">pet friendly</span>
            </label>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <span>Min price</span>
          <Input
            type="number"
            name="minPrice"
            defaultValue={(minPrice as string) ?? ""}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <span>Max price</span>
          <Input
            type="number"
            name="maxPrice"
            defaultValue={(maxPrice as string) ?? ""}
          />
        </div>

        <input type="submit" className="btn bg-blue" value="Sök" />
      </form>
    </>
  );
};

export default Filters;
