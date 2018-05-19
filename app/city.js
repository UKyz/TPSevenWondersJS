const EventEmitter = require('events');
const {Divinity} = require('../app/divinity');
const {Unit} = require('../app/unit');

class City {
  constructor(object) {
    this.name_ = object.name || 'UNKCITY';
    this.user_ = object.user || 'Ted Mosby Architecte';
    this.corn_ = 0;
    this.gold_ = 100;
    this.wood_ = 0;
    this.victoryPoints_ = 0;
    this.divinity_ = new Divinity(object.nameDivinity, object.timeF);
    this.unitDamage_ = 1;
    this.listUnits_ = [];
    this.listWonders_ = object.listW || [];
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = object.timeF || 1000;
  }

  init() {
    for (let i = 0; i < 10; i++) {
      this.listUnits_.push(new Unit(20, this.unitDamage));
    }

    this.gaiaInterval_ = setInterval(() => {
      if (Math.random() > 0.95) {
        this.worldEvents.emit('bornUnit', {
          unit: 1
        });
        this.listUnits_.push(new Unit());
      }
    }, this.timeFactor);

    this.gaiaInterval2_ = setInterval(() => {
      this.worldEvents.emit('growCorn', {
        corn: 1
      });
      this.corn_ += 10;
    }, this.timeFactor * 20);

    this.divinity_.worldEvents.on('favor', favor => {
      this.corn_ += favor.corn;
      this.gold_ += favor.gold;
      this.wood_ += favor.wood;
    });
    this.divinity_.worldEvents.on('blessing', favor => {
      this.corn_ += favor.corn;
      this.gold_ += favor.gold;
      this.wood_ += favor.wood;
    });
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get user() {
    return this.user_;
  }

  get gold() {
    return this.gold_;
  }

  get corn() {
    return this.corn_;
  }

  get wood() {
    return this.wood_;
  }

  get victoryPoints() {
    return this.victoryPoints_;
  }

  addVictoryPoints(nbPoints) {
    this.victoryPoints_ += nbPoints;
  }

  get divinity() {
    return this.divinity_;
  }

  get nbUnits() {
    return this.listUnits_.length;
  }

  get unitDamage() {
    return this.unitDamage_;
  }

  get lenghtListWonders() {
    return this.listWonders_.length;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  get nbWonders() {
    let nbInit = 0;
    for (let i = 0; i < this.listWonders_.length; i++) {
      if (this.listWonders_[i].isInit) {
        nbInit++;
      }
    }
    return nbInit;
  }

  wonder(index) {
    if (index === 'number' && index >= 0 && index < this.nbWonders) {
      return this.listWonders_[index];
    }
  }

  formUnit(nbUnit) {
    if (this.corn_ >= nbUnit && this.gold_ >= (nbUnit * 2) &&
      typeof nbUnit === 'number' && nbUnit >= 0) {
      for (let i = 0; i < nbUnit; i++) {
        this.listUnits_.push(new Unit(16, this.unitDamage));
      }
      this.gold_ -= (2 * nbUnit);
      this.corn_ -= nbUnit;
    }
  }

  checkUnit() {
    this.listUnits_.forEach(element => {
      element.birthday();
      if (!element.isAlive()) {
        this.listUnits_.splice(this.listUnits_.lastIndexOf(element));
      }
    });
  }

  nbUnitsInDefense() {
    let nbUnitsInDefense = 0;
    this.listUnits_.forEach(element => {
      if (element.isInDefense()) {
        nbUnitsInDefense++;
      }
    });
    return nbUnitsInDefense;
  }

  fightBegin(enemies, nbUnits) {
    if (nbUnits <= this.nbUnitsInDefense() && typeof nbUnits === 'number' &&
      nbUnits >= 0) {
      return new Promise(resolve => {
        setTimeout(() => {
          if ((nbUnits * this.unitDamage) > (enemies.nbUnits *
            enemies.unitDamage)) {
            this.addVictoryPoints(60);
          } else {
            enemies.addVictoryPoints(50);
          }
          this.fight(enemies);
          resolve();
        }, this.timeFactor_ * Math.floor(Math.random() * 21) + 20);
      });
    }
  }

  fight(enemies) {
    this.listUnits_.forEach(unit => {
      if (Math.random() > 0.5) {
        unit.gethurt();
      }
      if (Math.random() > 0.75) {
        this.listUnits_.splice(this.listUnits_.lastIndexOf(unit));
      }
    });
    enemies.listUnits_.forEach(unit => {
      if (Math.random() > 0.5) {
        unit.gethurt();
      }
    });
  }

  offeringCorn(nbCorn) {
    if (this.corn_ >= nbCorn && typeof nbCorn === 'number' &&
      nbCorn >= 0) {
      this.corn_ -= nbCorn;
      this.divinity.offeringCorn(nbCorn);
    }
  }

  offeringWood(nbWood) {
    if (this.wood_ >= nbWood && typeof nbWood === 'number' &&
      nbWood >= 0) {
      this.wood_ -= nbWood;
      this.divinity.offeringWood(nbWood);
    }
  }

  offeringGold(nbGold) {
    if (this.gold_ >= nbGold && typeof nbGold === 'number' &&
      nbGold >= 0) {
      this.gold_ -= nbGold;
      this.divinity.offeringGold(nbGold);
    }
  }

  buyCorn(nbCorn) {
    if (this.gold_ >= nbCorn && typeof nbCorn === 'number' &&
      nbCorn >= 0) {
      this.corn_ += nbCorn;
      this.gold_ -= nbCorn;
    }
  }

  sellCorn(nbCorn) {
    if (this.corn_ >= nbCorn && typeof nbCorn === 'number' &&
      nbCorn >= 0) {
      this.corn_ -= nbCorn;
      this.gold_ += nbCorn;
    }
  }

  buyWood(nbWood) {
    if (this.gold_ >= (nbWood * 2) && typeof nbWood === 'number' &&
      nbWood >= 0) {
      this.wood_ += nbWood;
      this.gold_ -= (nbWood * 2);
    }
  }

  chopWood() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.wood_ += 10 + (Math.random() * 10);
        resolve();
      }, 20 * this.timeFactor);
    });
  }

  showStatus() {
    console.log('Player : ' + this.user_ + ' | City : ' + this.name_ + ' |' +
      ' Divinity : ' + this.divinity_.name);
    console.log('nbUnits : ' + this.nbUnits + ' | nbWonders : ' +
      this.nbWonders + ' | nbPoints : ' + this.victoryPoints);
    console.log('Gold : ' + this.gold_ + ' | Corn : ' + this.corn_ + ' |' +
      ' Wood : ' + this.wood_);
  }

  showWonderStatus() {
    for (let i = 0; i < this.listWonders_.length; i++) {
      if (this.listWonders_[i].isInit) {
        console.log((i + 1) + '- ' + this.listWonders_[i].showStatus());
      } else {
        console.log((i + 1) + '- Already built');
      }
    }
  }

  endWorld() {
    clearInterval(this.gaiaInterval_);
    clearInterval(this.gaiaInterval2_);
    if (this.listWonders_.length) {
      this.listWonders_.forEach(w => w.endWorld());
    }
    this.divinity.endWorld();
  }
}

module.exports = {City};
