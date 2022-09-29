const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const route = require('./routers/route');
const app = express()

app.use(express.json())
app.use(multer().any());
app.use(cors())

mongoose.connect('mongodb+srv://riju:riju@cluster0.s4hmv.mongodb.net/open-to-intern', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDb is connected'))
    .catch(err => console.log(err))

app.use('/', route)

app.use((req, res) => res.status(400).send({ status: false, message: 'invalid URL' }))

app.listen(3001, () => { console.log('Express app running on port 3001') })