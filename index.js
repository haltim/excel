const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({

  apiKey: "<YOUR_OPENAI_KEY>",

});

const openai = new OpenAIApi(configuration);

openai.listModels().then(models => {

  console.log(models);

  console.log('successfully connected');

}).catch(error => {

  console.log(error);

});

// Set up the server

const app = express();

app.use(bodyParser.json());

app.use(cors())

// Start the server

const port = 8080;

app.listen(port, () => {

  console.log(`Server listening on port ${port}`);

});
