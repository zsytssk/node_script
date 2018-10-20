const fs = require("fs");
const path = require("path");
const cpFile = require("./cpFile");
const { isIgnore } = require("./isIgnore");
const { exists, readdir } = require("./asyncUtil");

async function cpDir(src_folder, dist_folder, progress_fun) {
  let num = 0;

  if (isIgnore(src_folder)) {
    console.error(`${src_folder} is ignore!`);
    return num;
  }

  const is_exists = await exists(src_folder);
  if (!is_exists) {
    console.error(`${src_folder} doesn't exist!`);
    return num;
  }
  let files = await readdir(src_folder);
  for (let i = 0; i < files.length; i++) {
    let file_name = files[i];
    let abs_src_path = path.resolve(src_folder, file_name);
    let abs_dist_path = path.resolve(dist_folder, file_name);
    let add_num = 0;
    if (fs.statSync(abs_src_path).isDirectory()) {
      add_num = await cpDir(abs_src_path, abs_dist_path);
    } else {
      add_num = 1;
      await cpFile(abs_src_path, abs_dist_path);
    }
    if (progress_fun) {
      progress_fun(add_num);
    }
    num += add_num;
  }
  return num;
}

module.exports = cpDir;
