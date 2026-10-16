const path = require("path").resolve(__dirname, "../.env");

require("dotenv").config({ path });
const express= require('express');
const app = express();

const ported = process.env.PORTED ;

// middle ware
app.use(express.json());

app.use((req,res,next) =>{
    console.log(`${req.method}: ${req.url}`)
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
    next();
});


// endpoints
app.get("/", (req, res) => {
    res.send("My week 2 API");
});

app.get("/", (req, res) => {
    res.send("My week 2 API");
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

app.listen(ported, () => {
    console.log(`Server is running on port ${ported}`);
});