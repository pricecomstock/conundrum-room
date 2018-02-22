puzzleSets = {
  starship: {
    oxygen: false,
    fuel: false,
    warp: false
  }
}

class Room {
    constructor(name) {
      this._name = name;
      this._secondsRemaining = 56;
      
      this._puzzles = puzzleSets[name]
    }

    set secondsRemaining(seconds) {
        this._secondsRemaining = seconds;
    }
    get secondsRemaining() {
      return this._secondsRemaining;
    }

    updatePuzzleStatus(puzzleName, status) {
      if (this.isValidPuzzle(puzzleName)) {
        this._puzzles[puzzleName] = status;
      }
    }

    isValidPuzzle(puzzleName) {
      return this._puzzles.hasOwnProperty(puzzleName)
    }

    toString() {
      return `I am the ${this.id} room. My current state: ${this.puzzles.toString()}`
    }
  }

module.exports.Room = Room;