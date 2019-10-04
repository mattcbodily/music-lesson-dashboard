require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
      app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
})

// Auth routes
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);

// Main routes

const port = SERVER_PORT || 4040;
app.listen(port, () => console.log(`Coding the things on ${port}`));