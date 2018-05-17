class Scientists {
  constructor(timeFactors) {
    this.mathematicianLvl_ = 0;
    this.physicianLvl_ = 0;
    this.philosopherLvl_ = 0;
    this.economistLvl_ = 0;
    this.architectLvl_ = 0;

    this.costCorn_ = 1;
    this.costWood_ = 1;
    this.lessWoodRequired_ = 0;
    this.timeFactor_ = timeFactors;
  }

  mathematicianLvlUp() {
    if (this.mathematicianLvl_ < 5) {
      this.mathematicianLvl_++;
    }
  }

  physicianLvlUp() {
    if (this.physicianLvl_ < 5) {
      this.physicianLvl_++;
    }
  }

  philosopherLvlUp() {
    if (this.philosopherLvl_ < 5) {
      this.philosopherLvl_++;
    }
  }

  economistLvlUp() {
    if (this.economistLvl_ < 5) {
      this.economistLvl_++;
      return new Promise(resolve => {
        setTimeout(() => {
          this.costCorn_++;
          this.costWood_++;
          resolve();
        }, 50 * this.timeFactor_);
      });
    }
  }

  architectLvlUp() {
    if (this.architectLvl_ < 5) {
      this.architectLvl_++;
      return new Promise(resolve => {
        setTimeout(() => {
          this.lessWoodRequired_ += 2;
          resolve();
        }, 40 * this.timeFactor_);
      });
    }
  }

  get mathematicianLvl() {
    return this.mathematicianLvl_;
  }

  get physicianLvl() {
    return this.physicianLvl_;
  }

  get philosopherLvl() {
    return this.philosopherLvl_;
  }

  get economistLvl() {
    return this.economistLvl_;
  }

  get architectLvl() {
    return this.architectLvl_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  get costCorn() {
    return this.costCorn_;
  }

  get costWood() {
    return this.costWood_;
  }

  get lessWoodRequired() {
    return this.lessWoodRequired_;
  }
}

module.exports = {Scientists};
