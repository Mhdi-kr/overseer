// Import libraries and tools
import program from 'commander'
import command from 'commander'

// set the version of the program
program.version('0.0.1')

// INPUT SECTION
// set the possible options of the program
program
    .option('-H, --hello-world','basic hello world output')
    .option('-n, --your-name <name>', 'user input for name')
    // .option('-f, --full-name [words]', 'multiple value like full name')
    .option('-g, --greet','greet the user provided name')
    .option('-d, --debug', 'output all the details and variables')

// process user input arguments
program.parse(process.argv);

// LOGIC SECTION

// debug
if (program.debug) console.log(program.opts())
if (program.helloWorld !== undefined) console.log('Hello world!')
if (program.fullName !== undefined) console.log(`your full name is ${program.fullName}`)
if (program.greet !== undefined) console.log(`hello there, ${program.yourName}!`)