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
const Project = require("./models/project.js"); // get project method
const port = 5000; // define port number

// find what request method and url is being used
app.use((req, res, next)=>{
    console.log(`${req.method} request ${req.url}`);
    next();
})
app.use(bodyParser.json()); // call bodyparser method
app.use(bodyParser.urlencoded({extended:false})); // prevent url from being parsed
app.use(cors()); // call cors method with express
app.get("/", (req, res)=> res.send("Hello! I'm from the backend.")); // Confirm connection to backend

// Connect to MongoDB database
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@store.${config.MONGO_CLUSTER_NAME}.mongodb.net/${config.MONGO_DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>console.log("DB Connected"))
.catch(err=>{
    console.log(`DB Connection Error:${err.message}`);
});

// Define port for Express to listen to
app.listen(port,()=>console.log(`My fullstack application is listening on port ${port}`));

// =================================
// end of application setup
// =================================

// =================================
// start of MongoDB CRUD tasks
// =================================

// Get all projects from database
app.get("/allProjects", (req,res) => {
    Project.find().then(result=>{
        res.send(result);
    }) // end of find
})
// End of get all projects from database

// Add a project to database
app.post("/addProject", (req,res) => {
    const dbProject = new Project({
        _id: new mongoose.Types.ObjectId,
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        author: req.body.author,
        img_url: req.body.img_url,
        project_url: req.body.project_url
    }); // end of const
    dbProject.save().then(result => {
        res.send(result);
    }).catch(err => res.send(err)); // end of save
});
// End of add project to database

// Start of update project in database
app.patch('/updateProject/:id', (req,res) => {
    const idParam = req.params.id;
    Project.findById(idParam, (err, project) => {
        const updatedProject = {
            project_name: req.body.project_name,
            project_description: req.body.project_description,
            author: req.body.author,
            img_url: req.body.img_url,
            project_url: req.body.porfolio_url
        } // end of const
        Project.updateOne({_id: idParam}, updatedProject)
            .then(result => {res.send(result)})
            .catch(err => res.send(err)) // end of update one
    }); // end of find by id
})
// End of update project in database

// Start of delete project from database
app.delete("/deleteProject/:id", (req,res) => {
    const idParam = req.params.id;
    Project.findOne({_id:idParam}, (err,project) => {
        if(project){
            Project.deleteOne({_id:idParam}, err => {
                console.log("Deleted project through backend request.");
            }); // end of delete one
        } else {
            console.log("Could not find project.");
        } // end of if
    }).catch(err => res.send(err)); // end of find one
})
// End of delete project from database

// =================================
// end of MongoDB CRUD tasks
// =================================
