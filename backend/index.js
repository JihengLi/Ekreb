const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;
let actualWord;

function scrambleWord(words) {
    actualWord = words[Math.floor(Math.random() * words.length)];
    var letters = actualWord;
    letters = letters.split('');
    for (var i = letters.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = letters[i];
        letters[i] = letters[j];
        letters[j] = temp;
    }
    var scrambled = letters.join('');
    return scrambled;
}

app.use(cors());

let score = 0;

app.get('/hello', (req, res) => {
    res.send('hello world!');
});

app.get('/score', (req, res) => {
    res.send(`${score}`);
});

app.patch('/score', (req, res) => {
    score += parseInt(req.query.val);
    res.status(200).send(`${score}`);
});

app.get('/getWord', (req, res) => {
    const file = fs.readFileSync('../english-words.csv', 'utf-8');
    var lines = file.split('\n');
    var words = [];
    lines.forEach((line) => {
        var word = line.trim();
        words.push(word);
    });
    const randomWord = scrambleWord(words);
    res.send(randomWord);
});

app.get('/getTrueWord', (req, res) => {
    res.send(actualWord);
});

app.patch('/guessWord', (req, res) => {
    if (req.query.word === actualWord) {
        res.status(200).send('true');
    } else {
        res.status(200).send('false');
    }
});

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});