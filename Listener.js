//Includes
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const sseMW = require('./sse');
const moment = require('moment');

const app = express();

//Account variables for Twilio connection
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//Body Parser initialisation for POST req parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

//Server-Side Event streaming setup
app.use(sseMW.sseMiddleware);

var sseClients = new sseMW.Topic();

//POST route for notification messages recieved back from Twilio
app.post('/MessageStatus', (req, res) => {
  const messageSid = req.body.MessageSid;
  const messageStatus = req.body.MessageStatus;
  var ts = moment().format('DD-MM-YYYY hh:mm:ss');

  console.log(`${ts} - SID: ${messageSid}, Status: ${messageStatus}`);
  
  updateSseClients(`${ts} - SID: ${messageSid}, Status: ${messageStatus}`);
});

//POST route for submission details from webpage/test harness
app.post('/SubmitForm', (req, res) => {
  console.log(req.body);
  client.messages.create({
    body: req.body.SMSBody,
    from: '+16515041883',
    statusCallback: req.body.SMSCallBack,
    to: req.body.SMSTo
  })
  .then(message => console.log(' Message SID: ',message.sid,'\n','Sent Date: ',message.date_sent,'\n','To: ',message.to,'\n','Body: ',message.body,'\n','Status: ',message.status));
});

//GET route for displaying the webpage and SSE stream
app.get('/Updates', function (req, res) {
  var sseConnection = res.sseConnection;
  sseConnection.setup();
  sseClients.add(sseConnection);
});

var m;
updateSseClients = function (message) {
  this.m = message;
  sseClients.forEach(function (sseConnection){
    sseConnection.send(this.m);
  }
  , this
  );
};

//Create Express Listener
http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});