const nodeAsk = require('node-ask').ask;

const Enquirer = require('enquirer');

const enquirer = new Enquirer();

enquirer.register('list', require('prompt-list'));

// Const figlet = require('figlet');

const {City} = require('./app/city');

let respondInTime;
let city1;
let city2;

const plays = async (player, answer) => {
  const city = city1;

  if (answer === '1- Buy Corn') {
    const questions2 = [
      {
        type: 'input',
        name: 'play2',
        message: 'How many? (min: 1, max: ' + city.gold + ')'
      }
    ];

    await enquirer.ask(questions2)
      .then(answers => {
        if (player === 1 && respondInTime) {
          city.buyCorn(Number(answers.play2));
          city.showStatus();
        }
      })
      .catch(err => {
        console.log(err);
      });

    if (!respondInTime) {
      console.log('Your action has not been played, you played too late.');
    }
  }
};

const gameLoop = async (city1, city2) => {
  console.log('Welcome to our game ' + city1.name + ' and ' + city2.name + '.');

  const game = true;
  let i = 0;

  while (game) {
    respondInTime = true;
    console.log('You have 20 seconds to play.');
    const timeout1 = setTimeout(() => {
      console.log(' 10 seconds left.');
    }, 10000);
    const timeout2 = setTimeout(() => {
      console.log('Timeout, your play will not count.');
      respondInTime = false;
    }, 20000);

    let message = 'Time to play ';
    let player;

    if (i % 2 === 0) {
      message += city1.user;
      city1.showStatus();
      player = 1;
    } else {
      message += city2.user;
      city2.showStatus();
      player = 2;
    }

    const questions = [
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

    await enquirer.ask(questions)
      .then(async answers => {
        if (respondInTime) {
          await plays(player, answers.play);
        }
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      })
      .catch(err => {
        console.log(err);
      });

    i++;
  }
};

const main = async () => {
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
};

main();
