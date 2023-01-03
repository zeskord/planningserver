const fs = require("fs")
const path = require("path")
const http = require("http")
const https = require("https")
const config = require("config")

const express = require("express")
const app = express()
const port = config.get("port")

const useSsl = config.get("useSsl")

app.set('json spaces', 2)
app.use(express.json())

// Публикуем клиент.
const clientPath = config.get("clientPath")
app.use(express.static(path.resolve(clientPath)));

// Добавляем маршруты api
require("./api")(app)

if (useSsl === true) {

    // Читаем настройки SSL.
    const sslOptions = {
        key: fs.readFileSync(config.get("sslOptions.key")),
        cert: fs.readFileSync(config.get("sslOptions.cert")),
        ca: fs.readFileSync(config.get("sslOptions.ca")),
    }

    // Перенаправляю на защищенный протокол, это нужно, чтобы работал телеграм бот.
    app.use((req, res, next) => {
        req.secure ? next() : res.redirect("https://" + req.headers.host + req.url)
    })

    // Отдаем клиент.
    app.get("*", (req, res) => {
        const rootpath = path.resolve("/home", "planning-client", "build")
        const options = { root: rootpath }
        // const clientPath: string = path.resolve(rootpath, "index.html")
        res.sendFile("index.html", options)
    })

    https.createServer(sslOptions, app).listen(port)

} else {

    http.createServer(app).listen(port)

}





app.get("/", (req, res) => {
    res.send("OK")
})


