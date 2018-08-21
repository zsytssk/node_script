const path = require('path');
const fs = require('fs');

const fileData = `PROP_TARGET_SDK_VERSION=15
PROP_APP_ABI=armeabi:armeabi-v7a:arm64-v8a:x86`;

function fixGradleProperties(file, callback) {
    file = path.resolve(file);

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;

        fs.writeFile(file, fileData, err => {
            if (err) throw err;
            console.log(`> fixGradleProperties complete <`);
            callback();
        });
    });
}

module.exports = fixGradleProperties;
