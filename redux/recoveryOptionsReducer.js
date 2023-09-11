import { ADD_RECOVERY, SET_RECOVERY_VAL, REMOVE_RECOVERY } from "./recoveryOptionsAction";

let recoveryOptionIdCounter = 0;

const initialState = {
    recoveryOptions: [{id: ++recoveryOptionIdCounter, name: "Muscular Fatigue", vals: {}}, {id: ++recoveryOptionIdCounter, name: "Mental Fatigue", vals: {}}, {id: ++recoveryOptionIdCounter, name: "Stress", vals: {}}, {id: ++recoveryOptionIdCounter, name: "Sleep", vals: {}}]
}

const recoveryOptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECOVERY: {
            return {
                ...state,
                recoveryOptions: [...state.recoveryOptions, {id: ++recoveryOptionIdCounter, name: action.payload.option, vals: {}}]
            }
        }
        case SET_RECOVERY_VAL: {
            const index = state.recoveryOptions.findIndex((i) => i.id === action.payload.id)
            copyObj = {...state.recoveryOptions[index]}
            copyVals = {...copyObj.vals}
            copyVals[action.payload.date] = action.payload.val;
            copyObj.vals = copyVals;
            return {
                ...state,
                recoveryOptions: [...state.recoveryOptions.slice(0, index), copyObj, ...state.recoveryOptions.slice(index + 1)]
            }
        }
        case REMOVE_RECOVERY: {
            const index = state.recoveryOptions.findIndex((i) => i.id === action.payload.id);
            return {
              ...state,
              recoveryOptions: [...state.recoveryOptions.slice(0, index), ...state.recoveryOptions.slice(index + 1)]
            }
          }
        default: return state;
    }
}

export default recoveryOptionReducer;