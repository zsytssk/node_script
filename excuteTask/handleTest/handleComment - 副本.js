const path = require('path');
const fs = require('fs');
const ls = require('./ls/main');

function handleComment(folder, type) {
    return new Promise((resolve, reject) => {
        let files = ls.walk(folder);

        let complete_num = 0;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let coment_type = 'uncomment';
            if (type == 'clear_test') {
                coment_type = 'comment';
            }
            handleCommentFile(file, coment_type).then(() => {
                complete_num++;
                if (complete_num == files.length) {
                    resolve();
                }
            });
        }
    });
}

function handleCommentFile(file, type = 'comment') {
    return new Promise((resolve, reject) => {
        file = path.resolve(file);
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;

            let result_data = analysisTest(data, type);

            if (!result_data) {
                resolve();
                return;
            }

            fs.writeFile(file, result_data, err => {
                if (err) throw err;
                resolve();
            });
        });
    });
}

function analysisTest(data, type) {
    let regx_use = /@test/gi;
    let matchs = data.match(regx_use);

    let matchs_pos = [];
    let test_str = data;
    if (!matchs) {
        return;
    }

    for (let match of matchs) {
        let begin_pos = matchs_pos.length
            ? matchs_pos[matchs_pos.length - 1] + match.length
            : 0;
        let match_pos = test_str.search(regx_use);
        matchs_pos.push(begin_pos + match_pos);
        test_str = test_str.slice(match_pos + match.length);
    }

    let result_data = data;
    for (let len = matchs_pos.length, i = len - 1; i >= 0; i--) {
        let { test_type, num } = getTestType(data, matchs_pos[i], matchs[i]);
        let line = getPos(data, matchs_pos[i]).line;
        if (test_type == 'cur_line') {
            if (type == 'comment') {
                result_data = commentLine(result_data, line);
            } else {
                result_data = unCommentLine(result_data, line);
            }
            continue;
        } else {
            if (type == 'comment') {
                result_data = commentLine(result_data, line + 1, num);
            } else {
                result_data = unCommentLine(result_data, line + 1, num);
            }
        }
    }

    return result_data;
}

function getLineRange(data, line_num) {
    let lines_arr = data.split('\n');
    let begin = 0;
    for (let i = 0; i < line_num; i++) {
        begin += lines_arr[i].length + 1;
    }
    let end = begin + lines_arr[line_num].length;
    return [begin, end];
}

function getPos(data, num) {
    let before_str = data.slice(0, num);
    let before_lines = before_str.split('\n');

    let line = before_lines.length - 1;
    let column = before_lines[before_lines.length - 1].length;

    return {
        line,
        column
    };
}

function getTestType(data, pos, match_str) {
    let line_range = getLineRange(data, getPos(data, pos).line);
    let line_str = getRangeStr(data, line_range);
    let cur_line_reg = /\/\/\s*@test\s*$/;

    let next_line_reg = /\/\*\*\s*@test(\d*)\s*\*\/$/;
    let test_type, num;
    if (cur_line_reg.test(line_str)) {
        test_type = 'cur_line';
    } else {
        let match = line_str.match(next_line_reg);
        if (match) {
            test_type = 'next_line';
            num = match[1];
        }
    }
    return {
        test_type,
        num
    };
}
function getRangeStr(str, range) {
    return str.slice(range[0], range[1]);
}

function commentLine(data, line_num, mul) {
    let result_data = data;
    mul = mul || 1;

    for (let i = mul - 1; i >= 0; i--) {
        let cur_line = line_num + i;
        let line_range = getLineRange(data, cur_line);
        let line_str = getRangeStr(data, line_range);
        if (isEmpty(line_str)) {
            continue;
        }
        if (hasComment(line_str)) {
            continue;
        }
        let space_len = findLineBeforeSpace(data, cur_line).length;
        let inject_pos = line_range[0] + space_len;
        result_data = [
            result_data.slice(0, inject_pos),
            '// ',
            result_data.slice(inject_pos)
        ].join('');
    }
    return result_data;
}

function unCommentLine(data, line_num, mul) {
    let result_data = data;
    mul = mul || 1;
    for (let i = mul - 1; i >= 0; i--) {
        let cur_line = line_num + i;
        let line_range = getLineRange(data, cur_line);
        let line_str = getRangeStr(data, line_range);
        let space_str = findLineBeforeSpace(data, cur_line);
        line_str = line_str.replace(/^(\s*)(\/\/\s*)+/, space_str);
        result_data = [
            result_data.slice(0, line_range[0]),
            line_str,
            result_data.slice(line_range[1])
        ].join('');
    }
    return result_data;
}

function hasComment(str) {
    const match = str.match(/^(\s*)(\/\/\s*)+/);
    if (!match) {
        return false;
    }
    return true;
}

function findLineBeforeSpace(data, line_num) {
    let line_range = getLineRange(data, line_num);
    let line_str = getRangeStr(data, line_range);
    let space_reg = /\s*/;
    let space_match = line_str.match(space_reg);
    return space_match ? space_match[0] : '';
}
function isEmpty(str) {
    return /^\s*$/.test(str);
}

module.exports = handleComment;
