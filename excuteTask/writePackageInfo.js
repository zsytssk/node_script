const path = require('path');
const replaceFile = require('./replaceFile');
const packageInfo = require('../../package.json');

const package_info = path.resolve('./package.json');
const android_version_file = path.resolve(
    './build-templates/jsb-default/frameworks/runtime-src/proj.android-studio/app/build.gradle'
);
const android_name_file = path.resolve(
    './build-templates/jsb-default/frameworks/runtime-src/proj.android-studio/app/res/values/strings.xml'
);
const ios_setting_file = path.resolve(
    './build-templates/jsb-default/frameworks/runtime-src/proj.ios_mac/ios/Info.plist'
);
const global_js = path.resolve('./assets/scripts/Global.js');

async function writePackageInfo() {
    await replaceFile(
        android_version_file,
        /versionName \"[^\"]+\"/,
        `versionName "${packageInfo.version}"`
    );
    await replaceFile(
        android_version_file,
        /versionCode \d+/,
        `versionCode ${packageInfo.version.split('.').join('')}`
    );
    await replaceFile(
        android_name_file,
        /\<string name\=\"app_name\" translatable\=\"false\"\>[^\<]+\<\/string\>/,
        `<string name="app_name" translatable="false">${
            packageInfo.description
        }</string>`
    );
    await replaceFile(
        ios_setting_file,
        /(\<key\>CFBundleDisplayName\<\/key\>\n\s+\<string\>)[^<]+(\<\/string\>)/,
        `$1${packageInfo.description}$2`
    );
    await replaceFile(
        ios_setting_file,
        /(<key>CFBundleShortVersionString<\/key>\n\s+<string>)[^<]+(<\/string>)/,
        `$1${packageInfo.version}$2`
    );
    await replaceFile(
        global_js,
        /CONFIG.APP_VERSION = '[^']+';/,
        `CONFIG.APP_VERSION = '${packageInfo.version}';`
    );
    return true;
}
if (process.argv[2] && process.argv[2] == 'write_pack_info') {
    writePackageInfo();
}
module.exports = writePackageInfo;
