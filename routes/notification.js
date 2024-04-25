import {initializeApp} from 'firebase-admin/app';
import {getMessaging} from "firebase-admin/messaging";
import express from "express";
import admin from "firebase-admin";
import serviceAccount from "../service-account.json" assert {type: "json"};

const PROJECT_ID = 'smart-warehouse-manager';
const router = express.Router();

process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: PROJECT_ID,
});



router.post("/send/multiple", function (req, res) {
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

router.post("/send", function (req, res) {
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

export default router;
