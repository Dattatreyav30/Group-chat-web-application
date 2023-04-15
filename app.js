const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors')

const sequelize = require('./util/database')

const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

const userRoute = require('./routes/userRoute');

app.use('/user',userRoute);

sequelize.sync();

app.listen(7000);
