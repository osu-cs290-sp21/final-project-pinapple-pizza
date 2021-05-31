const bodyParser = require('body-parser')
const express = require('express');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const app = express();
const exphbs = require('express-handlebars');

// Set express-handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Intialize DB variables
let db
const uri = process.env.DB_HOST+process.env.DB_USER+":"+process.env.DB_PASS
            +process.env.DB_SERVER+process.env.DB_NAME+process.env.DB_PARAMS
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//Parse incoming data as JSON
app.use(bodyParser.json())

app.get('/', function(req, res, next) {
   res.status(200).render('home');
});

app.use(express.static('public'));

//Handle POSTS to add questions
app.post('/question/add', function(req, res, next) {
   if(req.body && req.body.questionText && req.body.questionName)
   {
      console.log("Post request added: ")
      console.log("- questionText: ", req.body.questionText)
      console.log("- questionName: ", req.body.questionName)
      console.log("- roomName: ", req.body.roomName)
      
      let questionObj = {text: req.body.questionText, name: req.body.questionName, roomName:req.body.roomName}
      //Add to DB
      db.collection("questions").insertOne(questionObj)
      
      res.status(200).send("Successfully added question!")
   }
   else
   {
      res.status(400).send("Request does not match path!")
   }
})

// Temporary thing for testing
app.get('/questions', function(req, res, next) {
   let questionsCursor = db.collection('questions').find({
      roomName: 'room1'
   });

   let questions = questionsCursor.toArray().then(function(questions) {
      res.status(200).send(JSON.stringify(questions));
   });
});

//Handle POSTS to add announcements
//{announcementText: textValue, announcementAuthor: authorValue, taPassword: passwordValue, roomName: 'room1'}
app.post('/announcements/add', function(req, res, next) {
   // TODO: make this actually work
   res.status(403).send('Invalid password!')
})

let port = process.env.PORT || 3000;

//Ensure DB connection before starting server

client.connect(function(err) {
   db = client.db(process.env.DB_NAME)
   if (err)
   {
      console.log(err)
   }
   app.listen(port, function() {
      console.log('Server is listening on port ' + port);
   });
})