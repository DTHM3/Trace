export const ADD_WORKOUT = "ADD_WORKOUT";
export const UPDATE_WORKOUT = "UPDATE_WORKOUT";
export const UPDATE_WORKOUT_ITEM = "UPDATE_WORKOUT_ITEM";

export const addWorkout = (workout) => {
    return {
        type: ADD_WORKOUT,
        payload: {
            workout: workout
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