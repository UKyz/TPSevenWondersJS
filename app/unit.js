class Unit {
  constructor(age, damage) {
    this.age_ = age || 0;
    this.damage_ = damage || 1;
    this.timeToLive_ = Math.floor(Math.random() * 61) + 20;
    this.hurted_ = false;
    this.inDefense_ = true;
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
    this.hurted_ = true;
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
