const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "",
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


// Set up the ChatGPT endpoint
<<<<<<< HEAD
app.post("/chat", async (req, res) => {
=======
app.get("/", async (req, res) => {
>>>>>>> 63cbd49d94506cf75666b6ecfa54c007cff7272b
  // Get the prompt from the request
  const { prompt } = req.body;
  

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt ,
    max_tokens: 300,
    frequency_penalty: 0.4,
    presence_penalty:0.6,
    n: 4,
    stop: ".",
    
  });
  res.send(completion.data.choices[0].text);
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
