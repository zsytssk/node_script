"use strict";

const spawn = require("child_process").spawn;

function excuse(cmd, dir, rep = false) {
  return new Promise((resolve, reject) => {
    const config = {
      stdio: "inherit",
      cwd: dir || __dirname,
      encoding: "utf-8"
    };
    if (rep) {
      config.stdio = "pipe";
    }
    const run_process = spawn("cmd.exe", ["/s", "/c", cmd], config);

    let std_out = "",
      std_err = "";
    if (rep) {
      run_process.stdout.pipe(process.stdout);
      run_process.stderr.pipe(process.stderr);
      run_process.stdout.on("data", data => {
        std_out += data;
      });
      run_process.stderr.on("data", data => {
        std_err += data;
      });
    }

    run_process.on("exit", code => {
      console.log(`[${cmd}]:>exit code = ${code};`);
      if (code == 0) {
        resolve(std_out);
      } else {
        reject(std_err);
      }
    });
  });
}

async function main(cmds, path) {
  let result;
  if (!Array.isArray(cmds)) {
    result = await excuse(cmds, path);
    return result;
  }
  for (let cmd of cmds) {
    result = await excuse(cmd, path);
  }
  return result;
}

module.exports = main;
