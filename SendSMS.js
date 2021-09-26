//Set variables for Twilio Account SID and Twilio auth token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//Create API Call to Twilio. 'statusCallBack' is used to recieve sent and delivered notifications
client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+16515041883',
     statusCallback: 'https://4c20-202-169-118-14.ngrok.io/MessageStatus',
     to: process.env.TWILIO_MY_NUMBER
   })
  .then(message => console.log(' Message SID: ',message.sid,'\n','Sent Date: ',message.date_sent,'\n','To: ',message.to,'\n','Body: ',message.body,'\n','Status: ',message.status));
