import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3002/todo"
const initialState = {
    loadings: false,
    todos:[
        {
            id: 0,
            text: 'first',
            done: false,
        },
    ],
    error: ""
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", () => {
    return axios.get(BASE_URL).then(res => res.data)
})

export const deleteTodos = createAsyncThunk("todos/deleteTodos", (id) => {
    return axios.delete(`${BASE_URL}/${id}`).then(res => res.data)
})

export const createTodos = createAsyncThunk("todos/createTodos", (post) => {
    return axios.post(BASE_URL, post).then(res => res.data)
})

export const changeDone = createAsyncThunk("todos/changeDone",  (id) => {
    return axios.patch(`${BASE_URL}/${id}`, {done: false}).then(res => res.data)
} )

export const changeNotDone = createAsyncThunk("todos/changeNotDone",  (id) => {
    return axios.patch(`${BASE_URL}/${id}`, {done: true}).then(res => res.data)
} )
const todoSlice = createSlice({
    name: "todos",
    initialState,
    extraReducers: {

        // FETCH GET
        [fetchTodos.pending]: (state) => {
            state.loadings= true
        },
        [fetchTodos.fulfilled]: (state , action) => {
            state.loadings= false;
            state.todos= action.payload
        },
        [fetchTodos.rejected]: (state) => {
            state.loadings= false;
            state.error = "some thing went wrong :( "
        },

        // FETCH POST 
        [createTodos.pending]: (state) => {
            state.loadings= true
        },
        [createTodos.fulfilled]: (state, action) => {
            state.loadings= false;
            // state.todos = action.payload;
        },
        [createTodos.rejected]: (state) => {
            state.loadings= false;
            state.error = "some thing went wrong :( "
        },

        // FETCH DELETE
        [deleteTodos.pending]: (state) => {
            state.loadings= true
        },
        [deleteTodos.fulfilled]: (state, action) => {
            state.loadings= false;
            // state.todos = action.payload;
        },
        [deleteTodos.rejected]: (state) => {
            state.loadings= false;
            state.error = "some thing went wrong :( "
        },

        // FETCH UPDATE
        [changeDone.pending]: (state) => {
            state.loadings= true
        },
        [changeDone.fulfilled]: (state, action) => {
            state.loadings= false;
            // state.todos = action.payload;
        },
        [changeDone.rejected]: (state) => {
            state.loadings= false;
            state.error = "some thing went wrong :( "
        },
        [changeNotDone.pending]: (state) => {
            state.loadings= true
        },
        [changeNotDone.fulfilled]: (state, action) => {
            state.loadings= false;
            // state.todos = action.payload;
        },
        [changeNotDone.rejected]: (state) => {
            state.loadings= false;
            state.error = "some thing went wrong :( "
        },
    
    }
})


export default todoSlice.reducer 