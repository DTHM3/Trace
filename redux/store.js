import {configureStore} from '@reduxjs/toolkit';
import workoutsReducer from './workoutReducer';
import exercisesReducer from './exerciseReducer';

const store = configureStore({reducer: {workouts: workoutsReducer, exercises: exercisesReducer}});

export default store;