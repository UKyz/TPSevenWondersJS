class Unit {
  constructor(age, damage, timeFactor) {
    this.age_ = age || 0;
    this.damage_ = damage || 1;
    this.timeToLive_ = Math.floor(Math.random() * 61) + 20;
    this.hurted_ = false;
    this.inDefense_ = true;
    this.timeFactor_ = timeFactor || 1;
  }

  birthday() {
    this.age_++;
  }

  isAlive() {
    return (this.age_ <= this.timeToLive_);
  }

  isAgedToFight() {
    return (this.age_ >= 16);
  }

  get damage() {
    return this.damage_;
  }

  get age() {
    return this.age_;
  }

  get timeToLive() {
    return this.timeToLive_;
  }

  get hurted() {
    return this.hurted_;
  }

  gethurt() {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.hurted_) {
          this.age_ = this.timeToLive_ + 1;
        }
        resolve();
      }, this.timeFactor_ * 100);
      this.hurted_ = true;
    });
  }

  eat() {
    this.hurted_ = false;
  }

  isInDefense() {
    return this.inDefense_;
  }

  inDefense(test) {
    this.inDefense_ = (typeof test === 'boolean') ? test : this.inDefense_;
  }
}

module.exports = {Unit};
