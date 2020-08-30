import chalk from "chalk";
import program from 'commander'
import {log} from "util";
program
    .version('1.0.0','-v,--version')
    .description("The Most Simple Command Line Interface Written In TypeScript")
    .option('-h, --help', 'display all possible flags with descriptions')
    .option('-c, --google <type>', 'Add the specified type of cheese [marble]')
    .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');

const cheese: string = true === program.cheese
    ? 'marble'
    : program.cheese || 'no';

console.log('  - %s cheese', cheese);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
