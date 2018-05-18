// Run : mocha ./tests/divinity-test.js

// Requiert chai pour fonctionner
const chai = require('chai');
// Requiert Sinon pour fonctionner (sinon.stub)
const sinon = require('sinon');
let stub = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const {City} = require('../app/city');
const {Wonder} = require('../app/wonder');

chai.use(chaiAsPromised);
chai.should();

describe('city.js', () => {
  describe('growCorn Event', () => {
    let g;

    before(() => {
      g = new City({
        name: 'City',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 10,
        listW: {}});
      g.init();
      stub = sinon.stub(Math, 'random').returns(0.999);
    });

    after(() => {
      stub.restore();
      g.endWorld();
    });

    it('should update city\'s number of corn', async () => {
      g.corn.should.be.equal(0);

      await new Promise(resolve => {
        g.worldEvents.on('growCorn', grow => {
          grow.corn.should.be.equal(1);
          resolve(); // ? Quest ce c'est ?
        });
      });

      g.corn.should.be.equal(10);
    });
  });

  describe('Units and bornEvent', () => {
    let g;

    before(() => {
      g = new City({
        name: 'City',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 100,
        listW: {}});
      g.init();
      stub = sinon.stub(Math, 'random').returns(0.999);
    });

    after(() => {
      stub.restore();
      g.endWorld();
    });

    it('should update city\'s number of units', async () => {
      g.nbUnits.should.be.equal(10);

      await new Promise(resolve => {
        g.worldEvents.on('bornUnit', born => {
          born.unit.should.be.equal(1);
          resolve(); // ? Quest ce c'est ?
        });
      });

      g.nbUnits.should.be.equal(11);
    });

    it('should update city\'s age of units', async () => {
      g.listUnits_[0].age.should.be.equal(20);

      g.checkUnit();

      g.listUnits_[0].age.should.be.equal(21);

      const nbU = g.nbUnits;

      g.gold.should.be.equal(100);
      nbU.should.be.equal(11);
      g.buyCorn(20);
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(20);

      g.formUnit(10);
      g.gold.should.be.equal(60);
      g.corn.should.be.equal(10);
      g.nbUnits.should.be.equal(21);

      const max = g.listUnits_[0].timeToLive;
      for (let i = 21; i <= max; i++) {
        g.checkUnit();
      }

      g.nbUnits.should.be.below(nbU);
    });
  });

  describe('Buy, sell, chop and offer resources', () => {
    let g;

    before(() => {
      g = new City({
        name: 'City',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 50,
        listW: {}});
      g.init();
      stub = sinon.stub(Math, 'random').returns(0.999);
    });

    after(() => {
      stub.restore();
      g.endWorld();
    });

    it('should update city\'s gold and corn', async () => {
      g.gold.should.be.equal(100);
      g.corn.should.be.equal(0);

      g.buyCorn(50);
      g.gold.should.be.equal(50);
      g.corn.should.be.equal(50);

      g.buyCorn(100);
      g.gold.should.be.equal(50);
      g.corn.should.be.equal(50);

      g.buyCorn(-10);
      g.gold.should.be.equal(50);
      g.corn.should.be.equal(50);

      g.buyCorn('10');
      g.gold.should.be.equal(50);
      g.corn.should.be.equal(50);

      g.sellCorn(30);
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(20);

      g.sellCorn(30);
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(20);

      g.sellCorn(-10);
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(20);

      g.sellCorn('10');
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(20);

      g.offeringCorn(-10);
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(20);

      g.offeringCorn('10');
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(20);

      g.offeringCorn(20);
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(0);

      g.offeringCorn(20);
      g.gold.should.be.equal(80);
      g.corn.should.be.equal(0);
    });

    it('should update city\'s gold and wood', async () => {
      g.gold.should.be.equal(80);
      g.wood.should.be.equal(0);

      g.buyWood(25);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(25);

      g.buyWood(30);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(25);

      g.buyWood(-10);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(25);

      g.buyWood('10');
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(25);

      g.offeringWood(-10);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(25);

      g.offeringWood('10');
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(25);

      g.offeringWood(20);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(5);

      g.offeringWood(20);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(5);

      await g.chopWood();
      g.wood.should.be.above(15);
      g.wood.should.be.below(25);
    });

    it('should update city\'s gold by offering', async () => {
      g.gold.should.be.equal(30);

      g.offeringGold(-10);
      g.gold.should.be.equal(30);

      g.offeringGold('10');
      g.gold.should.be.equal(30);

      g.offeringGold(20);
      g.gold.should.be.equal(10);

      g.offeringGold(20);
      g.gold.should.be.equal(10);
    });
  });

  describe('Wonders', () => {
    let g;

    before(() => {
      g = new City({
        name: 'City',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 100,
        listW: [
          new Wonder({
            name: 'Test1', timeBuild: 30, costBuild: 60,
            typeBuild: 'wood', nbBuild: 30, typeEarn: 'unit', nbEarn: 5,
            timeEarn: 40, timeFactors: 1000
          }),
          new Wonder({
            name: 'Test2', timeBuild: 40, costBuild: 70,
            typeBuild: 'unit', nbBuild: 15, typeEarn: 'unit', nbEarn: 5,
            timeEarn: 40, timeFactors: 1000
          })
        ]
      });
      g.init();
      stub = sinon.stub(Math, 'random').returns(0.999);
    });

    after(() => {
      stub.restore();
      g.endWorld();
    });

    it('should update city\'s number of wonders', async () => {
      g.nbWonders.should.be.equal(0);
      g.lenghtListWonders.should.be.equal(2);

      g.listWonders_[0].init();
      g.nbWonders.should.be.equal(1);
    });
  });
});
