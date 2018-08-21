const fs = require('fs');

function writeFile(file_name, file_content) {
    return new Promise((resolve, reject) => {
        console.log(`${file_name}`);
        if (typeof file_content != 'string') {
            file_content = JSON.stringify(file_content);
        }
        fs.writeFile(`${file_name}`, file_content, function(err) {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}
module.exports = writeFile;
