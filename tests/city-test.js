// Run : mocha ./tests/divinity-test.js

// Requiert chai pour fonctionner
const chai = require('chai');
// Requiert Sinon pour fonctionner (sinon.stub)
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const {City} = require('../app/city');

chai.use(chaiAsPromised);
chai.should();

describe('city.js', () => {
  describe('bornEvent', () => {
    let g;

    before(() => {
      g = new City('Player 1', 'Moi', 1);
      g.init();
      stub = sinon.stub(Math, 'random').returns(0.999);
    });

    after(() => {
      stub.restore();
      g.endWorld();
    });

    it('should have emitted born', async () => {
      await new Promise(resolve => {
        g.worldEvents.on('bornUnit', born => {
          born.unit.should.be.equal(1);
          resolve(); // ? Quest ce c'est ?
        });
      });
    });

    it('should have emitted corn', async () => {
      await new Promise(resolve => {
        g.worldEvents.on('growCorn', grow => {
          grow.corn.should.be.equal(1);
          resolve(); // ? Quest ce c'est ?
        });
      });
    });
  });

  describe('City', () => {
    let g;

    before(() => {
      g = new City('Player 1', 'Moi', 1);
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
    });

    it('should update city\'s gold and wood', async () => {
      g.gold.should.be.equal(50);
      g.wood.should.be.equal(0);

      g.buyWood(10);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(10);

      g.buyWood(25);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(10);

      g.buyWood(-10);
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(10);

      g.buyWood('10');
      g.gold.should.be.equal(30);
      g.wood.should.be.equal(10);
    });
  });
});
