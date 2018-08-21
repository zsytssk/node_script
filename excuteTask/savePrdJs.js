const path = require('path');
const ls = require('./ls/main');
const packageInfo = require('../../package.json');
const src_folder = path.resolve(__dirname, '../../build/jsb-default/js backups (useful for debugging)');
const dist_folder = path.resolve(__dirname, `../../save/${packageInfo.version}`);
const files = ['project.dev.js','project.js', 'jsb_polyfill.js']

function savePrdJs() {
    for (let i = 0; i< files.length; i++) {
        const src_file = path.resolve(src_folder, files[i]);
        const dist_file = path.resolve(dist_folder, files[i]);
        ls.cp(src_file, dist_file);
    }
    // ls.mv(dist_folder, src_folder);
}
savePrdJs();
module.exports = savePrdJs;