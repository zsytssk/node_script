const writeFile = require('./writeFile');
const path = require('path');

const ndk_setting_file = path.resolve(
    './build/jsb-default/frameworks/runtime-src/proj.android-studio/local.properties'
);

const fileData = `ndk.dir=/Users/${require("os").userInfo().username}/Library/Android/sdk/ndk-bundle
sdk.dir=/Users/${require("os").userInfo().username}/Library/Android/sdk`;

function fixGradleProperties() {
    return writeFile(ndk_setting_file, fileData);
}

module.exports = fixGradleProperties;
