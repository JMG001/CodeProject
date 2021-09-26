--Twilio Code Project--

Author: JMG001
Date: 26/09/2021
Language: Node.js, html, css

--Listener.js
Main code file, used to setup the Node.js Express listener for the callback URL, and contains
all the route code to handle GET/POST to the app.

--sse.js
Code file used for the SSE (Server-Side Events) inclusion, to push the status 
notifications recieved from the Twilio callback URL to the Index.html webpage.

--SendSMS.js
Basic code file used at the beginning of the project to test sending an SMS via Twilio. 
Was used for testing SMS submission until the form was added to the Index.html webpage.

--index.html & style.css
Basic html page to display the Form used to trigger the SMS sending via Twilio. Basic stylesheets
setup in the style.css file. Index.html also includes some scripting in the header which handles
the SSE feed from the Node.js Express app.