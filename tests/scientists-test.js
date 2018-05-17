// Run : mocha ./tests/scientists-test.js

// Requiert chai pour fonctionner
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Scientists} = require('../app/scientists');

chai.use(chaiAsPromised);
chai.should();

describe('scientists.js', () => {
  describe('Level up', () => {
    let g;

    before(() => {
      g = new Scientists(1);
    });

    after(() => {
    });

    it('should increment levels', async () => {
      g.mathematicianLvl.should.be.equal(0);
      g.physicianLvl.should.be.equal(0);
      g.philosopherLvl.should.be.equal(0);
      g.economistLvl.should.be.equal(0);
      g.architectLvl.should.be.equal(0);

      g.mathematicianLvlUp();
      g.physicianLvlUp();
      g.philosopherLvlUp();
      g.economistLvlUp();
      g.architectLvlUp();

      g.mathematicianLvl.should.be.equal(1);
      g.physicianLvl.should.be.equal(1);
      g.philosopherLvl.should.be.equal(1);
      g.economistLvl.should.be.equal(1);
      g.architectLvl.should.be.equal(1);

      g.economistLvlUp();
      g.economistLvlUp();
      g.economistLvlUp();
      g.economistLvlUp();
      g.economistLvlUp();

      g.economistLvl.should.be.equal(5);
    });
  });

  describe('Costs of resources', () => {
    let g;

    before(() => {
      g = new Scientists(1);
    });

    after(() => {
    });

    it('should change the resources features', async () => {
      g.economistLvl.should.be.equal(0);
      g.architectLvl.should.be.equal(0);

      await g.economistLvlUp();
      await g.architectLvlUp();

      g.costCorn.should.be.equal(2);
      g.costWood.should.be.equal(2);
      g.lessWoodRequired.should.be.equal(2);

      await g.architectLvlUp();
      g.lessWoodRequired.should.be.equal(4);
      await g.architectLvlUp();
      await g.architectLvlUp();
      await g.architectLvlUp();
      await g.architectLvlUp();
      g.lessWoodRequired.should.be.equal(10);
    });
  });
});