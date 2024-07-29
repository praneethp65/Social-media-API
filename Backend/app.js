//Socialmedia(Facegram) API
const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa(); 

app.use(cors());
const special = require('./routes/special.js');
const posts = require('./routes/posts.js');
const users = require('./routes/users.js');
const comments = require('./routes/comments.js');


app.use(cors());
app.use(special.routes()); 
app.use(posts.routes());
app.use(users.routes());
app.use(comments.routes());

module.exports = app;