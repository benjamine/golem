require('shelljs/global');
var chalk = require('chalk');
var path = require('path');
var locator = require('../locator');

exports.description = 'deletes golem vm in ./.golem';
exports.options = {
  global: 'kill global golem (~/.golem)'
};

exports.run = function(opts) {
  var golemDir = locator.vm({
     required: false,
     global: opts.global
  });
  if (!golemDir) {
    console.log('no' + (opts.global ? ' global' : '') + ' golem found');
    return;
  }
  if (path.resolve(golemDir) === path.resolve(path.join(locator.getUserHome(),'~/.golem')) &&
     !opts.global) {
    console.error(chalk.red('to kill global golem add --global'));
  }
  rm('-rf', golemDir);
  console.log('removed ' + golemDir);
  console.log('מת');
};
