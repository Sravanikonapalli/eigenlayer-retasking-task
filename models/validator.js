const { db } = require("../config");

module.exports = {
  getAllValidators(callback) {
    db().all("SELECT * FROM validators", [], callback);
  },
  insertValidator({ operatorAddress, totalStake, status }, callback) {
    const now = Math.floor(Date.now() / 1000);
    db().run(
      `INSERT OR REPLACE INTO validators 
       (operator_address, total_delegated_stake_steth, status, last_updated)
       VALUES (?, ?, ?, ?)`,
      [operatorAddress, totalStake, status, now],
      callback
    );
  },
  insertSlashEvent({ validatorId, timestamp, amount, reason }, callback) {
    db().run(
      `INSERT INTO slash_history (validator_id, timestamp, amount_steth, reason)
       VALUES (?, ?, ?, ?)`,
      [validatorId, timestamp, amount, reason],
      callback
    );
  }
};
