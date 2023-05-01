const express = require("express");
const app = express();
const cors = require("cors");
const authentication = require('./routes/authentication')
const event = require('./routes/event')

const auth = require('./config/firebase').auth;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(authentication);
app.use(event)

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
