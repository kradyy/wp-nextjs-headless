import React from "react";
import { getMetaFields } from "./actions";

interface PropertyFeaturesProps {
  block: GutenbergBlock;
  params: any;
}

export const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  block,
  params,
}) => {
  // Get params

  console.log(params);
  // Call the API

  return <>features</>;
};

export default PropertyFeatures;
