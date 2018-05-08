class City {
  constructor(user, name, timeFactor) {
    this.name_ = name || 'UNKCITY';
    this.user_ = user || 'Bob l\'éponge';
    this.corn_ = 0;
    this.gold_ = 0;
    this.wood_ = 0;
    this.listUnits_ = [];
    this.listWonders_ = [];
    // This.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      if (Math.random() > 0.90) {
        this.worldEvents.emit('bornUnit', {
          unit: 1
        });
      }

      if (Math.random() > 0.90) {
        this.worldEvents.emit('deathUnit', {
          unit: 1
        });
      }

      /*
        If (Math.random() > 0.99) {
        this.worldEvents.emit('retribution', Math.floor(10000 * Math.random()));
      }
      */
    }, this.timeFactor);
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get name() {
    return this.name_;
  }

  get unit() {
    return this.nbUnits_;
  }

  get user() {
    return this.user_;
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

  get timeFactor() {
    return this.timeFactor_;
  }
}
