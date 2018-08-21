const path = require('path');
const replaceFile = require('./replaceFile');

const global_js = path.resolve('./assets/scripts/Global.js');
async function writeGlobal(type, debug) {
    type = type || 'test';

    await replaceFile(
        global_js,
        /let ENV = '[^']+';/,
        `let ENV = '${type.toUpperCase()}';`
    );
    /** 是否是debug */
    await replaceFile(global_js, /DEBUG: [^,]+,/, `DEBUG: ${debug},`);
    return true;
}

module.exports = writeGlobal;
