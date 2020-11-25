const router = require("express").Router();
const fileController = require("../controllers/file");

// Matches with "/api/web"
router
  .route("/api/web")
  .get(fileController.getAllWebNotes)
  .post(fileController.createWebNote);

// Matches with "/api/web/:id"
router
  .route("/api/web/:id")
  .put(fileController.editWebNote)
  .delete(fileController.deleteWebNote);

// Matches with "/api/linux"
router
  .route("/api/linux")
  .get(fileController.getAllLinuxNotes)
  .post(fileController.createLinuxNote);

// Matches with "/api/linux/:id"
router
  .route("/api/linux/:id")
  .put(fileController.editLinuxNote)
  .delete(fileController.deleteLinuxNote);

// Matches with "/api/python"
router
  .route("/api/python")
  .get(fileController.getAllPythonNotes)
  .post(fileController.createLinuxNote);

// Matches with "/api/python/:id"
router
  .route("/api/python/:id")
  .put(fileController.editPythonNote)
  .delete(fileController.deletePythonNote);

// Matches with "/api/raspberryPi"
router
  .route("/api/raspberryPi")
  .get(fileController.getAllRaspberryPiNotes)
  .post(fileController.createRaspberryPiNote);

// Matches with "/api/raspberryPi/:id"
router
  .route("/api/raspberryPi/:id")
  .put(fileController.editRaspberryPiNote)
  .delete(fileController.deleteRaspberryPiNote);

// Matches with "/api/computers"
router
  .route("/api/computers")
  .get(fileController.getAllComputersNotes)
  .post(fileController.createComputersNote);

// Matches with "/api/computers/:id"
router
  .route("/api/computers/:id")
  .put(fileController.editComputersNote)
  .delete(fileController.deleteComputersNote);

module.exports = router;
