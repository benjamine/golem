
var packageInfo = require('../package');
exports.commands = require('./command-loader').modules();
exports.locator = require('./locator');
exports.vmConfig = require('./vm-config');
exports.version = packageInfo.version;
