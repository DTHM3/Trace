import {configureStore} from '@reduxjs/toolkit';
import workoutsReducer from './workoutReducer';

const store = configureStore({reducer: workoutsReducer});

export default store;