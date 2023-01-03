mainApp = require("./MainApp")

module.exports = function addApiRoutes(app) {

    // Периодический запрос от клиента.
    app.post("/api/tick", (req, res) => {
        const reqBody = req.body
        const response = mainApp.handleClientTick(reqBody)
        res.status(200).json(response)
    })

    app.post("/api/sendMark", (req, res) => {
        const userId = req.body.userId
        const mark = req.body.mark
        mainApp.setUserMark(userId, mark)
        res.status(200)
    })

    app.post("/api/clearMarks", (req, res) => {
        const room = req.body.room
        mainApp.clearMarks(room)
        res.status(200)
    })

    app.post("/api/changeRole", (req, res) => {
        const userId = req.body.userId
        const role = req.body.role
        mainApp.changeRole(userId, role)
        res.status(200)
    })

    app.post("/api/reset", (req, res) => {
        mainApp.reset()
        res.status(200)
    })

    app.post("/api/showMarks", (req, res) => {
        const room = req.body.room
        mainApp.showMarks(room)
        res.status(200)
    })

    app.post("/api/changeRoom", (req, res) => {
        const userId = req.body.userId
        const room = req.body.room
        mainApp.changeRoom(userId, room)
        res.status(200)
    })

}