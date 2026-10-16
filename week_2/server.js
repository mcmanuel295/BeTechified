const env =require("dotenv")
const express= require("express");
const app = express();

const port = process.env.port;

app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});


app.get("/", (req, res) => {
    res.send("My week 2 API");
});

app.post("/user", (req, res) => {
    const { name, email } = req.body;
    res.send(`Hello: ${name}`);
});

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    res.send(`User ID: ${id}`);
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
});