require('shelljs/global');

exports.description = 'shows the golem vm status';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant status');
};
