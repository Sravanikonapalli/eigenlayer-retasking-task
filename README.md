# EigenLayer Restaking API

A Node.js + SQLite REST API exposing EigenLayer restaking data.

## Setup Instructions

1. **Clone the repository**
    ```bash
    git clone https://github.com/Sravanikonapalli/eigenlayer-retasking-task.git
    cd eigenlayer-restaking-api
    ```

2. **Install dependencies**
    ```bash
    npm install express sqlite3 dotenv graphql-request
    ```

3. **Add your environment file**  
    Create a file named `.env` in the root directory:
    ```env
    DB_FILE=./eigenlayer.sqlite
    PORT=5000
    ```
    - `DB_FILE`: Path to SQLite database file (auto-created if missing).
    - `PORT`: (Optional) Port to run the server (default: 5000).

4. **Initialize the database**  
    Run the server once to auto-create tables:
    ```bash
    node server.js
    ```
    You should see:
    ```
    SQLite DB connected
    Server running on port 5000
    ```

##  Populate with Sample Data

**Use `sampledata.sql` via CLI:**
```bash
sqlite3 ./eigenlayer.sqlite
.read sampledata.sql
.exit
```

## Run the Server

Start the API:
```bash
node server.js
```

**Live URL:**  
https://eigenlayer-retasking-task.onrender.com
##  API Endpoints

| Method | Endpoint                       | Description                                   | Sample Response |
|--------|------------------------------- |-----------------------------------------------|----------------|
| GET    | `/`                            | Health check (returns confirmation message)    | `"API is running"` |
| GET    | `/restakers`                   | List all restaker entries                     | `[ { id, user_address, amount_restaked_steth, target_avs_operator_address, last_updated }, ... ]` |
| GET    | `/validators`                  | List all validator entries                    | `[ { id, operator_address, total_delegated_stake_steth, status, last_updated }, ... ]` |
| GET    | `/rewards/:wallet_address`     | Fetch rewards for a specific wallet + breakdown| `{ id, wallet_address, total_rewards_received_steth, last_updated, rewardsBreakdown: [...]}` |

## Testing in Postman

Import the collection (JSON file) or create requests manually.

**Example requests:**

- **Health Check**
  ```http
  GET http://localhost:5000/
  ```

- **List Restakers**
  ```http
  GET http://localhost:5000/restakers
  ```

- **List Validators**
  ```http
  GET http://localhost:5000/validators
  ```

- **Get Rewards by Address**
  ```http
  GET http://localhost:5000/rewards/0xABC...
  ```
