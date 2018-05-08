class Scientists {
  constructor() {
    this.mathematicianLvl_ = 0;
    this.physicianLvl_ = 0;
    this.philosopherLvl_ = 0;
    this.economistLvl_ = 0;
    this.architectLvl_ = 0;
    // This.worldEvents_ = new EventEmitter();
    // This.timeFactor_ = timeFactor || 1000;
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
}
