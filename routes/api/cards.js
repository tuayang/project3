const router = require("express").Router();
const cardsController = require("../../controllers/cardsController");
const isAuthenticated = require("../../controllers/authentication");

// Matches with "/api/cards"
router.route("/")
  .get(isAuthenticated, cardsController.findAll)
  .post(cardsController.create);

// Matches with "/api/cards/:id"
router
  .route("/:id")
  .get(cardsController.findById)
  .put(cardsController.update)
  .delete(cardsController.remove);

module.exports = router;
