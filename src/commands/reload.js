require('shelljs/global');

exports.description = 'restart the golem vm';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant reload --provision');
};
