const express = require('express');
const app = express();
app.use(express.json())
const mongoose = require('./API/helper/helper');
const authRoutes = require('./API/routes/routes');
var cors = require('cors');
app.use(cors());
app.use('/', authRoutes)

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Api is working perfectly.",
  });
});
const Port = 3001;
app.listen(Port, () => {
  console.log(`Port is active at localhost:${Port}`);
});