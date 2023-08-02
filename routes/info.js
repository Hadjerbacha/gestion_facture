// info.js

const express = require('express');
const router = express.Router();

// Exemple de données d'informations
const usersInfo = [
  { id: 1, name: "User One", age: 25 },
  { id: 2, name: "User Two", age: 30 },
  { id: 3, name: "User Three", age: 28 },
];

// Route pour récupérer toutes les informations des utilisateurs
router.get("/users", (req, res) => {
  res.json(usersInfo);
});

// Route pour récupérer les informations d'un utilisateur spécifique en fonction de l'ID
router.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userInfo = usersInfo.find(user => user.id === userId);
  
  if (userInfo) {
    res.json(userInfo);
  } else {
    res.status(404).json({ message: "Utilisateur non trouvé" });
  }
});

module.exports = router;
