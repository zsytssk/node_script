## 2018-07-21 09:55:12

- stdio: "inherit" 到底是什么意思

* node spawn inherit stdio exit

-| release 排除文件\

- shell: true

* env : { FORCE_COLOR: true }

var customStream = new stream.Writable();
customStream.\_write = function (data, ...argv) {
console.log('your notation');
process.stderr.\_write(data, ...argv);
};
cmd.stderr.pipe(customStream);

> 只上传特定文件

-| 文件夹不存在 跳过

## 创建文件夹文件夹

- fs.mkdirSync('a/b/c', 0755);

## 复制文件

var fileName = "coverflow-3.0.1.zip";

var sourceFile = path.join(**dirname, fileName);
var destPath = path.join(**dirname, "dest", fileName);

var readStream = fs.createReadStream(sourceFile);
var writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

## 存不存在

if (!fs.existsSync(src_path)) {

}
