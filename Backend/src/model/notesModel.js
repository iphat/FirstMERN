const mongoose =require('mongoose');

const notesSchema = new mongoose.Schema({
    title: String,
    description: String,
    age: Number
})

const noteModel = mongoose.model("notes", notesSchema)

module.exports = noteModel;