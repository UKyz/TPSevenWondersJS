# Welcome in a practical work based on Seven Wonders! [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)


For this project we had to implement a game based on Seven Wonders in node JS. In this game for two players, they'll fight against each other and try to be the best city. In fact you need to be the best city, but you can reach the goal in two different ways. You'll be able to win with science or also with strenght. Come on and try this game based on Seven Wonders.

## Gameplay :
  ### The city
  You will control a city, your city. You need to bring the city on the top to win the battle.
  ### The divinty
  You will have a divinity in your city, you will be able to offer resources to the divinity and wait if the divinity blesses you in return. But be careful, the divinity is capricious.
  ### The unit
  You will have, to defend your city, some units. There can be some hapinness birth or some tragedic death in the ranks of units. You will be able to form units and prepare them to fight for you.
  ### The wonder
  You will be able to build wonders to help you win the battle. Wonders are beautiful and also very helpful to grow faster the number of resources of your city.
  ### The scientist 
  You will have some scientists in your ranks, try to offer them some gold to see if they can help you and your city to be gretter. 
  

## Install : 
  Clone the directory git :
  
```bash
git clone https://github.com/UKyz/TPSevenWondersJS
```

## Execute the game :
  Execute the file 'index.js' :
  
```bash
node index.js
```

## Execute the tests :
  This project is based on the TDD method. Every classes has a test file to test if the class is good as the test requiere it. The test can also show a bogue when the class is modified. [(See what's TDD is)][TDDWiki]
  
  For exemple to test the divinity's class : 
  
```bash
mocha ./tests/divinity-test
```

## Check the code style :
  This project uses the framework xojs. xojs is a ESLint wrapper that enforce strict and readable code. Everything works fine with xo, if you want to check xo you just need to excute : 
  
```bash
xo
```

## Dependencies :
  This project uses yarn to have a fast, reliable, and secure dependency management. [(See what's yarn is)][yarn]
  * [chai][chai]
  * [node-ask][node-ask]
  * [sinon][sinon]
  * [chai-p][chai-p]

## Team :
  * Couton Alexia
  * Fauquembergue Victor
  * Laguadec Julien

[TDDWiki]: https://en.wikipedia.org/wiki/Test-driven_development#Test_structure
[chai]: https://www.npmjs.com/package/chai
[node-ask]: https://www.npmjs.com/package/node-ask
[sinon]: https://www.npmjs.com/package/sinon
[chai-p]: https://www.npmjs.com/package/chai-as-promised
[yarn]: https://github.com/yarnpkg/yarn

