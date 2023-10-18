import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/books/actionCreators';
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";

import { toggleFavoriteBook } from '../../redux/books/actionCreators';


import './BookList.css';

const BookList = () => {

	const books = useSelector((state) => state.books);
	const dispatch = useDispatch();

	const handleDeleteBook = (id) => {
		dispatch(deleteBook(id));
	}

	const handleToggleFavoriteBook = (id) => {
		dispatch(toggleFavoriteBook(id))
	}

	return (
		<div className="app-block book-list">
			<h2>Book list</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{books.map((book, i) => (
						<li key={book.id}>
							<div className="book-info">
								{++i}. {book.title} by <strong>{book.author}</strong>
							</div>
							<div className="book-actions">
								<span onClick={() => handleToggleFavoriteBook(book.id)}>
									{book.isFavorite ? (
										<BsBookmarkStarFill className="star-icon" />
									) : (
										<BsBookmarkStar className="star-icon" />
									)}
								</span>
								<button
									onClick={() => handleDeleteBook(book.id)}>
									delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div >
	)
}

export default BookList