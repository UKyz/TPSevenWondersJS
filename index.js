const nodeAsk = require('node-ask').ask;
const {City} = require('./app/city');
const {Unit} = require('./app/unit');

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

  /*const unit1 = new Unit();

  console.log(unit1.age);
  console.log(unit1.damage);
  console.log(unit1.timeToLive);
  console.log(unit1.isAlive());*/

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
};

main();
