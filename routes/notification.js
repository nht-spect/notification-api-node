const {initializeApp} = require('firebase-admin/app');
const {getMessaging} = require("firebase-admin/messaging");
const express = require("express");
const admin =  require("firebase-admin");
const serviceAccount = require("../service-account.json");

const PROJECT_ID = 'smart-warehouse-manager';
const router = express.Router();

process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: PROJECT_ID,
});


router.get("/", async (req, res, next) => {
    return res.status(200).json({
        title: "Express Testing",
        message: "The app is working properly!",
    });
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

module.exports = router;
