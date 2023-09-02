import { ADD_EXERCISE } from "./exerciseAction";

let exerciseIdCounter = 0;

const initialState = {
    exercises: [{id: ++exerciseIdCounter, exercise: "exercise1"}, {id: ++exerciseIdCounter, exercise: "exercise2"}, {id: ++exerciseIdCounter, exercise: "exercise3"}, {id: ++exerciseIdCounter, exercise: "exercise4"}, {id: ++exerciseIdCounter, exercise: "exercise5"}, {id: ++exerciseIdCounter, exercise: "exercise6"}, {id: ++exerciseIdCounter, exercise: "exercise7"}, {id: ++exerciseIdCounter, exercise: "exercise8"}]
};

const exercisesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXERCISE: {
            return {
                ...state, 
                exercises: [...state.exercises, {id: ++exerciseIdCounter, exercise: action.payload.exercise} ]
            }
        }
        default: return state;
    }
}

export default exercisesReducer;