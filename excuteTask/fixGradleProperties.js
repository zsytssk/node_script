const path = require('path');
const writeFile = require('./writeFile');

const allPlatform = `PROP_TARGET_SDK_VERSION=15
PROP_APP_ABI=armeabi:armeabi-v7a:x86`;
const quickPackage = `PROP_TARGET_SDK_VERSION=15
PROP_APP_ABI=armeabi`;

const android_project_path = path.resolve(
    './build/jsb-default/frameworks/runtime-src/proj.android-studio'
);

const gradle_file = path.resolve(android_project_path, 'gradle.properties');

function fixGradleProperties(is_full) {
    let config;
    config = is_full ? allPlatform : quickPackage;
    return writeFile(gradle_file, config || allPlatform);
}

module.exports = fixGradleProperties;
