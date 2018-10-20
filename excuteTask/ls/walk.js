const fs = require("fs");
const path = require("path");
const { readdir } = require("./asyncUtil");

async function walk(dir) {
  dir = path.normalize(dir);

  let file_list = [];
  const files = await readdir(dir);

  for (let file of files) {
    const file_path = path.join(dir, file);
    if (fs.statSync(file_path).isDirectory()) {
      const sub_files = await walk(file_path);
      file_list = file_list.concat(sub_files);
    } else {
      file_list.push(file_path);
    }
  }

  return file_list;
}

module.exports = walk;
