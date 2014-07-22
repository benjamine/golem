require('shelljs/global');
var program = require('commander');
var packageInfo = require('../package');

config.fatal = true;
program.version(packageInfo.version);

require('./command-loader').load(program);
program
   .command('help')
   .description('show help')
   .action(function(){
     program.help();
   });

var result = program.parse(process.argv);
if (!result.args.length) {
  program.help();
}
