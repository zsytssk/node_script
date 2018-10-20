let fs = require("fs");

function readdir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, file_list) => {
      if (err) {
        return reject(err);
      }
      resolve(file_list);
    });
  });
}

function exists(path) {
  return new Promise((resolve, reject) => {
    fs.exists(path, exists => {
      resolve(exists);
    });
  });
}

function rmdir(path) {
  fs.rmdir(path, err => {
    return new Promise((resolve, reject) => {
      if (err) {
        return reject(err);
      }
      resolve(err);
    });
  });
}
function unlink(path) {
  fs.unlink(path, err => {
    return new Promise((resolve, reject) => {
      if (err) {
        return reject(err);
      }
      resolve(err);
    });
  });
}

function mkdir(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, function(e) {
      if (!e || (e && e.code === "EEXIST")) {
        resolve();
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  readdir,
  exists,
  mkdir,
  unlink,
  rmdir
};
