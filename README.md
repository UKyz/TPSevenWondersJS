# Welcome in a practical work based on Seven Wonders! [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)


We had to implement a game based on Seven Wonders in node JS. This game is for two players, they'll fight against each other and try to be the best city. In fact you need to be the best city, but you can reach the goal in two different ways. You'll be able to win with science or also with strenght. Come on and try this game based on Seven Wonders.

## Contents
  * [Installation][Installation]
  * [Gameplay][Gameplay]
    * [The city][City]
    * [The divinity][Divinity]
    * [The unit][Unit]
    * [The wonder][Wonder]
    * [The scientists][Scientists]
  * [Contribute][Contribute]
    * [Execute the tests][Tests]
    * [Check the code style][CheckXo]
  * [Team][Team]

## Install & Play

```bash
git clone https://github.com/UKyz/TPSevenWondersJS.git
cd TPSevenWondersJS
yarn install
yarn start
```

## Gameplay
  ### The city
  You will control a city, your city. You need to bring the city on the top to win the battle.
  ### The divinity
  You will have a divinity in your city, you will be able to offer resources to the divinity and wait if the divinity blesses you in return. But be careful, the divinity is capricious.
  ### The unit
  You will have, to defend your city, some units. There can be some hapinness birth or some tragedic death in the ranks of units. You will be able to form units and prepare them to fight for you.
  ### The wonder
  You will be able to build wonders to help you win the battle. Wonders are beautiful and also very helpful to grow faster the number of resources of your city.
  ### The scientists
  You will have some scientists in your ranks, try to offer them some gold to see if they can help you and your city to be gretter. 

## Contribute 
### Execute the tests
  This project is based on the BDD method. Every classes has a test file to test if the class is good as the test requiere it. The test can also show a bogue when the class is modified. [(See what's BDD is)][BDDWiki]
  
  To test every classes : 
  
```bash
mocha
```

### Check the code style
  This project uses the framework xojs. xojs is a ESLint wrapper that enforce strict and readable code. Everything works fine with xo [(see what's xo is)][xo], if you want to check xo you just need to execute : 
  
```bash
xo
```

## Team :
  * Couton Alexia (Scientists)
  * Fauquembergue Victor (Main, Update divinity (classe given with the project), Wonder, Unit, City) 
  * Lagadec Julien (Some ideas)

[BDDWiki]: https://en.wikipedia.org/wiki/Behavior-driven_development
[xo]: https://github.com/xojs/xo
[Installation]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#install--play
[Gameplay]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#gameplay
[City]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#the-city
[Unit]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#the-unit
[Scientists]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#the-scientists
[Wonder]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#the-wonder
[Divinity]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#the-divinity
[Contribute]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#contribute
[Tests]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#execute-the-tests
[CheckXo]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#check-the-code-style
[Team]: https://github.com/UKyz/TPSevenWondersJS/blob/master/README.md#team-

