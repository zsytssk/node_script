const path = require('path');

const handleComment = require('./handleComment');
const ls = require('../ls/main');
const rm = require('../ls/rm');

/* clear_test  pre_release comment test code remove test folder */
/* recover_test  after release uncomment test code recover test folder */
const default_type = process.argv[2];
const test_folder = path.resolve(__dirname, '../../../assets/scripts/test');
const test_meta = path.resolve(__dirname, '../../../assets/scripts/test.meta');
const save_folder = path.resolve(__dirname, '../../../doc/saveTestTemp');
const script_folder = path.resolve(__dirname, '../../../assets/scripts');

async function main(type) {
    await handleComment(script_folder, type);
    if (type == 'clear_test') {
        ls.mv(test_folder, save_folder);
        rm(test_meta);
    } else {
        ls.mv(save_folder, test_folder);
    }
}

if (default_type == 'clear_test' || default_type == 'recover_test') {
    main(default_type);
}

module.exports = main;
