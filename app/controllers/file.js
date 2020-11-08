const db = require("../db");
const fs = require("fs");
const moment = require("moment");

// General function to post a note

// function postNote(data) {
//     data.formData["id"] = data.currentNotes.length;
//     data.currentNotes.push(data.formData);
//     console.log("Post new notes content", data.currentNotes);
//     fs.writeFile(db.web, data.currentNotes, "utf8",(err, res) => {
//         if(err) throw err;
//         return res;
//     })
// }

// Web notes CRUD

function getAllWebNotes(req, res) {
    res.status(200).send(db.web);
}

function createWebNote(req, res) {
    console.log("Incoming note", req.body);
    console.log("postNote", postNote(req.body));
    res.status(200).send("Will make note of that");
}

// Linux notes CRUD

function getAllLinuxNotes(req, res) {
    res.status(200).send(db.linux);
}

// Python notes CRUD

function getAllPythonNotes(req, res) {
    res.status(200).send(db.python);
}

// Raspberry Pi notes CRUD

function getAllRaspberryPiNotes(req, res) {
    res.status(200).send(db.raspberryPi);
}

// Computers notes CRUD

function getAllComputersNotes(req, res) {
    res.status(200).send(db.computers);
}

module.exports = { 
    getAllWebNotes, 
    createWebNote, 
    getAllComputersNotes, 
    getAllLinuxNotes, 
    getAllPythonNotes, 
    getAllRaspberryPiNotes 
};