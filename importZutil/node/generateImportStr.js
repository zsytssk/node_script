const path = require('path');

function generateImportStr(o_file) {
    let o_dir = path.dirname(o_file);
    let d_file = global.zutil_path;
    let rel_path = path.relative(o_dir, d_file);
    console.log(o_dir, d_file);
    console.log(rel_path);

    rel_path = rel_path.replace(/\\/g, '\/');
    let need_dot = rel_path.indexOf('../') == -1;
    if (need_dot) {
        rel_path = './' + rel_path;
    }

    let ext_name = path.extname(rel_path);

    rel_path = rel_path.replace(ext_name, '');

    return `import { zutil } from '${rel_path}';`;
}

module.exports = generateImportStr;