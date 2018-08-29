const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const DATABASE_URL = process.env.DATABASE_URL

// Initial DB connection with knex
const db = knex({
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res) => {
  res.json(database.users);
});

// Inject additional dependencies with route controllers that take deps
// and return function that take req and res

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('app is running on port', PORT);
});


