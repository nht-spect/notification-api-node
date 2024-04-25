import {initializeApp} from 'firebase-admin/app';
import {getMessaging} from "firebase-admin/messaging";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccount from "./service-account.json" assert {type: "json"};

const PROJECT_ID = 'smart-warehouse-manager';


process.env.GOOGLE_APPLICATION_CREDENTIALS;

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

initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: PROJECT_ID,
});

app.post("/send/multiple", function (req, res) {
    const body = req.body;

    getMessaging()
        .sendMulticast(body)
        .then((response) => {
            res.status(200).json({
                message: "Successfully sent message"
            });
        })
        .catch((error) => {
            res.status(400);
            res.send(error);
        });


});

app.post("/send", function (req, res) {
    const body = req.body;

    getMessaging()
        .send(body)
        .then((response) => {
            res.status(200).json({
                message: "Successfully sent message"
            });
        })
        .catch((error) => {
            res.status(400);
            res.send(error);
        });


});

app.listen(process.env.PORT || 8000, function () {
    console.log(`Server started on port ${process.env.PORT|| 8000}`);
});
