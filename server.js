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

async function renderQuestionsAnnouncements(req, res, next) {
   let questions = db.collection('questions').find({roomName: "room1"}).toArray()
   let announcements = db.collection('announcements').find({roomName: "room1"}).toArray()

   res.status(200).render('home', {
      announcementArray: await announcements, questionsArray: await questions});
}
app.get('/', function(req, res, next) {
   //TODO: implement roomName, callback, and error handling
   renderQuestionsAnnouncements(req, res, next)
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

function room_exists(room) {
   return true;
}

app.get('/rooms/:roomID/queue', function(req, res, next) {
   // TODO: Get people from db
   // Temporary solution: hard coded people
   context = {
      people: [
         {
            position: "1",
            name: "Bob",
            roomNumber: "1",
            reqType: "Question"
         },
         {
            position: "2",
            name: "Sally",
            roomNumber: "26",
            reqType: "Checkoff"
         },
         {
            position: "3",
            name: "Joey",
            roomNumber: "2",
            reqType: "Question"
         }
      ],
      roomID: req.params.roomID,
      roomName: "Super cool lab room thingy"
   };

   res.status(200).render('queue', context);

   /*
   // Make sure that the request is valid and the twit exists
   if (room_exists(req.params.roomID)) { // TODO: implement this function lol
      let context = {
         roomID: req.params.roomID
      };
      res.status(200).render('queue', context);
   }
   else {
      next();
   }
   */
});

// 404 page
app.get('*', function(req, res, next) {
   // TODO: change this to an actual 404 page
   console.log(req.url);
   res.status(404).send("404");
});

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