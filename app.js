const express = require('express');
const cors  = require('cors');
const { google } = require('googleapis');
const request = require('request');

const PROJECT_ID = 'smart-warehouse-manager';
const HOST = 'https://fcm.googleapis.com';
const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];


const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});



app.post("/send", function (req, res) {
    const {body} = req;

    function getAccessToken() {
        return new Promise(function(resolve, reject) {
            const key = require('./service-account.json');
            const jwtClient = new google.auth.JWT(
                key.client_email,
                null,
                key.private_key,
                SCOPES,
                null
            );
            jwtClient.authorize(function(err, tokens) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(tokens.access_token);
            });
        });
    }

    getAccessToken().then(function(accessToken) {

        const options = {
            'method': 'POST',
            'url': `${HOST}${PATH}`,
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(body),
        }

        request(options, function (error, response) {
            if (error) {
                res.status(500).send(JSON.stringify(error));
                return;
            };
            res.status(200).send(response.body);
        });

    });
});

app.listen( process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});
