const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const questions = require('./questions.json').questions;

const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



// Serve a random question
app.get('/question', (req, res) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  res.json(questions[randomIndex]);
});

// Check answer
let totalCorrectAnswers = 0;

// Check answer
app.post('/answer', (req, res) => {
  const { question, selectedOption } = req.body;
  const correctAnswer = questions.find(q => q.question === question).answer;
  const isCorrect = selectedOption === correctAnswer;

  if (isCorrect) {
    totalCorrectAnswers++;
  }

  res.json({ isCorrect, correctAnswer, totalCorrectAnswers });
});
app.listen(port, () => {
  console.log(`Quiz app listening at http://localhost:${port}`);
});
