import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errMess: null,
    comments: []
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComments: (state, action) => {
            state.errMess = null,
            state.comments = action.payload
        },
        commentsFailed: (state, action) => {
            state.errMess = action.payload
        }
    }
})

export const { addComments, commentsFailed } = commentsSlice.actions

export default commentsSlice.reducer