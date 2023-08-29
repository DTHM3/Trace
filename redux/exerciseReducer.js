import { ADD_EXERCISE } from "./exerciseAction";

let idCounter = 0;

const initialState = {
    exercises: [{id: ++idCounter, exercise: "exercise1"}, {id: ++idCounter, exercise: "exercise2"}, {id: ++idCounter, exercise: "exercise3"}, {id: ++idCounter, exercise: "exercise4"}]
};

const exercisesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXERCISE: {
            return {
                ...state, 
                exercises: [...state.exercises, {id: ++idCounter, exercise: action.payload.exercise} ]
            }
        }
        default: return state;
    }
}

export default exercisesReducer;