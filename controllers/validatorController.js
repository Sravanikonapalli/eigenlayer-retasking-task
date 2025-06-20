const { db } = require("../config");
exports.getValidators = (req, res) => {
  db().all("SELECT * FROM validators", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};