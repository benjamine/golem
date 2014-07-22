require('shelljs/global');

exports.description = 'suspend the golem vm';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant suspend');
};
