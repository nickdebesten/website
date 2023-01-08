const express = require("express")
const app = express()
const port = 80
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.get(["/", "/index.html"], (req, res) => {
    res.sendFile(__dirname + "/index.html");
  })
app.get(["/menu.html"], (req, res) => {
    res.sendFile(__dirname + "/menu.html");
  })