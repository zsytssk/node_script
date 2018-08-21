// 从一个文件夹复制文件到另外文件夹
const fs = require('fs');
const path = require('path');
const mk = require('./mk');

function copyFile(src_path, dist_path, callback) {
    let dist_dir = path.resolve(path.dirname(dist_path));
    if (!fs.existsSync(src_path)) {
        console.error(`${src_path} doesn't exist`);
        return;
    }
    mk(dist_dir);

    let readStream = fs.createReadStream(src_path);
    let writeStream = fs.createWriteStream(dist_path);

    readStream.on('data', function(data) {
        writeStream.write(data);
    });
    readStream.on('error', function(err) {
        throw err;
    });
    readStream.on('end', function(done) {
        writeStream.end();
        if (done) done();
        if (callback) callback();
    });
}

module.exports = copyFile;
