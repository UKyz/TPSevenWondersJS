const nodeAsk = require('node-ask').ask;

const Enquirer = require('enquirer');

const enquirer = new Enquirer();
enquirer.register('list', require('prompt-list'));
const figlet = require('figlet');

const {City} = require('./app/city');
const {Wonder} = require('./app/wonder');

let respondInTime;
let city1;
let city2;
const nbTurns = 3;

let endSciencePlayer1 = false;
let endSciencePlayer2 = false;
let endVictoryPointsPlayer1 = false;
let endVictoryPointsPlayer2 = false;

const play3Buy = async (city, answer, answer2) => {
  const questions3 = [
    {
      type: 'input',
      name: 'play3',
      message: [`How many units do you want to send?`,
        `(min: 0, max ${city.nbUnitsInDefense()})`].join(' ')
    }
  ];

  await enquirer.ask(questions3)
    .then(answers => {
      if (respondInTime) {
        if (answer === '1- Buy corn') {
          city.buyCorn(Number(answer2), Number(answers.play3));
        } else if (answer === '2- Buy wood') {
          city.buyWood(Number(answer2), Number(answers.play3));
        }
      }
    })
    .catch(err => {
      console.log(err);
    });

  if (!respondInTime) {
    console.log('Your action has not been played, you played too late.');
  }
};

const play2BuyBuy = async (city, answer, messageQ) => {
  const questions2 = [
    {
      type: 'input',
      name: 'play2',
      message: messageQ
    }
  ];

  await enquirer.ask(questions2)
    .then(async answers => {
      if (respondInTime) {
        await play3Buy(city, answer, answers.play2);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const play2BuySell = async city => {
  const questions2 = [
    {
      type: 'input',
      name: 'play2',
      message: `How many? (min: 0, max: ${city.corn})`
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
};

const play2Buy = async (city, answer) => {
  let messageQ = 'How many? (min: 0, max: ';
  if (answer === '1- Buy corn') {
    messageQ += `${city.gold} )`;
  } else if (answer === '2- Buy wood') {
    messageQ += `${(city.gold / 2)} )`;
  }

  if (answer === '1- Buy corn' || answer === '2- Buy wood') {
    await play2BuyBuy(city, answer, messageQ);
  } else if (answer === '3- Chop wood') {
    city.chopWood();
  } else if (answer === '4- Sell corn') {
    await play2BuySell(city);
  }

  if (!respondInTime) {
    console.log('Your action has not been played, you played too late.');
  }
};

const play2OfferCorn = async city => {
  const questions2 = [
    {
      type: 'input',
      name: 'play2',
      message: `How many? (min: 0, max: ${city.corn})`
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
};

const play2OfferWood = async city => {
  const questions2 = [
    {
      type: 'input',
      name: 'play2',
      message: `How many? (min: 0, max: ${city.wood})`
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
};

const play2OfferGold = async city => {
  const questions2 = [
    {
      type: 'input',
      name: 'play2',
      message: `How many? (min: 0, max: ${city.gold})`
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
};

const play2Offer = async (city, answer) => {
  switch (answer) {
    case '1- Corn':
      await play2OfferCorn(city);
      break;
    case '2- Wood':
      await play2OfferWood(city);
      break;
    case '3- Gold':
      await play2OfferGold(city);
      break;
    default:
  }
  if (!respondInTime) {
    console.log('Your action has not been played, you played too late.');
  }
};

const play2Wonder = async (city, answer) => {
  for (let i = 0; i < city.lenghtListWonders; i++) {
    if (`${(i + 1)} - ${city.listWonders_[i].name}` === answer) {
      city.buildWonder(i);
    }
  }
};

const play2Fight = async (cityAttack, cityDefense) => {
  const questions2 = [
    {
      type: 'input',
      name: 'play2',
      message: [`How many units do you want to use?`,
        `(min: 0, max: ${cityAttack.nbUnitsInDefense()}).`].join(' ')
    }
  ];

  await enquirer.ask(questions2)
    .then(answers => {
      if (respondInTime) {
        cityAttack.fightBegin(cityDefense, Number(answers.play2));
      }
    })
    .catch(err => {
      console.log(err);
    });
  if (!respondInTime) {
    console.log('Your action has not been played, you played too late.');
  }
};

const play2ScienceQ = async (cityPlaying, cityNotPlaying, choiceOne) => {
  const questions2 = [
    {
      type: 'list',
      name: 'play2',
      message: 'Which scientist do you want to level up?',
      choices: choiceOne
    }
  ];

  await enquirer.ask(questions2)
    .then(answers => {
      if (respondInTime) {
        switch (answers.play2) {
          case '1- Mathematician':
            cityPlaying.scientists.mathematicianLvlUp(true);
            cityNotPlaying.scientists.mathematicianLvlUp(false);
            break;
          case '2- Physician':
            cityPlaying.scientists.physicianLvlUp(true);
            cityNotPlaying.scientists.physicianLvlUp(false);
            break;
          case '3- Philosopher':
            cityPlaying.scientists.philosopherLvlUp(true);
            cityNotPlaying.scientists.philosopherLvlUp(false);
            break;
          case '4- Economist':
            cityPlaying.scientists.economistLvlUp(true);
            cityNotPlaying.scientists.economistLvlUp(false);
            break;
          case '5- Architect':
            cityPlaying.scientists.architectLvlUp(true);
            cityNotPlaying.scientists.architectLvlUp(false);
            break;
          default:
        }
      }
    })
    .catch(err => {
      console.log(err);
    });

  if (!respondInTime) {
    console.log('Your action has not been played, you played too late.');
  }
};

const play2Science = async (cityPlaying, cityNotPlaying) => {
  cityPlaying.scientists.showStatus();
  const choiceOne = [];
  if (cityPlaying.scientists.mathematicianGlobalLvl === 5) {
    choiceOne.push({
      name: '1- Mathematician', disabled: 'The Mathematician\'s' +
      ' lvl is already maximal'
    });
  } else {
    choiceOne.push('1- Mathematician');
  }
  if (cityPlaying.scientists.physicianGlobalLvl === 5) {
    choiceOne.push({
      name: '2- Physician', disabled: 'The Physician\'s' +
      ' lvl is already maximal'
    });
  } else {
    choiceOne.push('2- Physician');
  }
  if (cityPlaying.scientists.mathematicianGlobalLvl === 5) {
    choiceOne.push({
      name: '3- Philosopher', disabled: 'The Philosopher\'s' +
      ' lvl is already maximal'
    });
  } else {
    choiceOne.push('3- Philosopher');
  }
  if (cityPlaying.scientists.mathematicianGlobalLvl === 5) {
    choiceOne.push({
      name: '4- Economist', disabled: 'The Economist\'s' +
      ' lvl is already maximal'
    });
  } else {
    choiceOne.push('4- Economist');
  }
  if (cityPlaying.scientists.mathematicianGlobalLvl === 5) {
    choiceOne.push({
      name: '5- Architect', disabled: 'The Architect\'s' +
      ' lvl is already maximal'
    });
  } else {
    choiceOne.push('5- Architect');
  }

  await play2ScienceQ(cityPlaying, cityNotPlaying, choiceOne);
};

const play1Q = async (city, answer, messageQ, listChoices) => {
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
        switch (answer) {
          case '1- Buy, get or sell resources':
            await play2Buy(city, answers.play);
            break;
          case '2- Do an offering':
            await play2Offer(city, answers.play);
            break;
          case '5- Build a wonder':
            await play2Wonder(city, answers.play);
            break;
          default:
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const play1 = async (city, answer) => {
  const listChoices = [];
  let messageQ = '';
  const choiceOne = [
    '1- Buy corn',
    '2- Buy wood',
    '3- Chop wood',
    '4- Sell corn'
  ];
  const choiceTwo = [
    '1- Corn',
    '2- Wood',
    '3- Gold'
  ];
  switch (answer) {
    case '1- Buy, get or sell resources':
      listChoices.push(...choiceOne);
      messageQ = 'What do you want to buy?';
      break;
    case '2- Do an offering':
      listChoices.push(...choiceTwo);
      messageQ = 'What do you want to offer?';
      break;
    case '5- Build a wonder':
      for (let i = 0; i < city.lenghtListWonders; i++) {
        if (city.listWonders_[i].isInit) {
          listChoices.push({
            name: `${(i + 1)} - ${city.listWonders_[i].name}`,
            disabled: 'Already built'
          });
        } else {
          listChoices.push(`${(i + 1)} - ${city.listWonders_[i].name}`);
        }
      }
      messageQ = 'What do you want to build?';
      break;
    default:
  }
  await play1Q(city, answer, messageQ, listChoices);
};

function responseTime() {
  respondInTime = true;
  console.log('20 seconds to play');
  const timeout1 = setTimeout(() => {
    console.log(' 10 seconds left.');
  }, 10000);
  const timeout2 = setTimeout(() => {
    console.log(' Timeout, your play will not count.');
    respondInTime = false;
  }, 20000);
  return [timeout1, timeout2];
}

function endGame(city1, city2, i) {
  if (city1.scientists.nbLvl3 === 5 || city1.scientists.nbLvl4 === 4 ||
    city1.scientists.nbLvl5 === 3) {
    endSciencePlayer1 = true;
    return true;
  }
  if (city2.scientists.nbLvl3 === 5 || city2.scientists.nbLvl4 === 4 ||
    city2.scientists.nbLvl5 === 3) {
    endSciencePlayer2 = true;
    return true;
  }
  if (i >= nbTurns) {
    if (city1.victoryPoints > city2.victoryPoints) {
      endVictoryPointsPlayer1 = true;
      return true;
    }
    if (city1.victoryPoints < city2.victoryPoints) {
      endVictoryPointsPlayer2 = true;
      return true;
    }
    if (city1.gold > city2.gold) {
      endVictoryPointsPlayer1 = true;
      return true;
    }
    endVictoryPointsPlayer2 = true;
    return true;
  }
  return false;
}

const getListChoicesGameLoop = cityPlaying => {
  const listChoices = [
    '1- Buy, get or sell resources',
    '2- Do an offering'
  ];

  if (cityPlaying.gold >= 20 && cityPlaying.corn >= 10) {
    listChoices.push('3- Form 10 units : 20 Coins & 10 Corns');
  } else {
    listChoices.push({
      name: '3- Form 10 units : 20 Coins & 10 Corns', disabled: 'You' +
      ' need 20 Coins & 10 Corns'
    });
  }
  if (cityPlaying.corn >= cityPlaying.nbUnits) {
    listChoices.push(`4- Heal units : ${cityPlaying.nbUnits} Corns`);
  } else {
    listChoices.push({
      name: `4- Heal units : ${cityPlaying.nbUnits} Corns`, disabled:
        'You do not have any resources'
    });
  }
  listChoices.push('5- Build a wonder', '6- Prepare for an attack', '7-' +
    ' Level up scientists');

  return listChoices;
};

const gameLoop = async (city1, city2) => {
  console.log('\n');
  console.log(`Welcome to our game ${city1.user} and ${city2.user}.`);

  let game = false;
  let i = 0;

  while (!game) {
    const cityPlaying = (i % 2) ? city2 : city1;
    const cityNotPlaying = (i % 2) ? city1 : city2;

    const message = `Time to play ${cityPlaying.user}.`;
    console.log('\n================================');
    cityPlaying.showStatus();
    console.log('================================');
    const timeouts = responseTime();

    const listChoices = getListChoicesGameLoop(cityPlaying);
    const questions = [
      {
        type: 'list',
        name: 'play',
        message: `${message} What's your play?`,
        choices: listChoices
      }
    ];
    /* eslint-disable-next-line no-await-in-loop */
    await enquirer.ask(questions)
      .then(async answers => {
        if (respondInTime) {
          switch (answers.play) {
            case '3- Form 10 units : 20 Coins & 10 Corns':
              cityPlaying.formUnit(10);
              break;
            case '6- Prepare for an attack':
              await play2Fight(cityPlaying, cityNotPlaying);
              break;
            case '7- Level up scientists':
              await play2Science(cityPlaying, cityNotPlaying);
              break;
            default:
              await play1(cityPlaying, answers.play);
              break;
          }
        }
        timeouts.forEach(t => clearTimeout(t));
      })
      .catch(err => {
        console.log(err);
      });

    game = endGame(city1, city2, i++);
  }
};

const bigText = async text => {
  await new Promise(resolve => {
    figlet(text, (err, data) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data);
      resolve();
    });
  });
};

const messageWin = async () => {
  if (endSciencePlayer1 || endVictoryPointsPlayer1) {
    await bigText(`${city1.user} wins`);
  } else if (endSciencePlayer2 || endVictoryPointsPlayer2) {
    await bigText(`${city2.user} wins`);
  }
};

const main = async () => {
  await bigText('TPSevenWonders');

  const listWondersCorn = [
    {
      name: 'Bonta\'s field', timeBuild: 30, costBuild: 40,
      typeBuild: 'corn', nbBuild: 30, typeEarn: 'corn', nbEarn: 5, timeEarn: 20,
      timeFactors: 1000
    },
    {
      name: 'The Corn\'s Factory', timeBuild: 30, costBuild: 50,
      typeBuild: 'corn', nbBuild: 40, typeEarn: 'corn', nbEarn: 10,
      timeEarn: 20, timeFactors: 1000
    },
    {
      name: 'Mister Potato\'s field', timeBuild: 25, costBuild: 50,
      typeBuild: 'wood', nbBuild: 30, typeEarn: 'corn', nbEarn: 7, timeEarn: 20,
      timeFactors: 1000
    }
  ];
  listWondersCorn.sort();

  const listWondersUnit = [
    {
      name: 'US Army', timeBuild: 30, costBuild: 60, typeBuild: 'wood',
      nbBuild: 30, typeEarn: 'unit', nbEarn: 5, timeEarn: 40,
      timeFactors: 1000
    },
    {
      name: 'The FBI', timeBuild: 40, costBuild: 70, typeBuild: 'unit',
      nbBuild: 15, typeEarn: 'unit', nbEarn: 5, timeEarn: 40,
      timeFactors: 1000
    },
    {
      name: 'Ninja\'s school', timeBuild: 30, costBuild: 60, typeBuild: 'unit',
      nbBuild: 20, typeEarn: 'unit', nbEarn: 7, timeEarn: 50,
      timeFactors: 1000
    }
  ];
  listWondersUnit.sort();

  const listWondersWood = [
    {
      name: 'The wood\'s Factory', timeBuild: 30, costBuild: 50,
      typeBuild: 'wood', nbBuild: 30, typeEarn: 'wood', nbEarn: 5, timeEarn: 30,
      timeFactors: 1000
    },
    {
      name: 'Woodcutter\'s House', timeBuild: 30, costBuild: 60,
      typeBuild: 'wood', nbBuild: 40, typeEarn: 'wood', nbEarn: 8, timeEarn: 40,
      timeFactors: 1000
    },
    {
      name: 'The Canadians', timeBuild: 20, costBuild: 30, typeBuild: 'wood',
      nbBuild: 20, typeEarn: 'wood', nbEarn: 2, timeEarn: 20,
      timeFactors: 1000
    }
  ];
  listWondersWood.sort();

  const listWondersGold = [
    {
      name: 'The GNB building', timeBuild: 30, costBuild: 50, typeBuild: 'wood',
      nbBuild: 40, typeEarn: 'gold', nbEarn: 3, timeEarn: 40,
      timeFactors: 1000
    },
    {
      name: 'Gringotts Wizarding Bank', timeBuild: 10, costBuild: 30,
      typeBuild: 'wood', nbBuild: 20, typeEarn: 'gold', nbEarn: 1, timeEarn: 30,
      timeFactors: 1000
    },
    {
      name: 'National Bank', timeBuild: 30, costBuild: 60, typeBuild: 'unit',
      nbBuild: 30, typeEarn: 'gold', nbEarn: 5, timeEarn: 55,
      timeFactors: 1000
    }
  ];
  listWondersGold.sort();

  console.log('\nHey you two, do you wanna play ? Let\'s go !\n');

  const questions = [
    {
      key: 'nameUser1', msg: 'Player 1 what is your username? ',
      fn: 'prompt'
    },
    {
      key: 'nameCity1', msg: 'Player 1 what is the name of your city? ',
      fn: 'prompt'
    },
    {
      key: 'nameDivinity1', msg: 'Player 1 what is the name of your divinity? ',
      fn: 'prompt'
    },
    {
      key: 'nameUser2', msg: 'Player 2 what is your username? ',
      fn: 'prompt'
    },
    {
      key: 'nameCity2', msg: 'Player 2 what is the name of your city? ',
      fn: 'prompt'
    },
    {
      key: 'nameDivinity2', msg: 'Player 2 what is the name of your divinity? ',
      fn: 'prompt'
    }
  ];

  await nodeAsk(questions).then(
    answers => {
      city1 = new City({
        user: answers.nameUser1, name: answers.nameCity1,
        nameDivinity: answers.nameDivinity1, timeF: 1000,
        listW: [new Wonder(listWondersCorn[1]), new Wonder(listWondersUnit[1]),
          new Wonder(listWondersWood[1]), new Wonder(listWondersGold[1])]
      });
      city2 = new City({
        user: answers.nameUser2, name: answers.nameCity2,
        nameDivinity: answers.nameDivinity2, timeF: 1000,
        listW: [new Wonder(listWondersCorn[2]), new Wonder(listWondersUnit[2]),
          new Wonder(listWondersWood[2]), new Wonder(listWondersGold[2])]
      });
    }
  ).catch(
    ex => {
      // Do your error management here
      console.log(ex.stack);
    }
  );

  city1.init();
  city2.init();

  await gameLoop(city1, city2);
  city1.endWorld();
  city2.endWorld();
  await messageWin();
};

main();
