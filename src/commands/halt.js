require('shelljs/global');

exports.description = 'halt the golem vm';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant halt');
};
