export const ADD_EXERCISE = "ADD_WORKOUT"

let exerciseId = 0;

export const addExercise = (exercise) => {
    return {
        type: ADD_EXERCISE,
        payload: {
            id: ++exerciseId,
            exercise: exercise
        }
    }
}