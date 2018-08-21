function insertToLine(data, line_num, insert_str) {
    var data_arr = data.split("\n");
    data_arr.splice(line_num, 0, insert_str);
    return data_arr.join("\n");
}

module.exports = insertToLine;