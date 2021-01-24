const db = require("../db");
const fs = require("fs");
const moment = require("moment");

function formatArrayIds(currentNotes) {
  const formattedNotes = [];
  if (currentNotes.length) {
    currentNotes.map((note, i) => {
      formattedNotes.push({
        ...note,
        id: i,
      });
    });
  }
  return formattedNotes;
}

// General function to post a note

function postNote(data, noteType) {
  if (!data.currentNotes) {
    data.currentNotes = [];
  }
  data.formData["id"] = data.currentNotes || 0;
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

function deleteNote(updatedData, removeIndex, noteType) {
  console.log("incoming date to delete note", {
    updatedData,
    removeIndex,
    noteType,
  });
  const fixedNoteIds = formatArrayIds(updatedData);
  fixedNoteIds.splice(removeIndex, 1);
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

function editNote(data, noteType) {
  data.currentNotes[parseInt(data.formData.id)] = {
    ...data.formData,
    updatedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
  };

  fs.writeFile(
    `./app/db/${noteType}.json`,
    JSON.stringify(data.currentNotes),
    "utf8",
    (err, res) => {
      if (err) throw err;
      return res;
    }
  );
  return data.currentNotes;
}

// Web notes CRUD

function getAllWebNotes(req, res) {
  fs.readFile(`app/db/web.json`, (err, data) => {
    res.status(200).send(data);
  });
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
  console.log("WHAT IS IN DB WEB", db.web);
  let data = [...db.web];
  deleteNote(data, req.params.id, "web");
  res.status(200).send(data);
}

// Linux notes CRUD

function getAllLinuxNotes(req, res) {
  fs.readFile(`app/db/linux.json`, (err, data) => {
    res.status(200).send(data);
  });
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
  deleteNote(data, req.params.id, "linux");
  res.status(200).send(data);
}

// Python notes CRUD

function getAllPythonNotes(req, res) {
  fs.readFile(`app/db/python.json`, (err, data) => {
    res.status(200).send(data);
  });
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
  deleteNote(data, req.params.id, "python");
  res.status(200).send(data);
}

// Raspberry Pi notes CRUD

function getAllRaspberryPiNotes(req, res) {
  fs.readFile(`app/db/raspberryPi.json`, (err, data) => {
    res.status(200).send(data);
  });
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
  deleteNote(data, req.params.id, "raspberryPi");
  res.status(200).send(data);
}

// Computers notes CRUD

function getAllComputersNotes(req, res) {
  fs.readFile(`app/db/computers.json`, (err, data) => {
    res.status(200).send(data);
  });
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
  deleteNote(data, req.params.id, "computers");
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
