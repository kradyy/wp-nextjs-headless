const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { spawn } = require("child_process");

const wpScriptsPath = path.resolve(
  __dirname,
  "../node_modules/.bin/wp-scripts"
);

// Function to build a single block
function buildBlock(block) {
  console.log(`Building block: ${block}`);
  const blockPath = path.resolve(`./src/blocks/${block}`);
  execSync(`${wpScriptsPath} build ./src/index.js --output-path=./build`, {
    stdio: "inherit",
    cwd: blockPath,
  });
}

// Function to watch a single block
function watchBlock(block) {
  console.log(`Watching block: ${block}`);
  const blockPath = path.resolve(`./src/blocks/${block}`);
  const child = spawn(
    wpScriptsPath,
    ["start", "./src/index.js", "--output-path", "./build"], // opt out "--hot" for compatibility with wp-scripts
    {
      stdio: "inherit",
      cwd: blockPath,
    }
  );
  child.on("exit", function (code, signal) {
    console.log(
      `Child process for block ${block} exited with code ${code} and signal ${signal}`
    );
  });
}

// Function to build gutenberg admin styles
function buildTailwind() {
  console.log("Building gutenberg admin styles...");
  execSync("npx tailwindcss build -i src/tailwind.css -o dist/admin.css", {
    stdio: "inherit",
  });
}

// Function to watch gutenberg admin styles
function watchTailwind() {
  console.log("Watching gutenberg admin styles...");
  const child = spawn(
    "npx",
    [
      "tailwindcss",
      "build",
      "-i",
      "src/tailwind.css",
      "-o",
      "dist/admin.css",
      "--watch",
      "--config=./../../../../shared/tailwind/tailwind.config.js",
    ],
    {
      stdio: "inherit",
    }
  );
}

// Main Function
function main() {
  const blocksFolder = "./src/blocks/";
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

    // Also build or watch gutenberg admin styles based on the command
    if (command === "build") {
      buildTailwind();
    } else if (command === "watch") {
      watchTailwind();
    }
  });
}

main();
