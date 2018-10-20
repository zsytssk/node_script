// 从一个文件夹复制文件到另外文件夹
let fs = require("fs");
let path = require("path");
const { exists, mkdir } = require("./asyncUtil");

async function createPath(dir_path) {
  const is_exists = await exists(dir_path);

  if (is_exists) {
    return true;
  }

  dir_path = path.normalize(dir_path);
  let path_arr = dir_path.split(path.sep);
  for (let i = 0; i < path_arr.length; i++) {
    if (!path_arr[i]) {
      continue;
    }
    let cur_dir = path_arr.slice(0, i + 1).join(path.sep);

    const is_exists = await exists(cur_dir);
    if (!is_exists) {
      await mkdir(cur_dir);
    }
  }
}

module.exports = createPath;
