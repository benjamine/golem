
exports.description = 'alias for docker-compose on vm';
exports.argument = 'args';
exports.parseArgs = false;

exports.run = function() {
  require('../run')(['sudo', 'docker-compose'].concat(process.argv.slice(3)));
};
