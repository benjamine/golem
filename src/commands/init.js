require('shelljs/global');
var path = require('path');
var locator = require('../locator');
var baseRepoUrl = 'benjamine/golem-base';

exports.description = 'creates a golem vm in ./.golem';
exports.options = {
  repo: 'machine repository to clone from (default: benjamine/golem-base)',
  global: 'save it globally (~/.golem)'
};

exports.run = function(opts) {
  require('../requirements').check();
  var dir = './.golem';
  if (opts.global) {
    dir = path.join(locator.getUserHome(), '.golem');
  }
  if (!test('-d', dir)) {
    var repoUrl = opts.repo || baseRepoUrl;
    if (/^[\w\d\-_]+\/[\w\d\-_]+$/.test(repoUrl)) {
      // assume github repo by default
      repoUrl = 'https://github.com/' + repoUrl + '.git';
    }
    exec('git clone '+ repoUrl +' '+dir);
    console.log('new golem ready to summon!');
  } else {
    console.log('golem found');
  }
};
