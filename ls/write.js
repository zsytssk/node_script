const fs = require("fs");
const path = require("path");
const mkDir = require("./mk");

function writeFile(file_path, file_content) {
  return new Promise(async (resolve, reject) => {
    let dir = path.dirname(file_path);
    await mkDir(dir);
    fs.writeFile(file_path, file_content, function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
      console.log("The file was saved!");
    });
  });
}
module.exports = writeFile;
