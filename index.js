const handlebars = require('handlebars');
const fs = require('fs');
const yargs = require('yargs');
const util = require('util');

var templateLocation = 'Makefile.hbs'

const readFile = util.promisify(fs.readFile);

// render input data to template
function renderFromTemplate(template, data) {
  var template = handlebars.compile(template);
  var outputString = template(data);
  return outputString;
}

async function buildMakefile(inputData, templateFile) {
  // read the template file 
  var template = await readFile(templateFile)
  template = template.toString()
  // generate the output 
  result = renderFromTemplate(template, inputData)
  // console.log(result)
  
  // write generated output to a file
  outputFile = 'Makefile'
  fs.writeFileSync(outputFile, result)
  
  console.log(`> Generated output '${outputFile}'`)
}


var argv = yargs
  .usage('Usage: $0 -i <json> [-t <template]')
  .demandOption(['i'])
  .alias('i', 'input')
  .describe('i', 'JSON with Makfile data')
  .alias('t', 'template')
  .describe('t', 'template for makefile')
  .default('t', templateLocation)
  .argv

// console.log(`input: ${argv.i}, template: ${argv.t}`)
var inputData;
try {
  inputData = require(`./${argv.i}`);
} catch (e) {
  return console.error(e);
}
buildMakefile(inputData, argv.t)
