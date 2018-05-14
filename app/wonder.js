const EventEmitter = require('events');

class Wonder {
  constructor(object) {
    this.timeBuilding_ = object.timeBuild;
    this.costBuilding_ = object.costBuild;
    this.typeOfProductToBuild_ = object.typeBuild;
    this.nbOfProductToBuild_ = object.nbBuild;
    this.typeOfProductEarned_ = object.typeEarn;
    this.nbOfProductEarned_ = object.nbEarn;
    this.timeBetweenEarning_ = object.timeEarn;
    this.worldEvents = new EventEmitter();
    this.timeFactor_ = object.timeFactors;
  }

  init() {
    setTimeout(() => {
      this.gaiaInterval_ = setInterval(() => {
        if (this.typeOfProductEarned_ === 'corn') {
          this.worldEvents.emit('wonderEarn', {
            corn: this.nbOfProductEarned_
          });
        } else if (this.typeOfProductEarned_ === 'gold') {
          this.worldEvents.emit('wonderEarn', {
            gold: this.nbOfProductEarned_
          });
        } else if (this.typeOfProductEarned_ === 'wood') {
          this.worldEvents.emit('wonderEarn', {
            wood: this.nbOfProductEarned_
          });
        } else if (this.typeOfProductEarned_ === 'unit') {
          this.worldEvents.emit('wonderEarn', {
            unit: this.nbOfProductEarned_
          });
        }
      }, this.timeFactor_ * this.timeBetweenEarning_);
    }, this.timeFactor_ * this.timeBuilding_);
  }

  get timeBuilding() {
    return this.timeBuilding_;
  }

  get costBuilding() {
    return this.costBuilding_;
  }

  get typeOfProductionToBuild() {
    return this.typeOfProductToBuild_;
  }

  get nbOfProductToBuild() {
    return this.nbOfProductToBuild_;
  }

  get typeOfProductEarned() {
    return this.typeOfProductEarned_;
  }

  get nbOfProductEarned() {
    return this.nbOfProductEarned_;
  }

  get timeBetweenEarning() {
    return this.timeBetweenEarning_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  endWorld() {
    clearInterval(this.gaiaInterval_);
  }
}

module.exports = {Wonder};
