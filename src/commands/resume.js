require('shelljs/global');

exports.description = 'resume the golem vm';

exports.run = function() {
  cd(require('../locator').vm());
  exec('vagrant resume');
};
