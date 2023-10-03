import React from "react";
import { getMetaFields } from "./actions";

interface PropertyFeaturesProps {
  block: GutenbergBlock;
  pageInfo: any;
}

export const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  block,
  pageInfo,
}) => {
  // Get params
  const {
    acfMeta: { propertyFeatures },
  } = pageInfo;

  return (
    <>
      {propertyFeatures &&
        Object.entries(propertyFeatures).map(([key, field]: any) => {
          return (
            <div key={field.id}>
              {key}: {field}
            </div>
          );
        })}
    </>
  );
};

export default PropertyFeatures;
