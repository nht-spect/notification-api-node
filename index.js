const express = require("express");
const cors  =require("cors");
const notification = require("./routes/notification");

require("dotenv").config();

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

app.use("/notification", notification);


app.listen(process.env.PORT || 8000, function () {
    console.log(`Server started on port ${process.env.PORT|| 8000}`);
});
