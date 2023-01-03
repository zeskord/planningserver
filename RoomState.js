const enums = require("./enums")
const Rooms = enums.Rooms

module.exports = class RoomState {

    room
    marksVisible

    constructor (room = Rooms.light) {
        
        this.room = room
        this.marksVisible = false

    }

    reset() {
        this.marksVisible = false
    }

}