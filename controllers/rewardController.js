const { db } = require("../config");
exports.getRewardByAddress = (req, res) => {
  const { address } = req.params;
  db().get("SELECT * FROM rewards WHERE wallet_address = ?", [address], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ msg: "Not found" });
    db().all("SELECT operator_address, amount_steth, timestamp FROM reward_breakdown WHERE reward_id = ?", [row.id], (err2, breakdown) => {
      if (err2) return res.status(500).json({ error: err2.message });
      row.rewardsBreakdown = breakdown.reduce((acc, cur) => {
        let found = acc.find(item => item.operatorAddress === cur.operator_address);
        if (!found) {
          found = { operatorAddress: cur.operator_address, amountStETH: 0, timestamps: [] };
          acc.push(found);
        }
        found.amountStETH += cur.amount_steth;
        found.timestamps.push(cur.timestamp);
        return acc;
      }, []);
      res.json(row);
    });
  });
};
