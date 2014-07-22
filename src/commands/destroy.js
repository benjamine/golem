require('shelljs/global');

exports.description = 'restarts the golem vm';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant destroy');
};
