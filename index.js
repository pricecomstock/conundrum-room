const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const roomCreator = require('./room.js')

// Use environment variable port or 3000
const port = process.env.PORT || 3000;

// Initialize Room
var room = new roomCreator.Room('starship'); // this string is used to determine room setup
console.log(room);
room.start();

// This is for development mostly
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* API ROUTES */
var router = express.Router();
app.use(bodyParser.json())

// Base route (easy connectivity test)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// Room status
router.get('/room', function(req, res) {
    res.json(room.status);
});

// Time
router.get('/time', function(req, res) {
    const seconds = room.secondsRemaining;
    res.json({
        seconds: room.secondsRemaining
        // formatted: `${seconds/60}:${(seconds%60+"0").slice(-2)}` // This is incorrect
    });
});

// Accepts puzzle name and 0/1 new status
router.get('/setpuzzle', function(req, res) {

    console.log(req.query)

    const normalizedPuzzleName = req.query.puzzle.toLowerCase()

    // Check valid complete parameter
    if (req.query.complete !== '0' && req.query.complete !== '1') {
        console.log("invalid puzzle status");
        res.json({message: "invalid puzzle status"});
    } else if (!room.isValidPuzzle(normalizedPuzzleName)) {
        console.log("invalid puzzle name");
        res.json({message: "invalid puzzle name"});
    } else {
        const newPuzzleStatus = req.query.complete === '1';

        room.updatePuzzleStatus(normalizedPuzzleName, newPuzzleStatus);

        res.json({
            message: "Success",
            room: room.status
        });
    }
});


// Send hint
router.post('/hint', function(req, res) {
    room.hint(req.body.hint);
    res.json({success: true, hint: req.body.hint})
});

// Set Time
router.post('/settime', function(req, res) {
    room.secondsRemaining(req.body.secondsRemaining)
    res.json({success: true, room: room.status})
});

// Pause
router.get('/pause', function(req, res) {
    room.pause();
    res.json({
        message: `paused with ${room.secondsRemaining} remaining`,
        secondsRemaining: room.secondsRemaining,
        playing: room.isPlaying
    })
});

// Pause
router.get('/play', function(req, res) {
    room.play();
    res.json({
        message: `resumed with ${room.secondsRemaining} remaining`,
        secondsRemaining: room.secondsRemaining,
        playing: room.isPlaying
    });
});


/* START SERVER */
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/dist', express.static(__dirname + '/dist'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))