
exports.description = 'exec command on vm (synced folder as cwd)';
exports.argument = 'command';
exports.parseArgs = false;

exports.run = function(command, opts) {
  require('../run')(process.argv.slice(3));
};
