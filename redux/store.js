import {configureStore} from '@reduxjs/toolkit';
import workoutsReducer from './workoutReducer';
import exercisesReducer from './exerciseReducer';
import recoveryOptionReducer from './recoveryOptionsReducer';

const store = configureStore({reducer: {workouts: workoutsReducer, exercises: exercisesReducer, recovery: recoveryOptionReducer}});

export default store;