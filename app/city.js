const EventEmitter = require('events');

class City {
  constructor(user, name, timeFactor) {
    this.name_ = name || 'UNKCITY';
    this.user_ = user || 'Bob l\'éponge';
    this.corn_ = 0;
    this.gold_ = 0;
    this.wood_ = 0;
    this.listUnits_ = [];
    this.listWonders_ = [];
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      if (Math.random() > 0.90) {
        this.worldEvents.emit('bornUnit', {
          unit: 1
        });
      }
    }, this.timeFactor);
    this.gaiaInterval2_ = setInterval(() => {
      this.worldEvents.emit('growCorn', {
        corn: 1
      });
    }, 10*this.timeFactor);
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get corn() {
    return this.corn_;
  }

  get gold() {
    return this.gold_;
  }

  get wood() {
    return this.wood_;
  }

  get name() {
    return this.name_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  endWorld() {
    clearInterval(this.gaiaInterval_);
    clearInterval(this.gaiaInterval2_);
  }
}

module.exports = {City};
