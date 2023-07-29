const express = require('express');
const mongoose = require('mongoose');
const env = require("dotenv");
const app = express();
const authRoute = require("./api/routes/auth");
env.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(console.log("БД подключена")).catch((err) => console.log(err))

app.use("/api/auth", authRoute);

app.listen("3000", () => {
    console.log('Cервер запущен')
})