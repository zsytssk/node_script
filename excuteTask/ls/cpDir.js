const fs = require('fs');
const walk = require('./walk');
const cpFile = require('./cpFile');

module.exports = (src_folder, dist_folder, callback) => {
    if (!fs.existsSync(src_folder)) {
        console.error(`${src_folder} doesn't exist`);
        return;
    }
    let files = walk(src_folder);

    let complete_num = 0;
    for (let i = 0; i < files.length; i++) {
        let src_file = files[i];
        let dist_file = src_file.replace(src_folder, dist_folder);
        cpFile(src_file, dist_file, () => {
            complete_num++;
            if (complete_num == files.length) {
                if (callback) {
                    callback();
                }
            }
        });
    }
    return files.length;
};
