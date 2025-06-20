const express = require("express");
const connectDB = require("./config");
const restakerRoutes = require("./routes/restakers");
const validatorRoutes = require("./routes/validators");
const rewardRoutes = require("./routes/rewards");
require("dotenv").config();

const app = express();
connectDB();
app.use(express.json());

app.use("/restakers", restakerRoutes);
app.use("/validators", validatorRoutes);
app.use("/rewards", rewardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));