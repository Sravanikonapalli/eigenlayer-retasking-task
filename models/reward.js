const { db } = require("../config");

module.exports = {
  getRewardByAddress(walletAddress, callback) {
    db().get(
      "SELECT * FROM rewards WHERE wallet_address = ?",
      [walletAddress],
      callback
    );
  },
  getBreakdownByRewardId(rewardId, callback) {
    db().all(
      "SELECT operator_address, amount_steth, timestamp FROM reward_breakdown WHERE reward_id = ?",
      [rewardId],
      callback
    );
  },
  insertReward({ walletAddress, totalRewards }, callback) {
    const now = Math.floor(Date.now() / 1000);
    db().run(
      `INSERT OR REPLACE INTO rewards 
       (wallet_address, total_rewards_received_steth, last_updated)
       VALUES (?, ?, ?)`,
      [walletAddress, totalRewards, now],
      callback
    );
  },
  insertRewardBreakdown({ rewardId, operatorAddress, amount, timestamp }, callback) {
    db().run(
      `INSERT INTO reward_breakdown 
       (reward_id, operator_address, amount_steth, timestamp)
       VALUES (?, ?, ?, ?)`,
      [rewardId, operatorAddress, amount, timestamp],
      callback
    );
  }
};
