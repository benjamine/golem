var path = require('path');

exports.description = 'display golem vm location';

exports.run = function() {
  console.log(require('../locator').vm());
};
