const router = require("express").Router();
const fileController = require("../controllers/file");

// Matches with "/api/web"
router
  .route("/api/web")
  .get(fileController.getAllWebNotes)
  .post(fileController.createWebNote);

// // Matches with "/api/web/:id"
// router.route("/api/web/:id")
//   .get(userController.findById)
//   .put(userController.update)
//   .delete(userController.remove);

// Matches with "/api/web"
router.route("/api/linux").get(fileController.getAllLinuxNotes);

// Matches with "/api/web"
router.route("/api/python").get(fileController.getAllPythonNotes);

// Matches with "/api/raspberryPi"
router.route("/api/raspberryPi").get(fileController.getAllRaspberryPiNotes);

// Matches with "/api/computers"
router.route("/api/computers").get(fileController.getAllComputersNotes);

module.exports = router;
