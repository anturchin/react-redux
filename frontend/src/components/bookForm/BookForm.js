import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
// import { addBook } from '../../redux/books/actionCreators';
import { addBook, fetchBook, selectIsloadingViaAPI } from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import booksData from '../../data/books.json';

import createBookWithID from '../../utils/createBookWithId';

import './BookForm.css'

const BookForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	// const [isLoading, setIsLoading] = useState(false);

	const loadingViaAP = useSelector(selectIsloadingViaAPI);

	const dispatch = useDispatch();

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length);
		const randomBook = booksData[randomIndex];

		const randomBookWithId = createBookWithID(randomBook, 'random');
		dispatch(addBook(randomBookWithId));
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (title && author) {

			const book = createBookWithID({ title, author }, 'manual')

			dispatch(addBook(book));
			setTitle('');
			setAuthor('');
		} else {
			dispatch(setError('You must fill title and author'));
		}
	}

	const handleAddRandomViaAPI = () => {
		// try {
		// 	setIsLoading(true);
		// 	await dispatch(fetchBook('http://localhost:5000/random-book-delayed'));
		// } catch (error) {
		// 	console.log(error.message);
		// } finally {
		// 	setIsLoading(false);
		// }

		dispatch(fetchBook('http://localhost:5000/random-book-delayed'));

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
					disabled={loadingViaAP}
				>
					{loadingViaAP ? (
						<>
							<span>
								loading bokk...
								<FaSpinner className="spinner" />
							</span>
						</>

					) : 'add book via api'}
				</button>
			</form>
		</div>
	)
}

export default BookForm