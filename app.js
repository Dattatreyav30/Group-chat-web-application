const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors')

const sequelize = require('./util/database')

const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST']
    })
);

const userRoute = require('./routes/userRoute');
const { options } = require('./routes/userRoute');
const { get } = require('http');

app.use('/user', userRoute);

sequelize.sync();
app.listen(7000);
