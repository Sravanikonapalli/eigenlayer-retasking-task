const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require("dotenv").config();

let db;

const connectDB = () => {
  const dbPath = process.env.DB_FILE || "./eigenlayer.sqlite";
  db = new sqlite3.Database(path.resolve(dbPath), (err) => {
    if (err) {
      console.error("Failed to connect to SQLite DB", err.message);
      process.exit(1);
    }
    console.log("SQLite DB connected");
    db.run(`CREATE TABLE IF NOT EXISTS restakers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_address TEXT UNIQUE,
      amount_restaked_steth REAL,
      target_avs_operator_address TEXT,
      last_updated INTEGER
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS validators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      operator_address TEXT UNIQUE,
      total_delegated_stake_steth REAL,
      status TEXT,
      last_updated INTEGER
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS slash_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      validator_id INTEGER,
      timestamp INTEGER,
      amount_steth REAL,
      reason TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wallet_address TEXT UNIQUE,
      total_rewards_received_steth REAL,
      last_updated INTEGER
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS reward_breakdown (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reward_id INTEGER,
      operator_address TEXT,
      amount_steth REAL,
      timestamp INTEGER
    )`);
  });
};

module.exports = connectDB;
module.exports.db = () => db;