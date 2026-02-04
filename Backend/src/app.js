const express = require("express");
const app = express();
const noteModel = require("./model/notesModel");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static("./public"))//this middleware makes anything in public folder publically available


app.post("/notes",async (req,res) => {
    const {title, description} = req.body;
    const note = await noteModel.create({title,description})
    res.status(201).json({message: "notes created successfully",note})
});

app.get("/notes",async(req,res) => {
    const note = await noteModel.find()

    res.status(200).json({message:"Notes fetched successfully",note})
});

app.delete("/notes/:id", async(req,res) => {
    // const {id} = req.params;//or
    const id = req.params.id;
    const noteDelete = await noteModel.findByIdAndDelete(id);

    res.status(200).json({message: "deleted successfully", noteDelete})
})

app.patch("/notes/:id", async(req,res) => {
   const {id} = req.params;
   const{description} = req.body;
   const noteUpadate = await noteModel.findByIdAndUpdate(id,{description});

   res.status(200).json({message: "notes upadated successfully", noteUpadate})
})

app.use('*name', (req,res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))//this file is send in res of any unknown API
    // res.send("This is wild card API")
});
// console.log(__dirname);

module.exports = app



