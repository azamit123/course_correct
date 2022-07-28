const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const subjectRouter = require("./routes/subject");
const classRouter = require("./routes/class");
const path = require("path")




const app = express();
const port = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://azamit:azi12345@cluster0.md4zphz.mongodb.net/CourseCorrect?retryWrites=true&w=majority", (err) => {
    if (err) {
        console.log("DB ERROR:", err);
    } else {
        console.log("DB CONNECT");
    }
});



app.use("/images", express.static(path.join(__dirname, "pictures")))


app.use(express.json())
app.use(cors());


app.use("/users", userRouter);
app.use("/subjects", subjectRouter);
app.use("/classes", classRouter);




//UNKNOWN ROUTE HANDLER
app.use((req, res) => {
    res.status(404).json({ error: req.url + '  API NOT SUPPORTED!' });
})




// ERROR HANDLER
app.use((err, req, res, next) => {
    if (err) {
        res.send(err.message);
    }
})





app.listen(port, () => console.log(`listening on port ${port}`));