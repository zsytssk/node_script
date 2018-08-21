const path = require('path');

function getLineNum(data, file) {
    let data_arr = data.split("\n");

    let line_num = 0;
    for (let i = 0; i < data_arr.length; i++) {
        let line_str = data_arr[i];

        if (!hasImport(line_str)) {
            continue;
        }
        let import_item_info = getImportItemInfo(data_arr, i);

        let str = import_item_info.str;

        if (import_item_info.isMulti) {
            i = import_item_info.end;
        }

        let import_file = getImportPath(str);
        if (hasImportData(import_file, file)) {
            line_num = i+1;
        }
        if (hasImportUtil(import_file, file)) {
            line_num = i+1;
        }
    }
    return line_num;
}

function hasImportData(import_file, file) {

    if (import_file.indexOf('data/') != -1) {
        return true;
    }
    if (file.indexOf('data/') != -1) {
        if (import_file.indexOf('./') == 0) {
            return true;
        }
    }

}
function hasImportUtil(import_file, file) {
    if (import_file.indexOf('utils/') != -1) {
        return true;
    }
    if (file.indexOf('utils/') != -1) {
        if (import_file.indexOf('./') == 0) {
            return true;
        }
    }
}
function hasImport(str) {
    return str.indexOf('import') != -1;
}
function getImportItemInfo(data_arr, start_line_num) {
    let end_line_num = extendImportLine(data_arr, start_line_num);
    if (end_line_num == start_line_num) {
        return {
            str: data_arr[start_line_num],
            isMulti: false
        }
    }

    let str_arr = [];
    for (let i = start_line_num; i <= end_line_num; i++) {
        str_arr.push(data_arr[i]);
    }
    return {
        str: str_arr.join('\n'),
        isMulti: true,
        end: end_line_num
    }
}
function extendImportLine(data_arr, i) {
    let line_str = data_arr[i];
        if (line_str.indexOf(';') == -1) {
            return extendImportLine(data_arr, ++i);
        }
        return i;
    }
function getImportPath(str) {
    let importReg1 = /\'([^\']+)\'/g;
    let importReg2 = /\"([^\']+)\"/g;

    let match1 = str.match(importReg1);
    let match2 = str.match(importReg2);

    if (!match1 && !match2) {
        return false;
    }
    let wrap_str = '', wrap_s;
    if (match1) {
        wrap_s = '\'';
        wrap_str = match1[0];
    }
    if (match2) {
        wrap_s = '\"';
        wrap_str = match2[0];
    }
    return wrap_str.replace(wrap_s, '');

}
/**注释行 */
function isCommnentLine(str, file) {

}

module.exports = getLineNum;