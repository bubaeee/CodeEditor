// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';


var express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
var ot = require('ot');

//Socket.io Initialization
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Datastore Initialization
const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore({
  projectId: process.env.DATASTORE_PROJECT_ID
});


app.use(express.static(__dirname + '/static'));                 //Make all files in /static public

//Compiling pug files

app.get('/', (req, res) => {                                    //Upon initilization of webapp
  res.render('intro.pug');                                      //Compile intro.pug template into html output
});

app.get('/page2', (req, res) => {                               //Executed upon clicking 'Click to Begin 'button in intro.pug
  res.render('index.pug');                                      //Button redirects page to compiled index.pug html output
});

//Managing client-side jquery post/get requests

//Jquery post request to /name servlet
app.post('/name', (req, res) => {                               
    const kindKey = datastore.key(['Task', req.body.filename]); //Datastore key with kind 'Task'

    const dataEntity = {                                        
    filename:req.body.filename,                                 //Entity maps file to filename property
    code:req.body.editor                                        //Entity maps editor value to code property 
        };

    datastore.save({                                            //Save the entity to datastore
    key: kindKey,
    data: dataEntity
        }, function(err) {
    if (!err) {
        // Record saved successfully.
        }
    });
});

//AJAX get request to /name servlet
app.get('/name', (req, res) => {
    
     var taskQuery = datastore.createQuery('Task');           
    
     const key = datastore.key(['Task',req.query.file]);    //Query for 'Task' with the filename property mapping to the file
     datastore.get(key, function(err, entity) {
         res.send(entity.code);                             //Send the produced code entity to the editor
        });
    });



var serverOt = new ot.Server("");
var oldValue = "";
serverOt.broadcast = function (operation) {
    io.emit('operation', {operation:operation, oldValue:oldValue});                              //Send the operation "event" to all of the users (including the sender)
};

// when you receive an operation as a JSON string from one of the clients, do:
function onReceiveOperation (json,revision) {
    var operation = ot.TextOperation.fromJSON(JSON.parse(json));
    serverOt.receiveOperation(revision,operation);
    serverOt.broadcast(operation);
}

app.get('/operations', (req, res) => {
    oldValue = req.query.adapterValue;
     onReceiveOperation(req.query.op,req.query.revision);
    });

if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}



