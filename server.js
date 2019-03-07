// modul readline
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);


var questions = [
  "jak se menuješ?",
  "co děláš",
  "jaký je tvůj oblíbený jazyk?"
];

var person = {};
var atrributes = ['name', 'hobby', 'lg'];
actualIndex = 0;

function getQuestion() {
  return questions[actualIndex];
}

rl.question(getQuestion(), function (answer) {
  person[attributes[actualIndex]] = answer;
  actualIndex++;

  rl.setPrompt(getQuestion());
  rl.prompt();

});







// // modul Util
// var path = require('path');
// var util = require('util');

// var myFile = path.basename(__filename);
// var myPath = path.join(__dirname, "adresar", "web");

// var message = util.format('%s : %s', 'Jmeno souboru je', myFile);
// console.log(message);

// var message = util.format('%s : %s', 'Adresar je', myPath);
// console.log(message);




// //prace s adresari
// var path = require('path');
// // console.log(path);
// console.log(path.basename(__filename));
// console.log(path.join(__dirname, "adresar", "web"))































// // work with timeout
// var questions = [
//   "jak se menuješ?",
//   "co děláš",
//   "jaký je tvůj oblíbený jazyk?"
// ];

// var reactions = [
//   "Seš tam?",
//   "Haló ?",
//   "Nespi ..."  
// ]

// var answers = [];
// var actualIndex;

// function createTimeout() {
//   setTimeout(function () {
//     askWithReaction(); 
//   }, 3000);
// }

// function ask(index) {
//   actualIndex = index;
//   process.stdout.write(`\n${questions[index]} >`);
//   createTimeout();
// }

// function askWithReaction(index) {
//   process.stdout.clearLine();
//   process.stdout.cursorTo(0);
//   process.stdout.write(`${reactions[actualIndex]} ${questions[actualIndex]} >`);
// }

// process.stdin.on('data', function (data) {
//   answers.push(data.toString().trim());
  
//   if (questions.length === answers.length) {
//     process.exit();
//   }
//   ask(answers.length);  
// });

// process.on('exit', function() {
//   process.stdout.write(`\n\n${answers[0]} ${answers[1]} ${answers[2]}\n\n`);
// });

// ask(0);






// // sbira input a vypise na consol
// var questions = [
//   "jak se menuješ?",
//   "co děláš",
//   "jaký je tvůj oblíbený jazyk?"
// ];

// var answers = [];

// function ask(index) {
//   process.stdout.write(`\n${questions[index]}\n`);
// }

// process.stdin.on('data', function (data) {
//   answers.push(data.toString().trim());
  
//   if (questions.length === answers.length) {
//     process.exit();
//   } else {

//   }
//   ask(answers.length);  
// });

// process.on('exit', function() {
//   process.stdout.write(`\n\n${answers[0]} ${answers[1]} ${answers[2]}\n`);

// });

// ask(0);




// process.stdout.write('coucou');
// process.stdout.write('coucou\n\n');




//// sbirani parametru a prace s nimi
// function collect(key) {
//   key = process.argv.indexOf(key);
//   return key === -1 ? null : process.argv[key + 1];     
// }
// let name = collect('--name');
// let message = collect('--message');

// if (name && message) {
//   return console.log(`${name} : ${message}`);
// }

// console.log('no messages');




//// sbirani parametru a prace s nimi
// function collect(key) {
//   key = process.argv.indexOf(key);
  
//   return key === -1 ? null : process.argv[key + 1];
//   // if (key === -1) {
//   //   return null;
//   // }
//   // else {
//   //   return process.argv[key+1]
//   // }
    
// }
// console.log(collect('--name'));





// console.log(global.process.argv);





// global.title = 'hello world';
// console.log(__dirname);





// console.log(global.title);