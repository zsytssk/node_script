const path = require('path');
const replaceFile = require('./replaceFile');

const project_dev_js = path.resolve('./build/jsb-default/src/project.dev.js');
function writeBuildTime() {
    return replaceFile(project_dev_js, '__BUILD_TIME__', getFormatTime());
}

function getFormatTime() {
    const now = new Date();
    return `${now.getFullYear()}/${now.getMonth() +
        1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

module.exports = writeBuildTime;
