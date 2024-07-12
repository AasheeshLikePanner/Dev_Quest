import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    problemData:null,
    submissionCount:1,
}

const problemSlice = createSlice({
    name:'problem',
    initialState,
    reducers:{
        createProblem:(state, action) => {
            state.problemData = action.payload;
            state.submissionCount = 0;
        },
        changeSumbissionCount:(state) => {
            state.submissionCount += 1;
        }
    }
})

export const {createProblem, changeSumbissionCount} = problemSlice.actions;

export default problemSlice.reducer;