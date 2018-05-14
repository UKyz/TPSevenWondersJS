// Run : mocha ./tests/divinity-test.js

// Requiert chai pour fonctionner
const chai = require('chai');
// Requiert Sinon pour fonctionner (sinon.stub)
const sinon = require('sinon');
let stub = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const {City} = require('../app/city');

chai.use(chaiAsPromised);
chai.should();

describe('city.js', () => {
  describe('growCorn Event', () => {
    let g;

    before(() => {
      g = new City('Moi', 'City', 'Divinity', 10);
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
      g = new City('Moi', 'City', 'Divinity', 100);
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
  });

  describe('City', () => {
    let g;

    before(() => {
      g = new City('Moi', 'City', 'Divinity', 50);
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

      g.sellCorn(50);
      g.gold.should.be.equal(100);
      g.corn.should.be.equal(0);

      g.sellCorn(10);
      g.gold.should.be.equal(100);
      g.corn.should.be.equal(0);

      g.sellCorn(-10);
      g.gold.should.be.equal(100);
      g.corn.should.be.equal(0);

      g.sellCorn('10');
      g.gold.should.be.equal(100);
      g.corn.should.be.equal(0);
    });

    it('should update city\'s gold and wood', async () => {
      g.gold.should.be.equal(100);
      g.wood.should.be.equal(0);

      g.buyWood(25);
      g.gold.should.be.equal(50);
      g.wood.should.be.equal(25);

      g.buyWood(30);
      g.gold.should.be.equal(50);
      g.wood.should.be.equal(25);

      g.buyWood(-10);
      g.gold.should.be.equal(50);
      g.wood.should.be.equal(25);

      g.buyWood('10');
      g.gold.should.be.equal(50);
      g.wood.should.be.equal(25);

      await g.chopWood();
      g.wood.should.be.above(35);
      g.wood.should.be.below(45);
    });
  });
});
