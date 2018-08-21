const fs = require('fs');
const cpFile = require('./cpFile');
const cpDir = require('./cpDir');
const mk = require('./mk');
const rm = require('./rm');
const walk = require('./walk');

function cp(src_path, dist_path) {
    if (!fs.existsSync(src_path)) {
        return;
    }
    let stat = fs.lstatSync(src_path);
    let file_num = 1;
    if (stat.isFile()) {
        cpFile(src_path, dist_path);
    } else if (stat.isDirectory()) {
        file_num = cpDir(src_path, dist_path);
    }

    return file_num;
}

function mv(src_path, dist_path) {
    if (!fs.existsSync(src_path)) {
        return;
    }
    if (!fs.existsSync(dist_path)) {
        mk(dist_path);
    }
    let stat = fs.lstatSync(src_path);
    let file_num = 1;
    if (stat.isFile()) {
        cpFile(src_path, dist_path, () => {
            rm(src_path);
        });
    } else if (stat.isDirectory()) {
        file_num = cpDir(src_path, dist_path, () => {
            rm(src_path);
        });
    }
    return file_num;
}

module.exports = {
    cp,
    mv,
    rm,
    mk,
    walk
};
