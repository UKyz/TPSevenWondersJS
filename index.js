const nodeAsk = require('node-ask').ask;

const Enquirer = require('enquirer');

const enquirer = new Enquirer();

enquirer.register('list', require('prompt-list'));

// Const figlet = require('figlet');

const {City} = require('./app/city');
const {Wonder} = require('./app/wonder');

let respondInTime;
let city1;
let city2;

const play2Buy = async (city, answer) => {
  if (answer === '1- Buy corn') {
    const questions2 = [
      {
        type: 'input',
        name: 'play2',
        message: 'How many? (min: 0, max: ' + city.gold + ')'
      }
    ];

    await enquirer.ask(questions2)
      .then(answers => {
        if (respondInTime) {
          city.buyCorn(Number(answers.play2));
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else if (answer === '2- Buy wood') {
    const questions2 = [
      {
        type: 'input',
        name: 'play2',
        message: 'How many? (min: 0, max: ' + (city.gold / 2) + ')'
      }
    ];

    await enquirer.ask(questions2)
      .then(answers => {
        if (respondInTime) {
          city.buyWood(Number(answers.play2));
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else if (answer === '3- Chop wood') {
    city.chopWood();
  } else if (answer === '4- Sell corn') {
    const questions2 = [
      {
        type: 'input',
        name: 'play2',
        message: 'How many? (min: 0, max: ' + city.corn + ')'
      }
    ];

    await enquirer.ask(questions2)
      .then(answers => {
        if (respondInTime) {
          city.sellCorn(Number(answers.play2));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  if (!respondInTime) {
    console.log('Your action has not been played, you played too late.');
  }
};

const play2Offer = async (city, answer) => {
  if (answer === '1- Corn') {
    const questions2 = [
      {
        type: 'input',
        name: 'play2',
        message: 'How many? (min: 0, max: ' + city.corn + ')'
      }
    ];

    await enquirer.ask(questions2)
      .then(answers => {
        if (respondInTime) {
          city.offeringCorn(Number(answers.play2));
        }
      })
      .catch(err => {
        console.log(err);
      });

    if (!respondInTime) {
      console.log('Your action has not been played, you played too late.');
    }
  } else if (answer === '2- Wood') {
    const questions2 = [
      {
        type: 'input',
        name: 'play2',
        message: 'How many? (min: 0, max: ' + city.wood + ')'
      }
    ];

    await enquirer.ask(questions2)
      .then(answers => {
        if (respondInTime) {
          city.offeringWood(Number(answers.play2));
        }
      })
      .catch(err => {
        console.log(err);
      });

    if (!respondInTime) {
      console.log('Your action has not been played, you played too late.');
    }
  } else if (answer === '3- Gold') {
    const questions2 = [
      {
        type: 'input',
        name: 'play2',
        message: 'How many? (min: 0, max: ' + city.gold + ')'
      }
    ];

    await enquirer.ask(questions2)
      .then(answers => {
        if (respondInTime) {
          city.offeringGold(Number(answers.play2));
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

const play2Wonder = async (city, answer) => {
  for (let i = 0; i < city.lenghtListWonders; i++) {
    if ((i + 1) + '- ' + city.listWonders_[i].name === answer) {
      city.listWonders_[i].init();
    }
  }
};

const play1 = async (city, answer) => {
  const listChoices = [];
  let messageQ = '';

  if (answer === '1- Buy, get or sell resources') {
    listChoices.push(
      '1- Buy corn',
      '2- Buy wood',
      '3- Chop wood',
      '4- Sell corn'
    );
    messageQ = 'What do you want to buy?';
  } else if (answer === '2- Do an offering') {
    listChoices.push(
      '1- Corn',
      '2- Wood',
      '3- Gold'
    );
    messageQ = 'What do you want to offer?';
  } else if (answer === '4- Build a wonder') {
    city.showWonderStatus();
    for (let i = 0; i < city.lenghtListWonders; i++) {
      if (city.listWonders_[i].isInit) {
        listChoices.push({name: (i + 1) + '- ' + city.listWonders_[i].name,
          disabled: 'Already built'});
      } else {
        listChoices.push((i + 1) + '- ' + city.listWonders_[i].name);
      }
    }
    messageQ = 'What do you want to build?';
  }

  const questions = [
    {
      type: 'list',
      name: 'play',
      message: messageQ,
      choices: listChoices
    }
  ];

  await enquirer.ask(questions)
    .then(async answers => {
      if (respondInTime) {
        if (answer === '1- Buy, get or sell resources') {
          await play2Buy(city, answers.play);
        } else if (answer === '2- Do an offering') {
          await play2Offer(city, answers.play);
        } else if (answer === '4- Build a wonder') {
          await play2Wonder(city, answers.play);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const gameLoop = async (city1, city2) => {
  console.log('\nWelcome to our game ' + city1.user + ' and ' + city2.user +
    '.');

  const game = true;
  let i = 0;

  while (game) {
    let city;
    let message = 'Time to play ';

    if (i % 2 === 0) {
      city = city1;
    } else {
      city = city2;
    }

    message += city.user;
    console.log('\n================================');
    city.showStatus();
    console.log('================================');

    respondInTime = true;
    console.log('You have 20 seconds to play.');
    const timeout1 = setTimeout(() => {
      console.log(' 10 seconds left.');
    }, 10000);
    const timeout2 = setTimeout(() => {
      console.log('Timeout, your play will not count.');
      respondInTime = false;
    }, 20000);

    const listChoices = [
      '1- Buy, get or sell resources',
      '2- Do an offering'
    ];

    if (city.gold >= 20 && city.corn >= 10) {
      listChoices.push('3- Form 10 units : 20 Coins & 10 Corns');
    } else {
      listChoices.push({name: '3- Form 10 units : 20 Coins', disabled: 'You' +
        ' need 20 Coins & 10 Corns'});
    }

    listChoices.push('4- Build a wonder', '5- Prepare for an attack');

    const questions = [
      {
        type: 'list',
        name: 'play',
        message: message + '. What\'s your play?',
        choices: listChoices
      }
    ];

    await enquirer.ask(questions)
      .then(async answers => {
        if (respondInTime) {
          if (answers.play === '3- Form 10 units : 20 Coins & 10 Corns') {
            city.formUnit(10);
          } else {
            await play1(city, answers.play);
          }
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
  const listWondersCorn = [
    {name: 'Champs1', timeBuild: 30, costBuild: 40, typeBuild: 'corn',
      nbBuild: 30, typeEarn: 'corn', nbEarn: 5, timeEarn: 20,
      timeFactors: 1000},
    {name: 'Champs2', timeBuild: 30, costBuild: 50, typeBuild: 'corn',
      nbBuild: 40, typeEarn: 'corn', nbEarn: 10, timeEarn: 20,
      timeFactors: 1000},
    {name: 'Champs3', timeBuild: 25, costBuild: 50, typeBuild: 'wood',
      nbBuild: 30, typeEarn: 'corn', nbEarn: 7, timeEarn: 20,
      timeFactors: 1000}
  ];
  listWondersCorn.sort();

  const listWondersUnit = [
    {name: 'Caserne1', timeBuild: 30, costBuild: 60, typeBuild: 'wood',
      nbBuild: 30, typeEarn: 'unit', nbEarn: 5, timeEarn: 40,
      timeFactors: 1000},
    {name: 'Caserne2', timeBuild: 40, costBuild: 70, typeBuild: 'unit',
      nbBuild: 15, typeEarn: 'unit', nbEarn: 5, timeEarn: 40,
      timeFactors: 1000},
    {name: 'Caserne3', timeBuild: 30, costBuild: 60, typeBuild: 'unit',
      nbBuild: 20, typeEarn: 'unit', nbEarn: 7, timeEarn: 50,
      timeFactors: 1000}
  ];
  listWondersUnit.sort();

  const listWondersWood = [
    {name: 'Bucheron1', timeBuild: 30, costBuild: 50, typeBuild: 'wood',
      nbBuild: 30, typeEarn: 'wood', nbEarn: 5, timeEarn: 30,
      timeFactors: 1000},
    {name: 'Bucheron2', timeBuild: 30, costBuild: 60, typeBuild: 'wood',
      nbBuild: 40, typeEarn: 'wood', nbEarn: 8, timeEarn: 40,
      timeFactors: 1000},
    {name: 'Bucheron3', timeBuild: 20, costBuild: 30, typeBuild: 'wood',
      nbBuild: 20, typeEarn: 'wood', nbEarn: 2, timeEarn: 20,
      timeFactors: 1000}
  ];
  listWondersWood.sort();

  const listWondersGold = [
    {name: 'Banque1', timeBuild: 30, costBuild: 50, typeBuild: 'wood',
      nbBuild: 40, typeEarn: 'gold', nbEarn: 3, timeEarn: 40,
      timeFactors: 1000},
    {name: 'Banque2', timeBuild: 10, costBuild: 30, typeBuild: 'wood',
      nbBuild: 20, typeEarn: 'gold', nbEarn: 1, timeEarn: 30,
      timeFactors: 1000},
    {name: 'Banque3', timeBuild: 30, costBuild: 60, typeBuild: 'unit',
      nbBuild: 30, typeEarn: 'gold', nbEarn: 5, timeEarn: 55,
      timeFactors: 1000}
  ];
  listWondersGold.sort();

  console.log('\nHey you two, do you wanna play ? Let\'s go !\n');

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
      city1 = new City({user: answers.nameUser1, name: answers.nameCity1,
        nameDivinity: answers.nameDivinity1, timeF: 1000,
        listW: [new Wonder(listWondersCorn[1]), new Wonder(listWondersUnit[1]),
          new Wonder(listWondersWood[1]), new Wonder(listWondersGold[1])]});
      city2 = new City({user: answers.nameUser2, name: answers.nameCity2,
        nameDivinity: answers.nameDivinity2, timeF: 1000,
        listW: [new Wonder(listWondersCorn[2]), new Wonder(listWondersUnit[2]),
          new Wonder(listWondersWood[2]), new Wonder(listWondersGold[2])]});
    }
  ).catch(
    ex => {
      // Do your error management here
      console.log(ex.stack);
    }
  );

  city1.init();
  city2.init();

  gameLoop(city1, city2);
};

main();
