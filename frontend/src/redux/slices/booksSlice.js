import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import createBookWithID from '../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = {
	books: [],
	isloadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
	'books/fetchBook',
	async (url, thunkAPI) => {
		try {
			const res = await axios.get(url);
			return res.data;
		} catch (error) {
			thunkAPI.dispatch(setError(error.message));
			// throw error;
			return thunkAPI.rejectWithValue(error);
		}
	}
)

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.books.push(action.payload);
		},
		deleteBook: (state, action) => {
			return {
				...state,
				books: state.books.filter((book) => book.id !== action.payload),
			}
		},
		toggleFavoriteBook: (state, action) => {
			state.books.forEach((book) => {
				if (book.id === action.payload) {
					book.isFavorite = !book.isFavorite;
				}
			})
		},
	},
	extraReducers: {
		[fetchBook.pending]: (state) => {
			state.isloadingViaAPI = true;
		},
		[fetchBook.fulfilled]: (state, action) => {
			state.isloadingViaAPI = false;
			if (action.payload.title && action.payload.author) {
				state.books.push(createBookWithID(action.payload, 'API'));
			}
		},
		[fetchBook.rejected]: (state) => {
			state.isloadingViaAPI = false;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(fetchBook.pending, (state) => {
	// 		state.isloadingViaAPI = true;
	// 	});
	// 	builder.addCase(fetchBook.fulfilled, (state, action) => {
	// 		if (action.payload.title && action.payload.author) {
	// 			state.push(createBookWithID(action.payload, 'API'));
	// 		}
	// 	});
	// 	builder.addCase(fetchBook.rejected, (state) => {
	// 		state.isloadingViaAPI = false;
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

export const selectBooks = (state) => state.books.books;
export const selectIsloadingViaAPI = (state) => state.books.isloadingViaAPI;

export default bookSlice.reducer;