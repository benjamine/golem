require('shelljs/global');
var os = require('os');
var chalk = require('chalk');

var brewUpdated = false;
function brewUpdate(){
  if (brewUpdated) {
    return;
  }
  if (!which('brew')) {
    console.log('installing brew');
    exec('ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"');
  }
  console.log('brew update');
  exec('brew update');
}

function brew(args) {
  brewUpdate();
  exec('brew ' + args);
}

function brewCask(args) {
  if (!test('-d', '/usr/local/Cellar/brew-cask/')) {
    brewUpdate();
    exec('export HOMEBREW_CASK_OPTS="--appdir=/Applications"');
    brew('tap caskroom/cask');
    brew('install brew-cask');
  }
  brew('cask ' + args);
}

var requirementsFor = {
  darwin: function() {
    // on OSX use brew (and cask) to install dependencies
    if (!which('git')) {
      console.log('installing git');
      brew('install git');
    }
    if (!which('VBoxManage')) {
      console.log('installing virtualbox');
      brewCask('install virtualbox');
    }
    if (!which('vagrant')) {
      console.log('installing vagrant');
      brewCask('install vagrant');
    }
  },
  others: function() {
    // on other OSes just suggest download links
    if (!which('git')) {
      console.log(chalk.red('git not found, please install it first:'));
      console.log(chalk.red('   http://git-scm.com/downloads'));
      process.exit(1);
    }
    // disabled, VBoxManage is not always available in other OSes
    /*
    if (!which('VBoxManage')) {
      console.log(chalk.red('VirtualBox not found, please install it first:'));
      console.log(chalk.red('   https://www.virtualbox.org'));
      process.exit(1);
    }
    */
    if (!which('vagrant')) {
      console.log(chalk.red('vagrant not found, please install it first:'));
      console.log(chalk.red('   http://www.vagrantup.com/'));
      process.exit(1);
    }
  }
};

function check() {
  var osType = os.type().toLowerCase();
  if (requirementsFor[osType]) {
    requirementsFor[osType]();
  } else {
    requirementsFor.others();
  }
}

exports.check = check;
