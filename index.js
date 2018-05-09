const prompt = require('node-ask').prompt;
const nodeAsk = require('node-ask').ask;
const {City} = require('./app/city');

const main = async () => {

  console.log("Hey you two, do you wanna play ? Let's go !");

  var questions = [
    { key: 'nameUser1', msg: 'Player 1 what is your username? ', fn: 'prompt' },
    { key: 'nameCity1', msg: 'Player 1 what is the name of your city? ', fn: 'prompt' },
    { key: 'nameUser2', msg: 'Player 2 what is your username? ', fn: 'prompt' },
    { key: 'nameCity2', msg: 'Player 2 what is the name of your city? ', fn: 'prompt' }
  ];

  let city1;
  let city2;
  await nodeAsk(questions).then(
    function(answers) {
      city1 = new City(answers['nameUser1'], answers['nameCity1'], 1);
      city2 = new City(answers['nameUser2'], answers['nameCity2'], 1);
      //console.log(JSON.stringify(answers,0,2));
    }
  ).catch(
    function(ex) {
      // Do your error management here
      console.log(ex.stack);
    }
  );

  console.log(city1.gold);
  console.log(city1.name);

  /*const r1 = new Restaurant();
  const ordersPromises = [
    r1.order(),
    r1.order(),
    r1.order(),
    r1.order(),
    r1.order()
  ];

  const orders = await Promise.all(ordersPromises);

  // Pour toute les valeurs de orders on affiche les resultats
  orders.forEach((v, i) => console.log(`Order ${i}: ${v.order} in ${v.timer}s`));*/
};

main();