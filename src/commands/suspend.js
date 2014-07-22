require('shelljs/global');

exports.description = 'suspends the golem vm';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant suspend');
};
