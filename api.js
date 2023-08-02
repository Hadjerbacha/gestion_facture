const express = require('express');
const router = express.Router();

// Exemple de données au format JSON
const data = {
  users: ["userOne", "userTwo", "userThree"]
};

// Route pour "/api"
router.get("/", (req, res) => {
  res.json(data);
});

module.exports = router;

