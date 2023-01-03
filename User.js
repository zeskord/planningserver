const enums = require("./enums")
const Rooms = enums.Rooms
const UserRoles = enums.UserRoles

module.exports = class User {

    id
    name
    role
    room
    mark

    constructor(id, name, role = UserRoles.spectator,
        room = Rooms.light, mark = undefined) {
        this.id = id
        this.name = name
        this.role = role
        this.room = room
        this.mark = mark
    }

}