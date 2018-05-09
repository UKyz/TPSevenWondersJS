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
      g = new City("Player 1", "Moi", 1);
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
  });
});