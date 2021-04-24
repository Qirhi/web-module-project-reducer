import React, { useReducer, useState } from 'react';
import reducer, { initialState, WAITING_FOR_FIRST_OPERAND, WAITING_FOR_SECOND_OPERAND, CALCULATION_COMPLETE } from './reducers/index';
import './App.css';
import { applyFirstNumber, changeOperation, clearDisplay, changeMemory, doEquals, changeCalculatorStage } from './actions/index';
// Always import the export function.  Don't use export default.

import TotalDisplay from './components/TotalDisplay';
import CalcButton from './components/CalcButton';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [numberOne, setNumberOne] = useState(null);
  const [numberTwo, setNumberTwo] = useState(null);
  const [currentDisplay, setCurrentDisplay] = useState(0);

  const handleMemory = (e) => {
    console.log("dispatch changeMemory action");
    const memoryOperator = e.target.value;
    dispatch(changeMemory(memoryOperator));
  }

  const handleClick = (e) => {
    let number = e.target.value; // string

    if (state.calculatorStage === WAITING_FOR_SECOND_OPERAND) { 
       // logic for numberTwo
      if (numberTwo) {
        setNumberTwo(`${numberTwo}${number}`)
      } else {
        setNumberTwo(number);
      }
    } else {
      // logic for numberOne
      if (numberOne) {
        setNumberOne(`${numberOne}${number}`)
      } else {
        setNumberOne(number);
        dispatch(changeCalculatorStage(WAITING_FOR_FIRST_OPERAND));
      }
    }

    // handles the display state
    if (currentDisplay !== 0) {
      setCurrentDisplay(`${currentDisplay}${number}`)
    } else {
      setCurrentDisplay(number)
    }

  };

  const handleChangeOperator = (e) => {
    console.log("dispatch changeOperation & applyFirstNumber action")
    const operator = e.target.value;
    dispatch(changeOperation(operator));
    dispatch(applyFirstNumber(numberOne));
    dispatch(changeCalculatorStage(WAITING_FOR_SECOND_OPERAND));
    setCurrentDisplay(0);
  }

  const handleClearDisplay = (e) => {
    console.log("dispatch clearDisplay action")
    dispatch(clearDisplay());
    dispatch(changeCalculatorStage(WAITING_FOR_FIRST_OPERAND));
    setCurrentDisplay(0);
  }

  const handleEquals = (e) => {
    console.log("dispatch doEquals action")
    console.log("numberTwo in handleEquals: ", numberTwo)
    dispatch(doEquals(numberTwo));
    dispatch(changeCalculatorStage(CALCULATION_COMPLETE));
    setCurrentDisplay(state.total)
  }

  // CONSOLE.LOGS for debugging BELOW 
  console.log("APP state: ", state.calculatorStage);
  console.log("APP total: ", state.total);
  console.log("APP cd: ", currentDisplay);

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#"><img width="40px" src="./Lambda-Logo-Red.png"/> Lambda Reducer Challenge</a>
      </nav>

      <div className = "container row mt-5">
        <div className="col-md-12 d-flex justify-content-center">
          <form name="Cal">
            {/* CONSOLE.LOGS for debugging BELOW */}
            {console.log("state.firstNum: ", state.firstNum)}
            {console.log("numberTwo: ", numberTwo)}
            {console.log("displayValue: ", state.displayValue)}
            {console.log("total: ", state.total)}
  
            {/* BELOW: ternary to determine what to render, total after equals or currentDisplay as use types*/}
            <TotalDisplay 
              value={state.calculatorStage === CALCULATION_COMPLETE ? state.total : currentDisplay }
            />

            <div className="row details">
              <span id="operation"><b>Operation:</b>{state.operation}</span>
              <span id="memory"><b>Memory:</b>{state.memory}</span>
            </div>
            
            <div className="row">
              <CalcButton value={"M+"} onClick={handleMemory}/>
              <CalcButton value={"MR"} onClick={handleMemory}/>
              <CalcButton value={"MC"} onClick={handleMemory}/>
            </div>

            {/* REMINDER:  each number button has a number string value.  Convert in reducer to num to do calculations. */}
            <div className="row"> 
              <CalcButton value={1} onClick={handleClick}/>
              <CalcButton value={2} onClick={handleClick}/>
              <CalcButton value={3} onClick={handleClick}/>
            </div>

            <div className="row">
              <CalcButton value={4} onClick={handleClick}/>
              <CalcButton value={5} onClick={handleClick}/>
              <CalcButton value={6} onClick={handleClick}/>
            </div>

            <div className="row">
              <CalcButton value={7} onClick={handleClick}/>
              <CalcButton value={8} onClick={handleClick}/>
              <CalcButton value={9} onClick={handleClick}/>
            </div>

            <div className="row">
              <CalcButton value={"+"} onClick={handleChangeOperator}/>
              <CalcButton value={"*"} onClick={handleChangeOperator}/>
              <CalcButton value={"-"} onClick={handleChangeOperator}/>
            </div>

            <div className="row ce_button">
              <CalcButton value={"CE"} onClick={handleClearDisplay}/>
            </div>
            <div className="row ce_button">
              <CalcButton value={"="} onClick={handleEquals}/>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
