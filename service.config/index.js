const axios = require("axios");
const express = require("express");
const yaml = require('js-yaml');
const fs = require('fs');

const port = 80;

const readConfig = (name) => {
  config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
  return config[name]
};

const app = express();

// Any query after "/read" will be the keys of the objects we want to get from the config file
app.get("/read", (req, res) => {
  name = req.query.name
  res.json(readConfig(name))
});


app.listen(port, () => console.log('Listening on port ${port}'));

