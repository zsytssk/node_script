const fs = require("fs");
const { exists, readdir, unlink, rmdir } = require("./asyncUtil");

module.exports = function rm(path) {
  return new Promise(async (resolve, reject) => {
    if (!(await exists(path))) {
      return;
    }
    const info = fs.lstatSync(path);
    if (info.isFile()) {
      await unlink(path);
      return;
    }
    let files = readdir(path);
    for (let file of files) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        await rm(curPath);
      } else {
        await unlink(curPath);
      }
    }
    await rmdir(path);
  });
};
