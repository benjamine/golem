
exports.description = 'alias for docker on vm';
exports.argument = 'args';
exports.parseArgs = false;

exports.run = function() {
  require('../run')(['sudo', 'docker'].concat(process.argv.slice(3)));
};
