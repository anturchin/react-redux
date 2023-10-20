const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

function getRandombook(booksData) {
	const randomIndex = Math.floor(Math.random() * booksData.length);
	const randomBook = booksData[randomIndex];
	return randomBook;
}

app.get('/random-book', (req, res) => {
	res.json(getRandombook(booksData));
});

app.get('/random-book-delayed', (req, res) => {
	setTimeout(() => {
		res.json(getRandombook(booksData));
	}, 3000)
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});

