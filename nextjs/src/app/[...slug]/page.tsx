export const dynamicParams = true

import { gql } from "@apollo/client";
import client from "@/client";
import { GetStaticProps } from "next";
import useSWR from 'swr'
import { BlockParser } from "@/utils/blocks/helpers";
import { BlockRenderer } from "@/components/BlockRenderer";

type PageProps = {
    slug: string[];
};

export default async function Page ( { params }: { params: PageProps } ) {
   const { title, blocks } = await fetchPage(params);

   console.log(title)
   console.log(blocks)

  return (
    <>
      <div>{title}</div>
      <BlockRenderer blocks={blocks} />
    </>
  
  );
}

const fetchPage = async (params: PageProps) => {
    const slug = params.slug.flat().toString();

    const { data } = await client.query({
        query: gql`
        query NewQuery($slug: String!) {
              pageBy(uri: $slug) {
                  id
                  title
                  blocks
              }
          }
        `,
        variables: {
          slug: `/${slug}`, // Prepend with "/" if needed
        },
    });

    return {
      title: data.pageBy.title,
      blocks: BlockParser(data.pageBy.blocks),
    };
}

export async function generateStaticParams() {
    const { paths } = await getAllPages();

    return paths.map((path: any) => ({
        slug: path.params.slug
    }))
}

export async function getAllPages() {
  const { data } = await client.query({
    query: gql`
      query AllPages {
        pages {
          nodes {
            uri
          }
        }
      }
    `,
  });

  let pages = data.pages.nodes;

  return {
    paths: pages.map((page: any) => ({
      params: {
        slug: page.uri.split("/").filter((item) => item !== ""),
      },
    })),
  };
}

// type TypeTest = {
//   name: string;
//   count: number;
// }

 // Nextjs12
// export const getStaticProps1: GetStaticProps<{
//   xb: TypeTest;
// }> = async () => {
//   const res = await fetch('');
//   const xb = await res.json();
//   return { props: { xb } };
// };


// export const getStaticProps: GetStaticProps<{
//   df: TypeTest;
// }> = async () => {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const df = await res.json()
  
//   return {
//     props: { df },
//   }
// }