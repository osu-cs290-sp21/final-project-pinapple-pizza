// mel 6/6:
//    - added to function renderQuestionsAnnouncements() to provide roomID and roomName in rendering the specified lab page

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
app.use(express.json())

async function renderQuestionsAnnouncements(req, res, next) {
  let questions = db.collection('questions').find({roomID: req.params.roomID}).toArray()
  let announcements = db.collection('announcements').find({roomID: req.params.roomID}).toArray()
  let roomNameServer = await db.collection('rooms').find({roomID: req.params.roomID}).next();

  res.status(200).render('home', {
     announcementArray: await announcements,
     questionsArray: await questions,
     roomIdHome: req.params.roomID,
     roomNameHome: roomNameServer.roomName
   })
}


app.get('/', function(req, res, next){
   // Go to the landing page where user can create and join labs.
   res.status(200).render('createJoinLab')
});


// Password must be checked for the room with the corresponding pin.
function passwordGood(pin, password){
   return true
}

// User pressed the join room button. Take them to their room.
app.post('/rooms/join', function(req, res, next){

   console.log("Join lab requested")

   if(req.body && req.body.pin){

      console.log("Join lab request: ", req.body.pin)

      db.collection("rooms").findOne({roomID: req.body.pin})
      .then(function(result) {
         if(result){
            console.log("Redirecting user to questions and announcements for the associated room.")
            res.status(200).send()
         }
         else
         {
            console.log("Room doesn't exist")
            res.status(403).send()
         }
      })
   }
   else{
      console.log("Request invalid")
      res.status(403).send()
   }
})


//Handle request to room's pages
app.get('/:roomID', function(req, res, next) {
   db.collection("rooms").findOne({roomID: req.params.roomID})
   .then(function(result) {
      if(result)
      {
         renderQuestionsAnnouncements(req, res, next)
      } else {
         next()
      }
   })
});

app.use(express.static('public'));

//Handle POSTS to add questions
app.post('/question/add', function(req, res, next) {
   if(req.body && req.body.questionText && req.body.questionName && req.body.roomID)
   {
      console.log("Post request added: ")
      console.log("- questionText: ", req.body.questionText)
      console.log("- questionName: ", req.body.questionName)
      console.log("- roomID: ", req.body.roomID)

      db.collection("rooms").findOne({roomID: req.body.roomID})
      .then(function(result) {
         if (result) {
            let questionObj = {text: req.body.questionText, name: req.body.questionName, roomID:req.body.roomID}
            //Add to DB
            db.collection("questions").insertOne(questionObj)
            .then(function() {
               res.status(200).send("Successfully added question!")
            })
         } else {
            res.status(400).send("Error. Room does not exist!")
         }
      })
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

function roomExists(roomID) {
   return true
}

//Handle POSTS to create rooms
app.post('/rooms/create', function(req, res, next) {

   if(req.body && req.body.roomID && req.body.roomName && req.body.roomPassword)
   {

      if(!passwordGood(req.body.roomPassword)){
         res.status(403).send("Invalid TA password.")
         return
      }

      let roomObj = {roomID: req.body.roomID, roomName: req.body.roomName, password: req.body.roomPassword, people: []}

      db.collection("rooms").findOne({roomID: req.body.roomID})
      .then(function(result) {
         if (!result) {
            let roomObj = {roomID: req.body.roomID, roomName: req.body.roomName, password: req.body.roomPassword, people: []}
            //Add to DB
            db.collection("rooms").insertOne(roomObj).then(function(){
               res.status(200).send("Successfully created room!")
            })
         } else {
            res.status(400).send("Error. Room already exists!")
         }
      })
   }
   else
   {
      res.status(400).send("Request does not contain the correct JSON!")
   }
})

//Update queue by adding person
app.put('/:roomID/queue/add', function(req, res, next) {
   if(req.body && req.body.position && req.body.name &&
      req.body.roomNumber && req.body.reqType && req.params.roomID)
   {
      //Make sure room exists first
      db.collection("rooms").findOne({roomID: req.params.roomID})
      .then(function(result){
         if(result) {
            let personObj = {position: req.body.position, name: req.body.name,
               roomNumber: req.body.roomNumber, reqType: req.body.reqType}

            //Add to DB
            db.collection("rooms").updateOne({roomID: req.params.roomID}, {$push: {people: personObj}})
            .then(function() {
               res.status(200).send("Successfully added to the queue!")
            })
         } else {
            res.status(400).send("Room does not exist!")
         }
      })
   } else {
      res.status(400).send("Request does not contain the correct JSON!")
   }
})

//Update queue by removing 1st person
app.put('/:roomID/queue/remove', function(req, res, next) {
   if(req.params.roomID)
   {
      //Make sure room exists first
      db.collection("rooms").findOne({roomID: req.params.roomID}).then(function(result){
         if(result) {
            //Add to DB
            db.collection("rooms").updateOne({roomID: req.params.roomID}, {$pop: {people: -1}})
            .then(function() {
               res.status(200).send("Successfully removed from the queue!")
            })
         } else {
            res.status(400).send("Room does not exist!")
         }
      })
   } else {
      res.status(400).send("Request does not match path!")
   }
})

app.get('/:roomID/queue', function(req, res, next) {
   db.collection("rooms").findOne({roomID: req.params.roomID}).then(function(result){
      if(result) {
         context = {people: result["people"], roomID: req.params.roomID, roomName: result["roomName"]}
         res.status(200).render('queue', context)
      } else {
         res.status(400).send("Room does not exist!")
      }
   })

   // TODO: Get people from db
   // Temporary solution: hard coded people
   // context = {
   //    people: [
   //       {
   //          position: "1",
   //          name: "Bob",
   //          roomNumber: "1",
   //          reqType: "Question"
   //       },
   //       {
   //          position: "2",
   //          name: "Sally",
   //          roomNumber: "26",
   //          reqType: "Checkoff"
   //       },
   //       {
   //          position: "3",
   //          name: "Joey",
   //          roomNumber: "2",
   //          reqType: "Question"
   //       }
   //    ],
   //    roomID: req.params.roomID,
   //    roomName: "Super cool lab room thingy"
   // };

   // res.status(200).render('queue', context)

   /*
   // Make sure that the request is valid and the twit exists
   if (roomExists(req.params.roomID)) { // TODO: implement this function lol
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
