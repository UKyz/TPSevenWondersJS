class Wonder {
  constructor(time, costBuild, typeBuild, nbBuild, typeEarn, nbEarn, timeEarn) {
    this.timeBuilding_ = time || 0;
    this.costBuilding_ = costBuild || 0;
    this.typeOfProductToBuild_ = typeBuild || 0;
    this.nbOfProductToBuild_ = nbBuild || 0;
    this.typeOfProductEarned_ = typeEarn || 0;
    this.nbOfProductEarned_ = nbEarn || 0;
    this.timeBetweenEarning_ = timeEarn || 0;
    // This.worldEvents_ = new EventEmitter();
    // This.timeFactor_ = timeFactor || 1000;
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
}
