const express = require('express');
const app = express();

app.use(express.json());


app.listen(8080, () => {console.log("server running on 8000")});

app.get("/hello", (req, res) => {
    console.log("get request 1");
    res.send("hello d");
})

app.get("/hello2", (req, res) => {
    res.send("hello 2");
})