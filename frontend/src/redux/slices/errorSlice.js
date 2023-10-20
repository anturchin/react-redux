import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	message: '',
}

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.message = action.payload;
		},
		clearError: () => {
			return initialState;
		},
	}
})

export const { setError, clearError } = errorSlice.actions;

export const selectErrorMessage = (state) => state.error.message;

export default errorSlice.reducer;