const path = require('path');
const fs = require('fs');
// const deleteFolder = require('./deleteFolder');
const fixGradleProperties = require('./fixGradleProperties');

const android_project_path = path.resolve('./build/jsb-default/frameworks/runtime-src/proj.android-studio');
// const delete_folder = path.resolve(android_project_path, 'app/jni/hellojavascript');
const gradle_file = path.resolve(android_project_path, 'gradle.properties');

// deleteFolder(delete_folder);
fixGradleProperties(gradle_file, () => {
    console.log(`--------build completed----------`);
});

