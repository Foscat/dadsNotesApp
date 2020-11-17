const db = require("../db");
const fs = require("fs");
const moment = require("moment");

function formatArrayIds(currentNotes) {
  let formattedNotes = [];
  currentNotes.map((note, i) => {
    formattedNotes.push({
      ...note,
      id: i,
    });
  });
  return formattedNotes;
}

// General function to post a note

function postNote(data, noteType) {
  data.formData["id"] = data.currentNotes.length;
  data.formData["createdAt"] = moment().format("MMMM Do YYYY, h:mm:ss a");
  data.currentNotes.push(data.formData);

  const fixedIdNotes = formatArrayIds(data.currentNotes);

  fs.writeFile(
    `./app/db/${noteType}.json`,
    JSON.stringify(fixedIdNotes),
    "utf8",
    (err, res) => {
      if (err) throw err;
      return res;
    }
  );
}

function deleteNote(updatedData, noteType) {
  const fixedNoteIds = formatArrayIds(updatedData);

  fs.writeFile(
    `./app/db/${noteType}.json`,
    JSON.stringify(fixedNoteIds),
    "utf8",
    (err, res) => {
      if (err) throw err;
      return res;
    }
  );
}

function editNote(updatedNote, noteType) {
  let notePool = [...db[`${noteType}`]];

  notePool[updatedNote.id] = { ...updatedNote };

  fs.writeFile(
    `./app/db/${noteType}`,
    JSON.stringify(notePool),
    "utf*",
    (err, res) => {
      if (err) throw err;
      return res;
    }
  );
}

// Web notes CRUD

function getAllWebNotes(req, res) {
  res.status(200).send(db.web);
}

function createWebNote(req, res) {
  const updatedNotes = postNote(req.body, "web");
  res.status(200).send(updatedNotes);
}

function editWebNote(req, res) {
  const updatedNotes = editNote(req.body, "web");
  res.status(200).send(updatedNotes);
}

function deleteWebNote(req, res) {
  let data = [...db.web];
  data.pop(req.params.id);
  deleteNote(data, "web");
  res.status(200).send(data);
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
  editWebNote,
  deleteWebNote,
  getAllComputersNotes,
  getAllLinuxNotes,
  getAllPythonNotes,
  getAllRaspberryPiNotes,
};
