function log(msg) {
  process.stdout.write(msg + "");
  // process.stdout.clearLine && process.stdout.clearLine();
  process.stdout.cursorTo && process.stdout.cursorTo(0);
  process.stdout.write("\n");
}

module.exports = log;
