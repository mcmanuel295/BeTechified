const path = require("path")
const env = path.resolve(__dirname, "../.env");
require("dotenv").config({path: env});

const express= require('express');
const app = express();

const port = process.env.PORT ;

// middle ware
app.use(express.json());

app.use('/files', express.static(path.join(__dirname, 'files')));

app.use((req,res,next) =>{
    console.log(`request logs : ${req.method}: ${req.url}`)
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
    next();
});


// endpoints
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "page","index.html"));
});


app.post("/user", (req, res) => {
    const { name, email } = req.body;
    if(!name || !email){
        throw new Error("Name and email are required");
    }
    res.send(`Hello: ${name}`);
});

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    res.send(`User ${id} profile`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});