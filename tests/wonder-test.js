// Run : mocha ./tests/divinity-test.js

// Requiert chai pour fonctionner
const chai = require('chai');
// Requiert Sinon pour fonctionner (sinon.stub)
const sinon = require('sinon');
let stub = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const {Wonder} = require('../app/wonder');

chai.use(chaiAsPromised);
chai.should();

describe('wonder.js', () => {
  describe('Wonder', () => {
    let g;

    before(() => {
      g = new Wonder(new Object({
        timeBuild : 5,
        costBuild : 2,
        typeBuild : 'wood',
        nbBuild : 2,
        typeEarn : 'corn',
        nbEarn : 1,
        timeEarn : 10,
        timeFactors : 10}));
      g.init();
      stub = sinon.stub(Math, 'random').returns(0.999);
    });

    after(() => {
      stub.restore();
      g.endWorld();
    });

    it('should initialize the wonder', async () => {
      g.timeBuilding.should.be.equal(5);
      g.costBuilding.should.be.equal(2);
      g.typeOfProductionToBuild.should.be.equal('wood');
      g.nbOfProductToBuild.should.be.equal(2);
      g.typeOfProductEarned.should.be.equal('corn');
      g.nbOfProductEarned.should.be.equal(1);
      g.timeBetweenEarning.should.be.equal(10);
      g.timeFactor.should.be.equal(10);
    });

    it('should earn new resources', async () => {

      await new Promise(resolve => {
        g.worldEvents.on('wonderEarn', earn => {
          earn.corn.should.be.equal(g.nbOfProductEarned);
          resolve(); // ? Quest ce c'est ?
        });
      });

    });

  });
});