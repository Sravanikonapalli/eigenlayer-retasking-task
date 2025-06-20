const { db } = require("../config");
exports.getRestakers = (req, res) => {
  db().all("SELECT * FROM restakers", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};