import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/books/actionCreators';
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";

import {
	selectTitleFilter,
	selectAuthorFilter,
	selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';
import { toggleFavoriteBook } from '../../redux/books/actionCreators';


import './BookList.css';

const BookList = () => {

	const books = useSelector((state) => state.books);
	const titleFilter = useSelector(selectTitleFilter);
	const authorFilter = useSelector(selectAuthorFilter);
	const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
	const dispatch = useDispatch();

	const handleDeleteBook = (id) => {
		dispatch(deleteBook(id));
	}

	const handleToggleFavoriteBook = (id) => {
		dispatch(toggleFavoriteBook(id))
	}

	const filteredBooks = books.filter((book) => {
		const matchesTitle = book.title
			.toLowerCase()
			.includes(titleFilter.toLowerCase());

		const matchesAuthor = book.author
			.toLowerCase()
			.includes(authorFilter.toLowerCase());

		const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true

		return matchesTitle && matchesAuthor && matchesFavorite;
	})

	const highLightMatch = (text, filter) => {
		if (!filter) {
			return text;
		}
		const regex = new RegExp(`(${filter})`, 'gi');
		return text.split(regex).map((substring, i) => {
			if (substring.toLowerCase() === filter.toLowerCase()) {
				return (
					<span
						key={i}
						className="highlight"
					>
						{substring}
					</span>
				)
			}
			return substring;
		})
	}

	return (
		<div className="app-block book-list">
			<h2>Book list</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{filteredBooks.map((book, i) => (
						<li key={book.id}>
							<div className="book-info">
								{/* {++i}. {book.title} by <strong>{book.author}</strong> */}
								{++i}. {highLightMatch(book.title, titleFilter)} by <strong>{highLightMatch(book.author, authorFilter)}</strong>
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