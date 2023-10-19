import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { addBook } from '../../redux/books/actionCreators';
import { addBook } from '../../redux/slices/booksSlice';
import booksData from '../../data/books.json';

import createBookWithID from '../../utils/createBookWithId';

import './BookForm.css'

const BookForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');

	const dispatch = useDispatch();

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length);
		const randomBook = booksData[randomIndex];

		const randomBookWithId = createBookWithID(randomBook);
		dispatch(addBook(randomBookWithId));
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (title && author) {

			const book = createBookWithID({ title, author })

			dispatch(addBook(book));
			setTitle('');
			setAuthor('');
		}
	}

	const handleAddRandomViaAPI = async () => {
		try {
			const res = await axios.get('http://localhost:5000/random-book');
			if (res?.data?.title && res?.data?.author) {
				dispatch(addBook(createBookWithID(res.data)));
			}
		} catch (error) {
			console.log(error);
		}

	}

	return (
		<div className="app-block book-form">
			<h2>Add a new Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title: </label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="author">Author: </label>
					<input
						type="text"
						id="author"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</div>
				<button type='submit'>add book</button>
				<button
					type='button'
					onClick={handleAddRandomBook}
				>
					add random
				</button>
				<button
					type="button"
					onClick={handleAddRandomViaAPI}
				>
					add book via api
				</button>
			</form>
		</div>
	)
}

export default BookForm