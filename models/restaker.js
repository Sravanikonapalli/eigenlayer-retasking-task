const { db } = require("../config");

module.exports = {
  getAllRestakers(callback) {
    db().all("SELECT * FROM restakers", [], callback);
  },
  insertRestaker({ userAddress, amountRestaked, operatorAddress }, callback) {
    const now = Math.floor(Date.now() / 1000);
    db().run(
      `INSERT OR REPLACE INTO restakers 
       (user_address, amount_restaked_steth, target_avs_operator_address, last_updated) 
       VALUES (?, ?, ?, ?)`,
      [userAddress, amountRestaked, operatorAddress, now],
      callback
    );
  }
};
