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
    this.unitsDamage_ = 1;
    this.timeFactor_ = timeFactors;

    this.nbLvl3_ = 0;
    this.nbLvl4_ = 0;
    this.nbLvl5_ = 0;
  }

  mathematicianLvlUp(test) {
    if (this.mathematicianGlobalLvl_ < 5) {
      this.mathematicianGlobalLvl_++;
      if (test === true) {
        this.mathematicianLvl_++;
        if (this.mathematicianLvl_ === 3) {
          this.nbLvl3_++;
        } else if (this.mathematicianLvl_ === 4) {
          this.nbLvl4_++;
        } else if (this.mathematicianLvl_ === 5) {
          this.nbLvl5_++;
        }
      }
    }
  }

  physicianLvlUp(test) {
    if (this.physicianGlobalLvl_ < 5) {
      this.physicianGlobalLvl_++;
      if (test === true) {
        this.physicianLvl_++;
        if (this.physicianLvl_ === 3) {
          this.nbLvl3_++;
        } else if (this.physicianLvl_ === 4) {
          this.nbLvl4_++;
        } else if (this.physicianLvl_ === 5) {
          this.nbLvl5_++;
        }
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
        if (this.philosopherLvl_ === 3) {
          this.nbLvl3_++;
        } else if (this.philosopherLvl_ === 4) {
          this.nbLvl4_++;
        } else if (this.philosopherLvl_ === 5) {
          this.nbLvl5_++;
        }
      }
    }
  }

  economistLvlUp(test) {
    if (this.economistGlobalLvl_ < 5) {
      this.economistGlobalLvl_++;
      if (test === true) {
        this.economistLvl_++;
        if (this.economistLvl_ === 3) {
          this.nbLvl3_++;
        } else if (this.economistLvl_ === 4) {
          this.nbLvl4_++;
        } else if (this.economistLvl_ === 5) {
          this.nbLvl5_++;
        }
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
        if (this.architectLvl_ === 3) {
          this.nbLvl3_++;
        } else if (this.architectLvl_ === 4) {
          this.nbLvl4_++;
        } else if (this.architectLvl_ === 5) {
          this.nbLvl5_++;
        }
        return new Promise(resolve => {
          setTimeout(() => {
            this.lessWoodRequired_ += 2;
            resolve();
          }, 40 * this.timeFactor_);
        });
      }
    }
  }

  showStatus() {
    console.log('Mathematician : ' + this.mathematicianLvl_ + ' / ' +
      (5 - (this.mathematicianGlobalLvl - this.mathematicianLvl_)));
    console.log('Physician : ' + this.physicianLvl_ + ' / ' +
      (5 - (this.physicianGlobalLvl - this.physicianLvl_)));
    console.log('Philosopher : ' + this.philosopherLvl_ + ' / ' +
      (5 - (this.philosopherGlobalLvl - this.philosopherLvl_)));
    console.log('Economist : ' + this.economistLvl_ + ' / ' +
      (5 - (this.economistGlobalLvl - this.economistLvl_)));
    console.log('Architect : ' + this.architectLvl_ + ' / ' +
      (5 - (this.architectGlobalLvl - this.architectLvl_)));
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

  get unitsDamage() {
    return this.unitsDamage_;
  }

  get nbLvl3() {
    return this.nbLvl3_;
  }

  get nbLvl4() {
    return this.nbLvl4_;
  }

  get nbLvl5() {
    return this.nbLvl5_;
  }
}

module.exports = {Scientists};
