require('shelljs/global');

exports.description = 'destroy the golem vm';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant destroy --force');
};
