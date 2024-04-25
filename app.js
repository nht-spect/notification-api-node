import express from "express";
import cors from "cors";
import notification from "./routes/notification.js";

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
