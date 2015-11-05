var express = require('express');
var bodyParser = require('body-parser');

var app = express(); // the main app
var path = require('path');

// redis interface
var redis = require('redis');
var client = redis.createClient(); //creates a new client

// Redis Configuration
client.on('connect', function() {
    console.log('redis connected');
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Routes

/**
 * Get's Main Admin Dashboard Page
 * Used to enable short request to /admin
 */
app.route('/admin')
    .get(function(req, res) {
        console.log('Accessing the admin section ...');
        console.log(app.path());
        res.type('.html');
        res.sendFile(path.join(__dirname + '/../views/admin/ChristmasCrackerAdmin.html'));
    });

/**
 * Serves API
 *
 * GETS:
 * getAllSessions (returns [] of all sessions)
 * getCurrentSession {returns {} of current session}
 *
 * POSTS:
 * addSessions([] of sessions) {returns [] of all sessions}
 * addVote(session) {returns session}
 *
 */
app.route('/api/:call')
    .get(function(req, res) {
        console.log('API GET request: '+req.params.call);
        switch( req.params.call ){
            case 'getAllSessions':
                console.log('API GET request getAllSessions called: ');
                client.hgetall("session", function (err, obj) {
                    console.dir(obj);
                });
                break;
            case 'getCurrentSession':
                console.log('API GET request getCurrentSession called: ');
                break;
            default :
                res.end();
                break;
        }
    })
    .post(function(req, res) {
        console.log('API POST request: ');
        switch( req.params.call ){
            case 'addSession':
                console.log('req.body '+JSON.stringify(req.body));
                var parsed = JSON.parse(req.body);
                var sessionID = parsed['sessionid'];
                console.log('sessionid is '+sessionID);
                var obj = { sessionid : req.body };
                //client.hmset("session", obj, function (err, res) {
                //    if(err){
                //        console.log(err);
                //    }
                //    if(res){
                //        res.send(req.body);
                //        console.log(res);
                //    }
                //});
                res.end();
                break;
            case 'addVote':
                console.log('API POST request addVote called: '+req.body);
                break;
            default :
                res.end();
                break;
        }
    })
    .put(function(req, res) {
        res.send('this is a put');
    });

/**
 * Serves everything else
 */
app.route('/*')
    .get(function(req, res) {
        res.sendFile(path.join(__dirname + '/../views/'+req.params[0]));
    });

// Bind to port
app.listen(80);


