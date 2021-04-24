export const ADD_ONE = "ADD_ONE";
export const CHANGE_MEMORY = "CHANGE_MEMORY";
export const APPLY_FIRST_NUMBER = "APPLY_NUMBER";
export const CHANGE_OPERATION = "CHANGE_OPERATION";
export const CLEAR_DISPLAY = "CLEAR_DISPLAY";
export const DO_EQUALS = "DO_EQUALS";
export const CHANGE_CALCULATOR_STAGE = "CHANGE_CALCULATOR_STAGE";
// STRING CONSTANTS AVOID string typos


export const changeMemory = (memoryOperator) => {
    console.log("changeMemory action creator fires")
    return({type:CHANGE_MEMORY, payload: memoryOperator});
}

export const applyFirstNumber = (firstNumber) => {
    console.log("applyFirstNumber action creator fires")
    return({type:APPLY_FIRST_NUMBER, payload:firstNumber});
}

export const changeOperation = (operator) => {
    console.log("changeOperation action creator fires")
    return({type:CHANGE_OPERATION, payload: operator}); 
} 

/*
export const changeOperation = (operator, numberOne) => {
    console.log("changeOperation action creator fires")
    return({type:CHANGE_OPERATION, payload: {operator, numberOne}}); 
} // EXAMPLE OF TAKING IN TWO PARAMETERS, PASSING TWO PAYLOADS
*/

export const clearDisplay = () => {
    console.log("clearDispaly action creator fires")
    return ({type:CLEAR_DISPLAY});
}

export const doEquals = (numberTwo) => {
    console.log("doEquals action creator fires")
    return ({type:DO_EQUALS, payload: numberTwo});
}

export const changeCalculatorStage = (stage) => {
    console.log("changeCalculatorStage action creator fires", stage)
    return ({type:CHANGE_CALCULATOR_STAGE, payload: stage});
}