// HTTP CODES: https://httpstatuses.com/

const express = require('express');
const cors = require('cors');
const routes = require('./config/routes');
const session = require('express-session');
const authenticationCheck = require('./app/middlewares/authentication');

const app = express();

// MIDDLEWARES
// Parses body from json to object content
app.use(express.json());

// CORS: CROSS ORIGIN RESOURCE SHARING --> mechanism allowing restricted resources to be accessed by external domains
// Here we allow requests coming from localhost:(any port)
app.use(cors({origin: /localhost:.*/, credentials: true})); // https://expressjs.com/en/resources/middleware/cors.html

// Why use a session?
// A session allows you to store information server-side, rather than in a cookie that is insecure, 
// store in browser, sent with every requests and tiny (can hold a maximum of 4kb)

// Session id is stored in a cookie and represents the link between the user and the server.
// This id allows the server to recognize an authenticated user.
app.use(session({
    secret: 'EEtV6mRbJFXzmbDbzqEpcHabhhuCSx65',
    resave: false,          // force the session to be saved backed to the session store, even if the store has not been modified
    saveUninitialized: true // Keep a uninitialized session (when it is new but not modified)
}));

// Authentication middleware, must be placed after the session middleware (order is important)
app.use(authenticationCheck);

// Check routes and lead to matching controller
app.use('/', routes);

// LISTENNING on port 3000
app.listen(3000);