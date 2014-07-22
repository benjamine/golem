require('shelljs/global');

exports.description = 'starts the golem vm';

exports.run = function() {
  require('../requirements').check();
  cd(require('../locator').vm());
  exec('vagrant up');
};
