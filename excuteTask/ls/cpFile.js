// 从一个文件夹复制文件到另外文件夹
const fs = require("fs");
const path = require("path");
const mkDir = require("./mkDir");
const { isIgnore } = require("./isIgnore");
const { exists } = require("./asyncUtil");

async function copyFile(src_path, dist_path) {
  if (isIgnore(src_path)) {
    console.error(`${src_path} is ignore!`);
    return;
  }

  let dist_dir = path.resolve(path.dirname(dist_path));
  const is_exists = await exists(src_path);
  if (!is_exists) {
    console.error(`${src_path} doesn't exist`);
    return;
  }
  await mkDir(dist_dir);

  await new Promise((resolve, reject) => {
    let readStream = fs.createReadStream(src_path);
    let writeStream = fs.createWriteStream(dist_path);

    readStream.on("data", data => {
      writeStream.write(data);
    });
    readStream.on("error", err => {
      throw err;
    });
    readStream.on("end", done => {
      writeStream.end();
      if (done) {
        done();
      }
      resolve();
    });
  });
}

module.exports = copyFile;
