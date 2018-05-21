# Welcome in a practical work based on Seven Wonders! [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)


We had to implement a game based on Seven Wonders in node JS. This game is for two players, they'll fight against each other and try to be the best city. In fact you need to be the best city, but you can reach the goal in two different ways. You'll be able to win with science or also with strenght. Come on and try this game based on Seven Wonders.

Feel free to contribute or discuss the game.

## Contents
  * [Installation][Installation]
  * [Gameplay][Gameplay]
    * [The city][City]
    * [The divinity][Divinity]
    * [The units][Unit]
    * [The wonders][Wonder]
    * [The scientists][Scientists]
  * [Contribute][Contribute]
    * [Execute the tests][Tests]
    * [Check the code style][CheckXo]
  * [Team][Team]

## Install & Play

```
git clone https://github.com/UKyz/TPSevenWondersJS.git
cd TPSevenWondersJS
yarn install
yarn start
```

## Gameplay
 The goal of the game is to win over the rival city. You will have, at your service, a city full of resources, units, scientists, wonders and also a divinity to believe in. As a master of the city, you will be able to do a lot of actions. First of all, you will need some units to defend the land, because the enemy can come over at every moment and attack your city. If they win, they will steal a lot of resources. Despite that you can also attack the rival whenever you want.
 Then you will need resources to operate, you will be able to buy, chop and sell resources. You will manage your stocks of gold, corn and wood. Gold will be usefull for everything, you will need corn to heal your units most of the time, and finally wood will be precious to build wonders and help your city to grow faster.
 Every city has a divinity, so that you will be having one too. You will need to be kind with your pray, because the divinity is a little bit capricious. By offering resources to the divinity, you will be able to receive some favors or blessings. This can be helpfull in the tough moments.
 And finally your city will have some clever guys. The scientists need some gold to be smarter, but the scientists can be the key of winning. Indeed you can win by science if your clever guys are high evolved.
 
  ### The city
  You will control a city, your city. You need to bring the city at the top to win the battle.
  ### The divinity
  You will have a divinity in your city, you will be able to offer resources to the divinity. Wait and see if the divinity blesses you in return. But be careful, the divinity is capricious.
  ### The units
  You will have, to defend your city, some units. There can be some hapinness birth or some tragedic death in the ranks of units. You will be able to form units and prepare them to fight for you.
  ### The wonders
  You will be able to build wonders to help you win the battle. Wonders are beautiful and also very helpful to grow faster the number of resources of your city.
  ### The scientists
  You will have some scientists in your ranks, try to offer them some gold to see if they can help you and your city to be gretter. 
  

## Contribute 
### Execute the tests
  This project is based on the BDD method. Every classes has a test file to test what's required to be executed. The test can also show a bogue when the class is modified. [(See what's BDD is)][BDDWiki]
  
  To test every classes : 
  
```bash
mocha
```

### Check the code style
  This project uses the framework xojs. xojs is a ESLint wrapper that enforce strict and readable code. Everything works fine with xo [(See what's xo is)][xo], if you want to check xo you just need to execute : 
  
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

