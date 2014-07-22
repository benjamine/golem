require('shelljs/global');
var chalk = require('chalk');
var program = require('commander');
var packageInfo = require('../package');

config.fatal = true;
program.version(packageInfo.version);

require('./command-loader').load(program);
program
  .command('help')
  .description('show help')
  .action(function(){
    console.log('for more info visit: ' + packageInfo.homepage);
    program.help();
  });
program.command('*')
  .action(function(){
    console.error(chalk.red("unknown command: " + process.argv[2]));
    process.exit(1);
  });

program.on('--help', function(){
  console.log('  More info at:');
  console.log('');
  console.log('    ' + packageInfo.homepage);
  console.log('');
});

var result = program.parse(process.argv);
if (!result.args.length) {
  program.help();
}
