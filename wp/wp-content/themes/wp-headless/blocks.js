const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { spawn } = require("child_process");

const wpScriptsPath = "./node_modules/.bin/wp-scripts";

// Function to build a single block
function buildBlock(block) {
  console.log(`Building block: ${block}`);
  execSync(
    `${wpScriptsPath} build ./views/blocks/${block}/src/index.js --output-path=./views/blocks/${block}/build`,
    { stdio: "inherit" }
  );
}

// Function to watch a single block
function watchBlock(block) {
  console.log(`Watching block: ${block}`);
  const child = spawn(
    wpScriptsPath,
    [
      "start",
      `./views/blocks/${block}/src/index.js`,
      "--output-path",
      `./views/blocks/${block}/build`,
      `--hot`, // Hot reload
    ],
    { stdio: "inherit" }
  );

  child.on("exit", function (code, signal) {
    console.log(
      `Child process for block ${block} exited with code ${code} and signal ${signal}`
    );
  });
}

// Main Function
function main() {
  const blocksFolder = "./views/blocks/";
  const command = process.argv[2]; // 'build' or 'watch'

  fs.readdir(blocksFolder, (err, folders) => {
    if (err) {
      console.error(`Could not list the directory: ${err}`);
      return;
    }

    folders.forEach((folder) => {
      const blockPath = path.join(blocksFolder, folder, "/src/index.js");
      if (fs.existsSync(blockPath)) {
        if (command === "build") {
          buildBlock(folder);
        } else if (command === "watch") {
          watchBlock(folder);
        }
      }
    });
  });
}

main();
