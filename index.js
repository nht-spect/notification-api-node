const express = require("express");
const cors  =require("cors");
const notification = require("./routes/notification");

const index = express();
index.use(express.json());

index.use(
    cors({
        origin: "*",
    })
);

index.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

index.use("/notification", notification);


index.listen(process.env.PORT || 8000, function () {
    console.log(`Server started on port ${process.env.PORT|| 8000}`);
});
