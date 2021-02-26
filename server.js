const express = require("express");
const app = express();
const cors = require("cors")
const mongodb = require("mongodb");
const MongodbClient = mongodb.MongoClient;
const URL = "mongodb+srv://vasanth:admin123@cluster0.fpm1v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const DB = "chubb_students";
// Open the connection
// Select the DB
// Do operation Create,Read,Edit etc..
// Close the connection


app.use(cors())
app.use(express.json())

app.post("/student", async (req,res) => {
    console.log(req.body)
    try {
        let connection = await MongodbClient.connect(URL);
        let db = connection.db(DB);
        let insertedStudent = await db.collection("students").insertOne(req.body);
        await connection.close();
        res.status(200).json(insertedStudent);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

app.get("/students",async (req,res) => {
    try {
        let connection = await MongodbClient.connect(URL);
        let db = connection.db(DB);
        let students = await db.collection("students").find().toArray(); // Cursor
        await connection.close();
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json(error);
    }
})

app.put("/student/:id",async (req,res) => {
    try {
        let connection = await MongodbClient.connect(URL);
        let db = connection.db(DB);
        let editStudet = await db.collection("students").findOneAndUpdate({_id:mongodb.ObjectID(req.params.id)},{
            $set : req.body
        });
        await connection.close();
        res.status(200).json(editStudet);
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete("/student/:id",async (req,res) => {
    try {
        let connection = await MongodbClient.connect(URL);
        let db = connection.db(DB);
        await db.collection("students").findOneAndDelete({_id : mongodb.ObjectID(req.params.id)});
        await connection.close();
        res.status(200).json({
            message : "Deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get("/", function (req, res) {
    // res.send("<h1>Hello World</h1>")
    res.json({
        data: "Hello World"
    })
});

app.get("/about", function (req, res) {
    res.json({
        message: "About"
    })
});

app.get("/files", function (req, res) {

})

// Post Method
// Put Method
// Delete Method
// URL Parameter
// Query Parameters
// POSTMAN

app.listen(process.env.PORT || 8080);