import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import createBookWithID from '../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = [];

export const fetchBook = createAsyncThunk(
	'books/fetchBook',
	async (url, thunkAPI) => {
		try {
			const res = await axios.get(url);
			return res.data;
		} catch (error) {
			thunkAPI.dispatch(setError(error.message));
			throw error;
		}
	}
)

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
	},
	extraReducers: {
		[fetchBook.fulfilled]: (state, action) => {
			if (action.payload.title && action.payload.author) {
				state.push(createBookWithID(action.payload, 'API'));
			}
		}
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(fetchBook.fulfilled, (state, action) => {
	// 		if (action.payload.title && action.payload.author) {
	// 			state.push(createBookWithID(action.payload, 'API'));
	// 		}
	// 	});
	// }
})


export const { addBook, deleteBook, toggleFavoriteBook } = bookSlice.actions;

// export const thunkFunction = async (dispatch, getState) => {

// 	try {
// 		const res = await axios.get('http://localhost:5000/random-book');
// 		if (res?.data?.title && res?.data?.author) {
// 			dispatch(addBook(createBookWithID(res.data, 'API')));
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

export const selectBooks = (state) => state.books;

export default bookSlice.reducer;