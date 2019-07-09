const fs = require("fs");
const { exists, readdir, unlink, rmdir } = require("./asyncUtil");

module.exports = async function rm(path) {
  if (!(await exists(path))) {
    return;
  }
  const info = fs.lstatSync(path);
  if (info.isFile()) {
    await unlink(path);
    return;
  }
  const files = await readdir(path);
  for (const file of files) {
    const curPath = path + "/" + file;
    if (fs.lstatSync(curPath).isDirectory()) {
      await rm(curPath);
    } else {
      await unlink(curPath);
    }
  }
  await rmdir(path);
};
