require('shelljs/global');
var path = require('path');
var child_process = require('child_process');

function runSsh(command, attempt) {
  var child = child_process.spawn('vagrant', [ 'ssh', '-c', command ], {
    stdio: 'inherit'
  });
  child.on('close', function(code){
    if (code !== 0 && (attempt || 1) < 2) {
      // if the machine wasn't created yet
      // summon and retry
      if (!test('-f', './.vagrant/machines/default/virtualbox/id')) {
        console.log('summoning golem to retry...');
        exec('vagrant up');
        runSsh(command, (attempt || 1) + 1);
        return;
      }
    }
    process.exit(code);
  });
}

module.exports = function run(args) {
  var workingDir = path.resolve('.');
  cd(require('./locator').vm());

  var atGolemDir = workingDir === path.resolve('.');
  var guestDir;
  if (atGolemDir) {
    guestDir = '/vagrant';
  } else {
    var config = require('./vm-config').get();
    guestDir = config.folders[workingDir];
    if (!guestDir) {
      guestDir = '/host/' + workingDir.replace(/[\/:\\]/g, '_');
      config.folders[workingDir] = guestDir;
      config.save();
      console.log('syncing folder ' + workingDir + ' => ' + guestDir);
      console.log('reloading to apply changes...');
      exec('vagrant reload');
    }
  }

  // if no command was specified, open the default shell
  var guestCommand = args.map(function(argValue){
    var arg = argValue.replace(/([\'\"\$])/g, "\\$1");
    if (arg.indexOf(' ') < 0) {
      return arg;
    }
    return "'" + arg + "'";
  }).join(' ') || 'zsh';

  var sshCommand = 'cd ' + guestDir + '; ' + guestCommand;
  runSsh(sshCommand);
};
