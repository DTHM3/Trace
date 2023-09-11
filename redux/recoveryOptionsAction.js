export const ADD_RECOVERY = "ADD_RECOVERY";
export const SET_RECOVERY_VAL = "SET_RECOVERY_VAL";
export const REMOVE_RECOVERY = "REMOVE_RECOVERY";

export const addRecoveryOption = (option) => {
    return {
        type: ADD_RECOVERY,
        payload: {
            option: option
        }
    }
}

export const setValRecovery = (date, id, val) => {
    return {
        type: SET_RECOVERY_VAL,
        payload: {
            date: date,
            id: id,
            val: val
        }
    }
}

export const removeRecovery = (id) => {
    return {
        type: REMOVE_RECOVERY,
        payload: {
            id: id
        }
    }
}