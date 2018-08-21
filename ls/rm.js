const fs = require('fs');

module.exports = function rm(path) {
    if (!fs.existsSync(path)) {
        return;
    }
    const info = fs.lstatSync(path);
    if (info.isFile()) {
        fs.unlinkSync(path);
        return;
    }
    fs.readdirSync(path).forEach(function(file, index) {
        const curPath = path + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) {
            rm(curPath);
        } else {
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(path);
};
