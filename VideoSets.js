// video labels should be win, lose, start or seconds remaining
/*
+-------+---------+
| MM:SS | Seconds |
+-------+---------+
| 60:00 |    3600 |
| 45:00 |    2700 |
| 30:00 |    1800 |
| 15:00 |     900 |
| 10:00 |     600 |
| 5:00  |     300 |
+-------+---------+
*/

const VideoSets = {
    starship: {
        win: "commandtoplay /path/to/video.mp4",
        lose: "commandtoplay /path/to/video.mp4",
        start: "commandtoplay /path/to/video.mp4",
        2700: "commandtoplay /path/to/video.mp4",
        1800: "commandtoplay /path/to/video.mp4",
        900: "commandtoplay /path/to/video.mp4"
    }
}

module.exports.VideoSets = VideoSets;