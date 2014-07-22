require('shelljs/global');
var chalk = require('chalk');

exports.description = 'deletes golem vm in ./.golem';

exports.run = function() {
  if (!which('golem')) {
    console.log('installing global golem cli');
    exec('npm install -g golem');
  }
  if (exec('npm update -g golem').result) {
    console.log('golem cli tool updated');
  } else {
    console.log('golem cli tool is up-to-date');
  }
  var golemDir = require('../locator').vm();
  cd(golemDir);
  exec('git fetch origin');
  config.fatal = false;
  if (exec('git diff --quiet HEAD..origin/master').code === 0) {
    console.log('golem vm (at ' + golemDir + ') is up-to-date');
    return;
  }
  config.fatal = true;
  console.log('updating vm...');
  exec('git merge origin/master');
  exec('touch lastupdate.tmp');
  console.log('reloading to apply changes');
  exec('vagrant reload --provision');
  console.log(chalk.green('golem vm updated successfully'));
};
