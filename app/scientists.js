class Scientists {
  constructor(timeFactors) {
    this.mathematicianLvl_ = 0;
    this.physicianLvl_ = 0;
    this.philosopherLvl_ = 0;
    this.economistLvl_ = 0;
    this.architectLvl_ = 0;
    this.mathematicianGlobalLvl_ = 0;
    this.physicianGlobalLvl_ = 0;
    this.philosopherGlobalLvl_ = 0;
    this.economistGlobalLvl_ = 0;
    this.architectGlobalLvl_ = 0;

    this.costCorn_ = 1;
    this.costWood_ = 1;
    this.lessWoodRequired_ = 0;
    this.unitsDamage_ = 0;
    this.timeFactor_ = timeFactors;
  }

  mathematicianLvlUp(test) {
    if (this.mathematicianGlobalLvl_ < 5) {
      this.mathematicianGlobalLvl_++;
      if (test === true) {
        this.mathematicianLvl_++;
      }
    }
  }

  physicianLvlUp(test) {
    if (this.physicianGlobalLvl_ < 5) {
      this.physicianGlobalLvl_++;
      if (test === true) {
        this.physicianLvl_++;
        return new Promise(resolve => {
          setTimeout(() => {
            this.unitsDamage_ += 3;
            resolve();
          }, 40 * this.timeFactor_);
        });
      }
    }
  }

  philosopherLvlUp(test) {
    if (this.philosopherGlobalLvl_ < 5) {
      this.philosopherGlobalLvl_++;
      if (test === true) {
        this.philosopherLvl_++;
      }
    }
  }

  economistLvlUp(test) {
    if (this.economistGlobalLvl_ < 5) {
      this.economistGlobalLvl_++;
      if (test === true) {
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
  }

  architectLvlUp(test) {
    if (this.architectGlobalLvl_ < 5) {
      this.architectGlobalLvl_++;
      if (test === true) {
        this.architectLvl_++;
        return new Promise(resolve => {
          setTimeout(() => {
            this.lessWoodRequired_ += 2;
            resolve();
          }, 40 * this.timeFactor_);
        });
      }
    }
  }

  get mathematicianLvl() {
    return this.mathematicianLvl_;
  }

  get mathematicianGlobalLvl() {
    return this.mathematicianGlobalLvl_;
  }

  get physicianLvl() {
    return this.physicianLvl_;
  }

  get physicianGlobalLvl() {
    return this.physicianGlobalLvl_;
  }

  get philosopherLvl() {
    return this.philosopherLvl_;
  }

  get philosopherGlobalLvl() {
    return this.philosopherGlobalLvl_;
  }

  get economistLvl() {
    return this.economistLvl_;
  }

  get economistGlobalLvl() {
    return this.economistGlobalLvl_;
  }

  get architectLvl() {
    return this.architectLvl_;
  }

  get architectGlobalLvl() {
    return this.architectGlobalLvl_;
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
