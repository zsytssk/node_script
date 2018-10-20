const fs = require("fs");
const cpFile = require("./cpFile");
const cpDir = require("./cpDir");
const { exists } = require("./asyncUtil");

module.exports = async (src_path, dist_path, progress_fun) => {
  const is_exists = await exists(src_path);
  if (!is_exists) {
    return;
  }
  let stat = fs.lstatSync(src_path);
  if (stat.isFile()) {
    await cpFile(src_path, dist_path);
  } else if (stat.isDirectory()) {
    await cpDir(src_path, dist_path, progress_fun);
  }

  return;
};
