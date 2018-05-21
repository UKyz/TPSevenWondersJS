// Run : mocha ./test/scientists-test.js

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

      g.mathematicianLvlUp(true);
      g.physicianLvlUp(true);
      g.philosopherLvlUp(true);
      g.economistLvlUp(true);
      g.architectLvlUp(true);

      g.mathematicianLvl.should.be.equal(1);
      g.physicianLvl.should.be.equal(1);
      g.philosopherLvl.should.be.equal(1);
      g.economistLvl.should.be.equal(1);
      g.architectLvl.should.be.equal(1);

      g.mathematicianLvlUp(false);
      g.physicianLvlUp(false);
      g.philosopherLvlUp(false);
      g.economistLvlUp(false);
      g.architectLvlUp(false);

      g.mathematicianLvl.should.be.equal(1);
      g.physicianLvl.should.be.equal(1);
      g.philosopherLvl.should.be.equal(1);
      g.economistLvl.should.be.equal(1);
      g.architectLvl.should.be.equal(1);
      g.mathematicianGlobalLvl.should.be.equal(2);
      g.physicianGlobalLvl.should.be.equal(2);
      g.philosopherGlobalLvl.should.be.equal(2);
      g.economistGlobalLvl.should.be.equal(2);
      g.architectGlobalLvl.should.be.equal(2);

      g.economistLvlUp(true);
      g.economistLvlUp(true);
      g.economistLvlUp(true);
      g.economistLvlUp(true);
      g.economistLvlUp(true);

      g.economistLvl.should.be.equal(4);
      g.economistGlobalLvl.should.be.equal(5);
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
      g.physicianLvl.should.be.equal(0);

      await g.economistLvlUp(true);
      await g.architectLvlUp(true);
      await g.physicianLvlUp(true);

      g.costCorn.should.be.equal(2);
      g.costWood.should.be.equal(2);
      g.lessWoodRequired.should.be.equal(2);
      g.unitsDamage_.should.be.equal(4);

      await g.architectLvlUp(true);
      g.lessWoodRequired.should.be.equal(4);
      await g.architectLvlUp(true);
      await g.architectLvlUp(true);
      await g.architectLvlUp(true);
      await g.architectLvlUp(true);
      g.lessWoodRequired.should.be.equal(10);
    });
  });
});
