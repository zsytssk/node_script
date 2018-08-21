const fixGradleProperties = require('./fixGradleProperties');
const wirteNdk = require('./writeNdk');
const writeBuildTime = require('./writeBuildTime');
const writeGlobal = require('./writeGlobal');
const excute = require('./excute');
const handleTest = require('./handleTest/main');
const writePackageInfo = require('./writePackageInfo');
const savePrdJs = require('./savePrdJs');

let type = process.argv[2] || 'test'; // test || prd
let build_type = process.argv[3] || 'compile'; // compile || build || debug

let is_full = false;
if (type == 'prd') {
    is_full = true;
}

let debug = true;
if (type == 'prd') {
    debug = false;
}

if (checkParam('debug')) {
    debug = true;
}
if (checkParam('full')) {
    is_full = true;
}
if (checkParam('nofull')) {
    is_full = false;
}

async function main() {
    let start = new Date();
    /** 清理test, 设置global.js env */
    if (!debug) {
        await handleTest('clear_test');
    } else {
        await handleTest('recover_test');
    }
    await writeGlobal(type, debug);
    /** 通过package.json中的配置去改android ios 打包的版本号 */
    await writePackageInfo();

    if (build_type == 'compile') {
        await excute(`sh ./goujian.sh ${debug ? 'debugTrue' : 'debugFalse'}`);
    } else {
        await excute(`sh ./build.sh ${debug ? 'debugTrue' : 'debugFalse'}`);
    }
    if (debug) {
        await sleep(100);
        await writeBuildTime();
    }
    await fixGradleProperties(is_full);
    await wirteNdk();
    // 保存打包js 用来压缩
    if (!debug) {
        await savePrdJs();
    }

    await excute('sh ./build_apk.sh');

    /** 还原test, global env */
    await handleTest('recover_test');

    let duration = formatDuring(new Date() - start);
    console.log('\x1b[32m%s\x1b[0m', `BUILD_TIME:>${duration}`);
}

function formatDuring(mss) {
    let result = '';
    let days = parseInt(mss / (1000 * 60 * 60 * 24));
    if (days) {
        result += days + 'd ';
    }
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours) {
        result += hours + 'h ';
    }
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes) {
        result += minutes + 'm ';
    }
    let seconds = (mss % (1000 * 60)) / 1000;
    if (seconds) {
        result += seconds + 's ';
    }
    if (!result) {
        result = '0s';
    }
    return result;
}
main();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkParam(name) {
    let args = process.argv;
    let result = false;
    for (const item of args) {
        if (item.indexOf(name) != -1) {
            result = true;
        }
    }
    return result;
}
