const EventEmitter = require('events');

class Wonder {
  constructor(object) {
    this.name_ = object.name;
    this.timeBuilding_ = object.timeBuild;
    this.costBuilding_ = object.costBuild;
    this.typeOfProductToBuild_ = object.typeBuild;
    this.nbOfProductToBuild_ = object.nbBuild;
    this.typeOfProductEarned_ = object.typeEarn;
    this.nbOfProductEarned_ = object.nbEarn;
    this.timeBetweenEarning_ = object.timeEarn;
    this.worldEvents = new EventEmitter();
    this.timeFactor_ = object.timeFactors;
    this.isInit_ = false;
  }

  init() {
    this.isInit_ = true;
    setTimeout(() => {
      this.interval_ = setInterval(() => {
        switch (this.typeOfProductEarned_) {
          case 'corn':
            this.worldEvents.emit('wonderEarnCorn', this.nbOfProductEarned_);
            break;
          case 'gold':
            this.worldEvents.emit('wonderEarnGold', this.nbOfProductEarned_);
            break;
          case 'wood':
            this.worldEvents.emit('wonderEarnWood', this.nbOfProductEarned_);
            break;
          case 'unit':
            this.worldEvents.emit('wonderEarnUnit', this.nbOfProductEarned_);
            break;
          default:
        }
      }, this.timeFactor_ * this.timeBetweenEarning_);
    }, this.timeFactor_ * this.timeBuilding_);
  }

  get name() {
    return this.name_;
  }

  get isInit() {
    return this.isInit_;
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

  showStatus() {
    return this.name_ + ' : Time : ' + this.timeBuilding_ + ' | Cost : ' +
      this.costBuilding_ + ' Coins + ' + this.nbOfProductToBuild_ + ' ' +
      this.typeOfProductToBuild_ + '\nEarning : Time : ' +
      this.timeBetweenEarning_ + ' | Product ' + this.nbOfProductEarned_ +
      ' ' + this.typeOfProductEarned_;
  }

  endWorld() {
    clearInterval(this.interval_);
  }
}

module.exports = {Wonder};
