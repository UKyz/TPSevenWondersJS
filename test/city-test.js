// Run : mocha ./test/divinity-test.js

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

describe.only('city.js', () => {
  describe('growCorn Event', () => {
    let g;

    before(() => {
      g = new City({
        name: 'City',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 1,
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

  describe('Units, and bornEvent', () => {
    let g;

    before(() => {
      g = new City({
        name: 'City',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 1,
        listW: {}});
      g.init();
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

      g.buyCorn(20);
      const gold = g.gold;
      const corn = g.corn;

      g.formUnit(10);
      g.gold.should.be.equal(gold - 20);
      g.corn.should.be.equal(corn - 10);
      g.nbUnits.should.be.equal(nbU + 10);

      const max = g.listUnits_[0].timeToLive;
      for (let i = 21; i <= max; i++) {
        g.checkUnit();
      }

      g.nbUnits.should.be.below(nbU);
    });
  });

  describe('Cities fighting', () => {
    let g;
    let g2;

    before(() => {
      g = new City({
        name: 'City1',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 2,
        listW: {}
      });
      g2 = new City({
        name: 'City2',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 2,
        listW: {}
      });
      g.init();
      g2.init();
    });

    after(() => {
      stub.restore();
      g.endWorld();
      g2.endWorld();
    });

    it('should update city\'s number of victoryPoints', async () => {

      g.buyCorn(10);
      g.formUnit(10);

      g.nbUnits.should.be.equal(20);

      await g.fightBegin(g2, 20);

      g.victoryPoints.should.be.equal(60);

      g.formUnit(1);

      await g.fightBegin(g2, 0);

      g2.victoryPoints.should.be.equal(50);

      await g.fightBegin(g2, -10);

      g.victoryPoints.should.be.equal(60);
      g2.victoryPoints.should.be.equal(50);

      await g.fightBegin(g2, 1000);

      g.victoryPoints.should.be.equal(60);
      g2.victoryPoints.should.be.equal(50);

      await g.fightBegin(g2, '0');

      g.victoryPoints.should.be.equal(60);
      g2.victoryPoints.should.be.equal(50);
    });
  });

  describe('Buy, sell, chop and offer resources', () => {
    let g;

    before(() => {
      g = new City({
        name: 'City',
        user: 'Moi',
        nameDivinity: 'Divinity',
        timeF: 1,
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
        timeF: 1,
        listW: [
          new Wonder({
            name: 'Test1', timeBuild: 1, costBuild: 60,
            typeBuild: 'wood', nbBuild: 30, typeEarn: 'unit', nbEarn: 5,
            timeEarn: 1, timeFactors: 1
          }),
          new Wonder({
            name: 'Test2', timeBuild: 1, costBuild: 70,
            typeBuild: 'unit', nbBuild: 15, typeEarn: 'unit', nbEarn: 5,
            timeEarn: 1, timeFactors: 1
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
