const path = require('path');
const fs = require('fs');

let ignores = [];
function isIgnore(src_path) {
  for (let i = 0; i < ignores.length; i++) {
    let item = path.resolve(global.src_git, ignores[i]);
    if (src_path == item) {
      return true;
    }
  }
  return false;
}
function setIgnore(paths) {
  ignores = paths;
}

module.exports = {
  isIgnore,
  setIgnore
};