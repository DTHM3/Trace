import { ADD_WORKOUT, UPDATE_WORKOUT, REMOVE_WORKOUT } from "./workoutAction";

let idCounter = 0;

const workout1 = {
    name: "workout1",
    exerciseNames:['e1', 'e2', 'e3', 'e4'],
    numSets:[3, 4, 5, 6],
    reps:[
      [11, 21, 31],
      [11, 21, 31, 41],
      [11, 21, 31, 41, 51],
      [11, 21, 31, 41, 51, 61],
    ],
    weights:[
      [10, 20, 30],
      [10, 20, 30, 40],
      [10, 20, 30, 40, 50],
      [10, 20, 30, 40, 50, 60],
    ],
    rpes:[
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6],
    ],
}
const workout2 = {
    name: 'workout2',
    exerciseNames:['e1', 'e2', 'e3', 'e4'],
    numSets:[3, 4, 5, 6],
    reps:[
      [11, 21, 31],
      [11, 21, 31, 41],
      [11, 21, 31, 41, 51],
      [11, 21, 31, 41, 51, 61],
    ],
    weights:[
      [10, 20, 30],
      [10, 20, 30, 40],
      [10, 20, 30, 40, 50],
      [10, 20, 30, 40, 50, 60],
    ],
    rpes:[
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6],
    ],
}
const workout3 = {
    name: 'workout3',
    exerciseNames:['e1', 'e2', 'e3', 'e4'],
    numSets:[3, 4, 5, 6],
    reps:[
      [11, 21, 31],
      [11, 21, 31, 41],
      [11, 21, 31, 41, 51],
      [11, 21, 31, 41, 51, 61],
    ],
    weights:[
      [10, 20, 30],
      [10, 20, 30, 40],
      [10, 20, 30, 40, 50],
      [10, 20, 30, 40, 50, 60],
    ],
    rpes:[
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6],
    ],
}

const initialState = {
    workouts: [{id: ++idCounter, workout: workout1}, {id: ++idCounter, workout: workout2}, {id: ++idCounter, workout: workout3}]
};

const workoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKOUT: {
            return {
              ...state, 
              workouts: [...state.workouts, {id: ++idCounter, workout: action.payload.workout} ]
            }
          
        }
        case UPDATE_WORKOUT: {
          const index = state.workouts.findIndex((i) => i.id === action.payload.id);
          return {
            ...state,
            workouts: [...state.workouts.slice(0, index), {id: action.payload.id, workout: action.payload.workout}, ...state.workouts.slice(index + 1)]
          }
        }
        case REMOVE_WORKOUT: {
          const index = state.workouts.findIndex((i) => i.id === action.payload.id);
          return {
            ...state,
            workouts: [...state.workouts.slice(0, index), ...state.workouts.slice(index + 1)]
          }
        }
        default: return state;
    }
}

export default workoutsReducer;