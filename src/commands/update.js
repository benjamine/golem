require('shelljs/global');
var chalk = require('chalk');

exports.description = 'deletes golem vm in ./.golem';

exports.run = function() {
  cd(require('../locator').vm());
  var result;
  exec('git fetch origin');
  if (exec('git diff --quiet HEAD..origin/master').code === 0) {
    console.log('golem is up-to-date');
    return;
  }
  console.log('updating...');
  exec('git merge origin/master');
  exec('touch lastupdate.tmp');
  console.log('reloading to apply changes');
  exec('vagrant reload --provision');
  console.log(chalk.green('golem updated successfully'));
};
