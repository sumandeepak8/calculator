import React from 'react';

// model 
const filterElements = function (inputValues) {
  let reducer = function (acc, e) {
    if (e.charCodeAt(0) > 47 || e === '.') {
      acc[acc.length - 1] += e;
      return acc;
    }
    acc = acc.concat([e, '']);
    return acc;
  };
  return inputValues.split('').reduce(reducer, ['']);
};

const parseElements = function (filterElements) {
  return filterElements.map(x => {
    if (isNaN(x)) return x;
    return +x;
  });
};

const sum = (x, y) => x + y;

const multiply = (x, y) => x * y;

const division = (x, y) => x / y;

const sub = (x, y) => x - y;

const mod = (x, y) => x % y;

const getOperation = function (operator) {
  let operators = {
    '+': sum,
    '-': sub,
    '*': multiply,
    '/': division,
    '%': mod
  };
  return operators[operator];
};

const getCalcultedResult = function (inputArgs) {
  let { sample, result, possibleOperators } = inputArgs;
  for (let candidateOperator of possibleOperators) {
    while (sample.includes(candidateOperator)) {
      let index = sample.indexOf(candidateOperator);
      let operation = getOperation(candidateOperator);
      let first = sample[index - 1];
      let second = sample[index + 1];
      result = operation(first, second);
      sample.splice(index - 1, 3, result);
    }
  }
  return sample.join('');
};

const calculate = function (equation) {
  let filteredInput = filterElements(equation);
  let parsedElements = parseElements(filteredInput);
  let possibleOperators = ['/', '*', '%', '+', '-'];
  let result = 0;
  let sample = parsedElements.slice();
  let inputArgs = {
    sample,
    result,
    possibleOperators
  };
  return getCalcultedResult(inputArgs);
};


//controller
const display = function (input) {
  document.getElementById('display').value += input;
};

const clearDisplay = function () {
  window.location.reload();
};

const back = function () {
  let x = document.getElementById('display').value;
  document.getElementById('display').value = x.slice(0, x.length - 1);
};

const evaluatedInput = function () {
  let equation = document.getElementById('display').value;
  const evaluatedInput = calculate(equation);
  document.getElementById('display').value = evaluatedInput;
};

//component
class PageContent extends React.PureComponent {
  digits = [[7, 8, 9, '+'], [4, 5, 6, '-'], [1, 2, 3, '/'], [0, '.', '*', '%']];

  button = (text, action, id = '') => (
    <div onClick={action} id={id}><span>{text}</span></div>
  );

  handleClick

  mapper = items => items.map(arr => <div>{
    arr.map(item =>
      this.button(item, display.bind(null, item)))}</div>);

  render() {
    const inputBox = <input id="display" type="text" />;
    return <div className="grid">
      {inputBox}
      <div className="chars">
        {this.mapper(this.digits)}
        <div className="special-symbols">
          {this.button("=", evaluatedInput)}
          {this.button("C", back)}
          {this.button("AC", clearDisplay)}
        </div>
      </div>
    </div>;
  }
};


export default PageContent;