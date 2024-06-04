const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const Session = require('./models/sessions');
const bodyParser = require("body-parser");
const routes = require('./routes');
const MongoStore = require('connect-mongo');
const Mongoose = require('mongoose');
const { DBInit } = require('./database/dbconfig');
const Utility = require("./utilities");
const corsHeaders = Utility.corsHeaders;
require('dotenv').config();


const app = express();
app.use(corsHeaders);

// Connect to MongoDB
Mongoose.connect(process.env.MONGODB_URL);

/* ***********************
 * Middleware
 * ************************/
const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  collectionName: "sessions",
});

app.use(session({
  store: store,
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}));

// Add a middleware function to log the session data
app.use((req, res, next) => {
  // Log the session data
  const sessionData = req.session;
  const sessionModel = new Session({
    sessionId: req.sessionID,
    sessionData: sessionData,
    expires: sessionData.cookie.expires,
  });
  sessionModel.save();

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

app.use('/', routes);

app.use((req, res, next) => {
  res.redirect("/xr?status=404");
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await DBInit();
    app.listen(port || 5000, () => {
      console.log('Server is running @ http://localhost:5000');
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1); 
  }
};

startServer();