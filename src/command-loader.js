var fs = require('fs');
var path = require('path');

function flagify(name) {
  var flag = name;
  if (flag.length === 1) {
    return '-' + flag.toLowerCase();
  } else if (flag.slice(0, 1) !== '-') {
    flag = '--' + flag.replace(/([a-z0-9])([A-Z])/g, function(match, l, u){
      return l + '-' + u.toLowerCase();
    }).toLowerCase().replace(/[^\w\d]/g, '-');
  }
  return flag;
}

function load(program){
  var filenames = fs.readdirSync(path.join(__dirname, 'commands'));
  while (filenames.length) {
    var filename = filenames.shift();
    if (path.extname(filename) !== '.js') {
      continue;
    }
    var name = path.basename(filename, '.js');
    var module = require('./commands/' + name);
    var cmd = program.command(name + (module.argument ?
      ' [' + module.argument + ']' : ''));

    if (module.description) {
      cmd = cmd.description(module.description);
    }

    if (module.options) {
      for (var optionName in module.options) {
        var flag = flagify(optionName);
        cmd = cmd.option(flag, module.options[optionName]);
      }
    }
    cmd = cmd.action(module.run);
  }
}

exports.load = load;
