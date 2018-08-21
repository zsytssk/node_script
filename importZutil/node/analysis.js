const path = require('path');
const fs = require('fs');
const insertToLine = require('./insertToLine');
const generateImportStr = require('./generateImportStr');
const getLineNum = require('./getLineNum');

function analysis(file) {
    file = path.resolve(file);

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;

        if (!needImport(data)) {
            return;
        }
        if (path.basename(file) == 'zutil.js') {
            return;
        }
        let line_num = getLineNum(data, file);
        let importStr = generateImportStr(file);
        if (line_num == 0) {
            importStr += '\n';
        }
        let result_data = insertToLine(data, line_num, importStr);
        fs.writeFile(file, result_data, (err) => {
            if (err) throw err;
            console.log(`completed:> ${file}:${line_num + 1}`)
        });
    });
}

function needImport(data) {
    let regx_use = /zutil\./g;
    let regx_import = /import\s+\{.*zutil[^\}]*\}/g;
    return data.match(regx_use) && !(data.match(regx_import))
}

module.exports = analysis;