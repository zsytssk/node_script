const path = require('path');

const walkPath = require('./node/walkPath');
const analysis = require('./node/analysis');

const src_folder = path.resolve(__dirname + '/trc');

global.zutil_path = path.resolve(__dirname, 'trc/utils/zutil.js');

let files = walkPath(src_folder);

for (let i = 0; i < files.length; i++) {
    analysis(files[i]);
}