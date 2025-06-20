const { request, gql } = require("graphql-request");
const { db } = require("../config");
require("dotenv").config();

const run = async () => {
  const endpoint = "https://api.thegraph.com/subgraphs/name/<your-subgraph-name>";
  const query = gql`
    {
      restakings(first: 5) {
        id
        user
        amount
        operator
      }
    }
  `;

  try {
    const res = await request(endpoint, query);
    const stmt = db().prepare("INSERT OR REPLACE INTO restakers (user_address, amount_restaked_steth, target_avs_operator_address, last_updated) VALUES (?, ?, ?, ?)");
    for (const r of res.restakings) {
      stmt.run(r.user, parseFloat(r.amount), r.operator, Math.floor(Date.now() / 1000));
    }
    stmt.finalize(() => {
      console.log("Restaker data saved.");
      process.exit();
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
