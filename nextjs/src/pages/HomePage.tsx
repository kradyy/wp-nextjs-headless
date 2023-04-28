"use client"

import React from 'react'
import { BlockRenderer } from "@/components/BlockRenderer";

interface HomePageProps {
  blocks: object[]
}

export const Home: React.FC<HomePageProps> = ({blocks}) => {
  console.log(blocks)
  return (
    <div>home tooo

      <BlockRenderer blocks={blocks} />
    </div>
  )
}

export default Home