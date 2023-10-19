import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.push(action.payload);
		},
		deleteBook: (state, action) => {
			return state.filter((book) => book.id !== action.payload);
		},
		toggleFavoriteBook: (state, action) => {
			state.forEach((book) => {
				if (book.id === action.payload) {
					book.isFavorite = !book.isFavorite;
				}
			})
		},
	}
})

export const { addBook, deleteBook, toggleFavoriteBook } = bookSlice.actions;

export const selectBooks = (state) => state.books;

export default bookSlice.reducer;