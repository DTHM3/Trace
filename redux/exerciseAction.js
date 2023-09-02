export const ADD_EXERCISE = "ADD_EXERCISE"

export const addExercise = (exercise) => {
    return {
        type: ADD_EXERCISE,
        payload: {
            exercise: exercise
        }
    }
}