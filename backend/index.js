// =================================
// start of application setup
// =================================

const express = require("express"); // includes express.js
const app = express(); // variable for express
const bodyParser = require("body-parser"); // includes bodyparser
const mongoose = require("mongoose"); // includes mongoose
const bcrypt = require("bcryptjs"); // includes bcryptjs
const cors = require("cors"); // includes cors
const config = require("./config.json"); // get api key and database access names
const Project = require("./models/project.js");
const port = 5000;

app.use((req, res, next)=>{
    console.log(`${req.method} request ${req.url}`); // find what request method and url is being used
    next();
})

app.use(bodyParser.json()); // calling bodyparser method
app.use(bodyParser.urlencoded({extended:false})); // preventing url from being parsed
app.use(cors()); // calling cors method with express
app.get("/", (req, res)=> res.send("Hello! I'm from the backend."));

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@store.${config.MONGO_CLUSTER_NAME}.mongodb.net/${config.MONGO_DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>console.log("DB Connected"))
.catch(err=>{
    console.log(`DB Connection Error:${err.message}`);
});

app.listen(port,()=>console.log(`My fullstack application is listening on port ${port}`));

// =================================
// end of application setup
// =================================

// =================================
// start of MongoDB CRUD tasks
// =================================



// =================================
// end of MongoDB CRUD tasks
// =================================
