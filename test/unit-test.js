// Run : mocha ./test/divinity-test.js

// Requiert chai pour fonctionner
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Unit} = require('../app/unit');

chai.use(chaiAsPromised);
chai.should();

describe('unit.js', () => {
  describe('Unit Birth', () => {
    let g;

    before(() => {
      g = new Unit();
    });

    after(() => {
    });

    it('should create a baby unit', async () => {
      g.age.should.be.equal(0);
      g.damage.should.be.equal(1);
      g.timeToLive.should.be.above(19);
      g.timeToLive.should.be.below(81);
      g.isAlive().should.be.equal(true);
      g.hurted.should.be.equal(false);
      g.isInDefense().should.be.equal(true);

      g.birthday();

      g.age.should.be.equal(1);

      g.gethurt();
      g.hurted.should.be.equal(true);

      g.eat();
      g.hurted.should.be.equal(false);

      g.inDefense(false);
      g.isInDefense().should.be.equal(false);

      await g.gethurt();
      g.hurted.should.be.equal(true);
      g.isAlive().should.be.equal(false);
    });
  });

  describe('Unit Trained', () => {
    let g;

    before(() => {
      g = new Unit(16);
    });

    after(() => {
    });

    it('should create a trained unit', async () => {
      g.age.should.be.equal(16);
      g.damage.should.be.equal(1);
      g.timeToLive.should.be.above(19);
      g.timeToLive.should.be.below(81);
      g.isAgedToFight().should.be.equal(true);
      g.isAlive().should.be.equal(true);

      g.birthday();

      g.age.should.be.equal(17);
    });
  });

  describe('Unit Too Old', () => {
    let g;

    before(() => {
      g = new Unit(81);
    });

    after(() => {
    });

    it('should create an old Unit', async () => {
      g.age.should.be.equal(81);
      g.isAlive().should.be.equal(false);
    });
  });
});
