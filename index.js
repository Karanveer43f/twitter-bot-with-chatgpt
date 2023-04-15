const express = require("express");
const ejs = require("ejs");
const port = 4000;
const app = express();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assets"));
app.listen(port, () => console.log(`Listening on ${port}`));

let questionForGPT;
let answer;
let history = [];
let myMessages = [];

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const callToAPI = async () => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: history,
      temperature: 1,
    });

    answer = response.data.choices[0].message.content;
    history.push({ role: "assistant", content: answer });
    console.log(history);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

app.get("/", (req, res) => {
  res.render("home", { title: "ChatGPT Clone", chats: history });
});

app.post("/ask-gpt", async (req, res) => {
  questionForGPT = req.body.question;
  history.push({ role: "user", content: questionForGPT });
  await callToAPI();
  res.redirect("/");
});
