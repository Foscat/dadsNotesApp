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
  return fixedIdNotes;
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
  return fixedNoteIds;
}

function editNote(updatedNote, noteType) {
  let notePool = [...db[`${noteType}`]];

  notePool[updatedNote.id] = { ...updatedNote };

  fs.writeFile(
    `./app/db/${noteType}`,
    JSON.stringify(notePool),
    "utf8",
    (err, res) => {
      if (err) throw err;
      return res;
    }
  );
  return notePool;
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

function createLinuxNote(req, res) {
  const updatedNotes = postNote(req.body, "linux");
  res.status(200).send(updatedNotes);
}

function editLinuxNote(req, res) {
  const updatedNotes = editNote(req.body, "linux");
  res.status(200).send(updatedNotes);
}

function deleteLinuxNote(req, res) {
  let data = [...db.linux];
  data.pop(req.params.id);
  deleteNote(data, "linux");
  res.status(200).send(data);
}

// Python notes CRUD

function getAllPythonNotes(req, res) {
  res.status(200).send(db.python);
}

function createPythonNote(req, res) {
  const updatedNotes = postNote(req.body, "python");
  res.status(200).send(updatedNotes);
}

function editPythonNote(req, res) {
  const updatedNotes = editNote(req.body, "python");
  res.status(200).send(updatedNotes);
}

function deletePythonNote(req, res) {
  let data = [...db.python];
  data.pop(req.params.id);
  deleteNote(data, "python");
  res.status(200).send(data);
}

// Raspberry Pi notes CRUD

function getAllRaspberryPiNotes(req, res) {
  res.status(200).send(db.raspberryPi);
}

function createRaspberryPiNote(req, res) {
  const updatedNotes = postNote(req.body, "raspberryPi");
  res.status(200).send(updatedNotes);
}

function editRaspberryPiNote(req, res) {
  const updatedNotes = editNote(req.body, "raspberryPi");
  res.status(200).send(updatedNotes);
}

function deleteRaspberryPiNote(req, res) {
  let data = [...db.raspberryPi];
  data.pop(req.params.id);
  deleteNote(data, "raspberryPi");
  res.status(200).send(data);
}

// Computers notes CRUD

function getAllComputersNotes(req, res) {
  res.status(200).send(db.computers);
}

function createComputersNote(req, res) {
  const updatedNotes = postNote(req.body, "computers");
  res.status(200).send(updatedNotes);
}

function editComputersNote(req, res) {
  const updatedNotes = editNote(req.body, "computers");
  res.status(200).send(updatedNotes);
}

function deleteComputersNote(req, res) {
  let data = [...db.computers];
  data.pop(req.params.id);
  deleteNote(data, "computers");
  res.status(200).send(data);
}

module.exports = {
  getAllWebNotes,
  createWebNote,
  editWebNote,
  deleteWebNote,
  getAllComputersNotes,
  createComputersNote,
  editComputersNote,
  deleteComputersNote,
  getAllLinuxNotes,
  createLinuxNote,
  editLinuxNote,
  deleteLinuxNote,
  getAllPythonNotes,
  createPythonNote,
  editPythonNote,
  deletePythonNote,
  getAllRaspberryPiNotes,
  createRaspberryPiNote,
  editRaspberryPiNote,
  deleteRaspberryPiNote,
};
