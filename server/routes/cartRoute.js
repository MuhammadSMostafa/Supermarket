const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  res.send("it's the auth route");
});

module.exports = router;
