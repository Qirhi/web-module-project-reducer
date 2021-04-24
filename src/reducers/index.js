import { CHANGE_MEMORY, APPLY_FIRST_NUMBER, CHANGE_OPERATION, CLEAR_DISPLAY, DO_EQUALS, CHANGE_CALCULATOR_STAGE } from './../actions';
export const WAITING_FOR_FIRST_OPERAND = "WAITING_FOR_FIRST_OPERAND";
export const WAITING_FOR_SECOND_OPERAND = "WAITING_FOR_SECOND_OPERAND";
export const CALCULATION_COMPLETE = "CALCULATION_COMPLETE";
// It is ok to put the string constants here, place them where they are relevant

export const initialState = {
    total: 0,
    operation: "+",
    memory: 0,
    displayValue: 0,
    firstNum: null,
    calculatorStage: WAITING_FOR_FIRST_OPERAND,
}

const calculateResult = (num1, num2, operation) => {
    switch(operation) {
        case("+"):
            return num1 + num2;
        case("*"):
            return num1 * num2;
        case("-"):
            return num1 - num2;
    }
}

const calculateMemory = (total, memoryOperator) => {
    switch(memoryOperator) {
        case("M+"):
            return total;
        case("MC"):
            return 0;
        case("MR"):
            console.log("ERROR: Calculate Memory does not handle \"MR\" memoryOperator");
            return undefined;
    }
};

const reducer = (state, action) => {
    switch(action.type) {

        case(CHANGE_CALCULATOR_STAGE):
        console.log("Action.payload: ", action.payload)
            return ({ 
                ...state, 
                calculatorStage: action.payload
            });

        case(CHANGE_MEMORY):
            const memoryOperator = action.payload;
            if (memoryOperator === "MR") {
                return ({
                    ...state,
                    total: state.memory
                })
            } else {
                return ({
                    ...state,
                    memory: calculateMemory(state.total, action.payload)
                })
            };

        case(APPLY_FIRST_NUMBER):
        // console.log("Type of payload:", typeof(action.payload)) STRING! 
            return ({ 
                ...state, 
                firstNum: Number(action.payload)
            });
        
        case(CHANGE_OPERATION):
            return ({
                ...state,
                operation: action.payload,
            });
        
        case(CLEAR_DISPLAY):
            return ({
                ...state,
                total: 0,
                memory: 0,
                displayValue: 0,
                firstNum: null, // QUESTION: TRAILING COMAS OR NO? For SWIFT
            });
        
        case(DO_EQUALS):
            return ({
                ...state,
                total: calculateResult(state.firstNum, Number(action.payload), state.operation),
                displayValue: calculateResult(state.total, Number(action.payload), state.operation),
                firstNum: null,
                // QUESTION:  WOULD YOU INCLUDE THE NUMBER LOGIC HERE OR IN COMPONENT LEVEL 
            });
            
        default:
            return state;
    }
}

export default reducer;