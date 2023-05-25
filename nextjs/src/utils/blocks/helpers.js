import { v4 as uuid } from "uuid";

// Add a uniquie ID prop to the passed blocks
export const BlockParser = (blocks) => {
  // Clean the block since its coming as immutable from GraphQL
  blocks = JSON.parse(JSON.stringify(blocks));

  let copiedBlocks = [...blocks];

  const AssignId = (b) => {
    b.forEach((block) => {
      if (block.innerBlocks?.length) {
        AssignId(block.innerBlocks);
      }

      if (!block.id) {
        block.id = uuid();
      }
    });
  };

  AssignId(copiedBlocks);

  return blocks;
};
