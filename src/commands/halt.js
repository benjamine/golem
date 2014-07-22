require('shelljs/global');

exports.description = 'halts the golem vm';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant halt');
};
