export const ADD_WORKOUT = "ADD_WORKOUT";
export const UPDATE_WORKOUT = "UPDATE_WORKOUT";
export const UPDATE_WORKOUT_ITEM = "UPDATE_WORKOUT_ITEM";

let workoutId = 0;

export const addWorkout = (workout) => {
    return {
        type: ADD_WORKOUT,
        payload: {
            id: ++workoutId,
            workout
        }
    };
}

export const updateWorkout = (id, workout) => {
    return {
        type: UPDATE_WORKOUT,
        payload: {
            id: id,
            workout: workout
        }
    }
}