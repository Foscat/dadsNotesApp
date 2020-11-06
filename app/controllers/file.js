const db = require("../db");
const fs = require("fs");
const moment = require("moment");

// Web notes CRUD

function getAllWebNotes(req, res) {
    res.status(200).send(db.web);
}

function createWebNote(note) {
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