type GutenbergBlock = {
  name: string;
  originalContent?: string;
  attributes: array;
  innerBlocks?: array;
  id: string;
  acfMeta?: any;
  title?: any;
};

type CTAButton = {
  target: string;
  title: string;
  url: string;
};

type PageProps = {
  slug: string[];
};
