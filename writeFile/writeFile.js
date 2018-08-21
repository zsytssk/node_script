const fs = require('fs');

function writeFile(file_name, file_content) {
  console.log(`${__dirname}/${file_name}`);
  fs.writeFile(`${__dirname}/${file_name}`, JSON.stringify(file_content), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}
module.exports = writeFile;