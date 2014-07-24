
exports.description = 'alias for fig on vm';
exports.argument = 'args';

exports.run = function() {
  require('../run')(['sudo', 'fig'].concat(process.argv.slice(3)));
};
