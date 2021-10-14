import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    status: 'loading',
    errMess: null,
    comments: []
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            console.log('comment being added')
            const newComment = {campsiteId, rating, author, text}
        },
        addComments: (state, action) => {
            state.status = 'idle'
            state.errMess = null
            state.comments = action.payload
        },
        commentsLoading: (state) => {
            state.status = 'loading'
            state.errMess = null
            state.comments = []
        },
        commentsFailed: (state, action) => {
            state.status = 'failed'
            state.errMess = action.payload
        }
    }
})

export const { addComment, addComments, commentsLoading, commentsFailed } = commentsSlice.actions
export default commentsSlice.reducer

export function fetchComments() {
    return async dispatch => {
        dispatch(commentsLoading())
        try {
            const response = await fetch(`${baseUrl}comments`)
            const data = await response.json()
            dispatch(addComments(data))
        } catch (error) {
            dispatch(commentsFailed(error.message))
        }
    }
}

export function postComment(campsiteId, rating, author, text) {
    console.log('comment being posted')
    return async dispatch => {
        dispatch(addComment())
    }
}