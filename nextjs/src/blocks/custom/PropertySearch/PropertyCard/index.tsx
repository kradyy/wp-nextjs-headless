import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  if (!property) return null;

  const { bathrooms, bedrooms, hasParking, petFriendly } =
    property.propertyFeatures;

  return (
    <Link href={property.uri} className="p-4 bg-blue/10">
      <Image
        src={property?.featuredImage?.node?.sourceUrl}
        alt={property.title}
        width={200}
        height={200}
        className="w-full aspect-video mb-3"
      />
      <span className="text-2xl block font-bold my-1">{property.title}</span>
      <span className="text-2xl font-medium block">450$</span>

      <div className="flex flex-col">
        <span className="mr-2">Bathrooms: {bathrooms || 0}</span>
        <span className="mr-2">Bedrooms: {bedrooms || 0}</span>
        <span className="mr-2">Parking: {hasParking ? "Yes" : "No"}</span>
        <span className="mr-2">Pet Friendly: {petFriendly ? "Yes" : "No"}</span>
      </div>
    </Link>
  );
};

export default PropertyCard;
