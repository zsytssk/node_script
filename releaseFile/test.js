const excuse = require("./excuse");
excuse("git status", __dirname)
  .then(data => {
    // console.log("------------------->", data.split("\n")[0]);
    // console.log("------------------->", data);
  })
  .catch(err => {
    // console.log("------------------->", err);
  });
