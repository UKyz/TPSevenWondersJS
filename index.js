const prompt = require('node-ask').prompt;
const nodeAsk = require('node-ask').ask;
const {City} = require('./app/city');
const {Unit} = require('./app/unit');

var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('list', require('prompt-list'));

const figlet = require('figlet');

const gameLoop = async (city1, city2) => {

  console.log('Welcome to our game ' + city1.name + ' and ' + city2.name + '.');

  let game = true;
  let i = 0;

  while (game) {

    let response = '';
    let respondInTime = true;
    console.log('You have 20 seconds to play.');
    let timeout1 = setTimeout(function() {console.log('10 seconds left.')}, 10000);
    let timeout2 = setTimeout(function() {
      console.log('Timeout, your play will not count.'); respondInTime = false}, 20000);

    let message = 'Time to play ';
    if (i % 2 === 0) {
      message += city1.user;
    }
    else {
      message += city2.user;
    }
    /*console.log('1- Do some stuff.\n' +
      '2- Do some other stuff.\n' +
      '3- Do some stuff : add the number.\n' +
      '4a- Do some stuff : add the number.');*/


    var questions = [
      {
        type: 'list',
        name: 'play',
        message: message + '. What\'s your play?',
        choices: [
          '1- Buy Corn',
          '2- Do some stuff',
          '3- Do some stuff',
          {name: '4- Do some stuff', disabled: 'Temporarily unavailable'},
          '5- Do some stuff'
        ]
      }
    ];

    let wallah;
    await enquirer.ask(questions)
      .then(function(answers) {
        wallah = answers.play;
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      })
      .catch(function(err) {
        console.log(err);
      });


    if (respondInTime) {
      console.log(await plays(city1, wallah));
    }


    /*await prompt('What is your play? ').then(
      function(response) {
        console.log('Your name is', response);
        if (respondInTime) console.log("Dans les temps");
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      }
    );*/

    //console.log('Your name is', response);

    i++;

  }

};

const plays = async (city, answer) => {

  if (answer === '1- Buy Corn') {
    await prompt('How much do you want to buy (min 1, max ' + city.gold +
      ', cost 1$/unit)').then(
        (response) => {
          console.log('Ok ' + response);
          if (response === 'number') {
            console.log('Coucou');
            response = (response < 1) ? 1 : response;
            response = (response > city.gold) ? city.gold : response;
            city.buyCorn(response);
            return 'You\'re buying ' + response + ' corns';
          }
          console.log('Hey');
        }
      );
  }

};

const displayBig = (text) => {

   new Promise((resolve) => {
    figlet(text, (err, data) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data);
    });
    setTimeout(function() {resolve();}, 1000);
  });

};

const main = async () => {

  //displayBig('TP Seven Wonders');

  console.log('Hey you two, do you wanna play ? Let\'s go !');

  const questions = [
    {key: 'nameUser1', msg: 'Player 1 what is your username? ',
      fn: 'prompt'},
    {key: 'nameCity1', msg: 'Player 1 what is the name of your city? ',
      fn: 'prompt'},
    {key: 'nameDivinity1', msg: 'Player 1 what is the name of your divinity? ',
      fn: 'prompt'},
    {key: 'nameUser2', msg: 'Player 2 what is your username? ',
      fn: 'prompt'},
    {key: 'nameCity2', msg: 'Player 2 what is the name of your city? ',
      fn: 'prompt'},
    {key: 'nameDivinity2', msg: 'Player 2 what is the name of your divinity? ',
      fn: 'prompt'}
  ];

  let city1;
  let city2;

  await nodeAsk(questions).then(
    answers => {
      city1 = new City(answers.nameUser1, answers.nameCity1,
        answers.nameDivinity1, 1000);
      city2 = new City(answers.nameUser2, answers.nameCity2,
        answers.nameDivinity2, 1000);
    }
  ).catch(
    ex => {
      // Do your error management here
      console.log(ex.stack);
    }
  );

  city1.init();
  city1.showStatus();
  city2.init();
  city2.showStatus();

  gameLoop(city1, city2);

  //city1.showStatus();

};

main();
