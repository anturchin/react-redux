const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/random-book', (req, res) => {
	const randomIndex = Math.floor(Math.random() * booksData.length);
	const randomBook = booksData[randomIndex];
	res.json(randomBook);
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});