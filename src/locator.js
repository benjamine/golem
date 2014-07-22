require('shelljs/global');
var path = require('path');
var chalk = require('chalk');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function vm(options) {
  var dir;
  if (options && options.global) {
    dir = path.join(getUserHome(), '.golem');
    if (test('-d', dir)) {
      return dir;
    }
  } else {
    dir = path.resolve('.');
    var done = false;
    while (!done) {
      // check if current dir is a golem machine
      if (path.basename(dir) === '.golem') {
        return dir;
      }
      // look for .golem subfolder
      var subfolder = path.join(dir, '.golem');
      if (test('-d', subfolder)) {
        return subfolder;
      }
      var parentDir = path.dirname(dir);
      if (!parentDir || dir === parentDir) {
        done = true;
      } else {
        dir = parentDir;
      }
    }
  }

  if (!(options && options.required === false)) {
    console.error(chalk.red('golem not found'));
    console.log('try `golem init` first');
    process.exit(1);
  }
}

exports.getUserHome = getUserHome;
exports.vm = vm;
