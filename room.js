// puzzle sets
const puzzleSets = require('./PuzzleSets.js').PuzzleSets
const videoSets = require('./VideoSets.js').VideoSets

class Room {
    constructor(name) {
      this._name = name;
      
      this._puzzles = puzzleSets[name];
      this._videos = videoSets[name];
      
      this._secondsRemaining = 3600;
      this._won = false;
      this._lost = false;
      this._playing = false;
    }

    // Getters and Setters
    set secondsRemaining(seconds) {
      if (seconds >= 0) {
        this._secondsRemaining = seconds;
      }
    }
    get secondsRemaining() {
      return this._secondsRemaining;
    }

    get isWon() {
      return this._won;
    }
    
    get isLost() {
      return this._lost;
    }
    
    get isPlaying() {
      return this._playing;
    }

    // Methods

    // Start the room
    start() {
      this.play();
    }
    
    play() {
      // using the () => notation, we preserve the meaning of "this" inside setInterval
      this._intervalId = setInterval( () => this.decrementTime(), 1000); // start timer
      this._playing = true;
    }
    
    pause() {
      clearInterval(this._intervalId);
      this._playing = false;
    }

    updatePuzzleStatus(puzzleName, status) {
      if (this.isValidPuzzle(puzzleName)) {
        this._puzzles[puzzleName] = status;
      }
      this.checkWin();
    }

    isValidPuzzle(puzzleName) {
      return this._puzzles.hasOwnProperty(puzzleName);
    }

    toString() {
      return `I am the ${this.id} room. My current state: ${this.puzzles.toString()}`;
    }

    checkWin() { // This function might do too much
      const puzzleStatus = Object.keys(this._puzzles).map( (key) => {
        return this._puzzles[key]
      });
      // const puzzleStatus = Object.values(this._puzzles);
      // console.log(puzzleStatus);

      const allPuzzlesComplete = puzzleStatus.every(status => {
        return status; // check that every puzzle is true
      })

      if (allPuzzlesComplete) {
        this._won = true;
        this.win();
        return true;
      }

      return false;
    }

    decrementTime() {
      if (this._secondsRemaining === 0 && !this._won && !this._lost) { 
        if (!this.checkWin()) { // this should trigger the win function if we've won
          this.lose(); // if it returns false we trigger the lose function
        }
      } else if (!this._won && !this._lost) { // if there are more than zero seconds left and we haven't won or lost
        this._secondsRemaining -= 1; // underscore = direct manipulation
      }
      console.log(this._secondsRemaining);
    }

    win() {
      console.log("won!")
      // Play the video for winning!
    }
    
    lose() {
      console.log("lost!")
      // Play the video for losing!
    }

    hint(message) {
      console.log(message);

      // TODO make message print somewhere visible to room
    }

    // Get a more JSON friendly version of the room status without extra data
    get status() {
      return {
        name: this._name,
        puzzles: this._puzzles,
        secondsRemaining: this.secondsRemaining,
        won: this._won,
        lost: this._lost,
        playing: this._playing
      }
    }
  }

module.exports.Room = Room;