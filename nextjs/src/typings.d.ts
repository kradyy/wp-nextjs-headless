type GutenbergBlock = {
  name: string;
  originalContent: string;
  attributes: array;
  innerBlocks: array;
  id: string;
};

type Property = {
  databaseId: number;
  featuredImage: {
    node: {
      uri: string;
      sourceUrl: string;
    };
  };
  propertyFeatures: {
    bathrooms: number;
    bedrooms: number;
    hasParking: boolean;
    petFriendly: boolean;
  };
  title: string;
  uri: string;
};

type PaginationArgs = {
  page: number;
  size: number;
  total: number;
};

type CTAButton = {
  target: string;
  title: string;
  url: string;
};

type PageProps = {
  slug: string[];
};
