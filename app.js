const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors')

const sequelize = require('./util/database')

const app = express();

const User = require('./models/userModel');
const Messages = require('./models/messageModel');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST']
    })
);

const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute')

app.use('/user', userRoute);
app.use('/message',messageRoute)

User.hasMany(Messages);
Messages.belongsTo(User);

sequelize.sync();
app.listen(7000);
