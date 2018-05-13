# Welcome in a practical work based on Seven Wonders! [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)


For this project we had to implement a game based on Seven Wonders in node JS.

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
  This project use the framework xojs. xojs is a ESLint wrapper that enforce strict and readable code. Everything works fine with xo, if you want to check xo you just need to run : 
  
```bash
xo
```

## Team :
  Couton Alexia

Using : https://www.npmjs.com/package/node-ask#asking-multiple-questions-in-one-call 

[TDDWiki]: https://en.wikipedia.org/wiki/Test-driven_development#Test_structure
