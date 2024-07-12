import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import problemSlice from './problemSlice';

const store = configureStore({
    reducer:{
        auth:authSlice,
        problem:problemSlice,
    }
})


export default store;