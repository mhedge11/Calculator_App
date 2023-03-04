import { useContext } from 'react';
import { CalcContext } from '../context/CalcContext';

// Refers to the button pressed within the button grid
const getStyleName = (btn) => {
  const className = {
    '=': 'equals',
    '-': 'opt',
    '+': 'opt',
    '\u00F7': 'opt',
    x: 'opt',
    AC: 'opt',
    '%': 'opt',
    ')': 'opt',
    '(': 'opt',
    'x!': 'opt',
    Deg: 'opt',
    Rad: 'opt',
    Inv: 'opt',
    sin: 'opt',
    ln: 'opt',
    '\u03C0': 'opt',
    '\u221A': 'opt',
    'x\u02b8': 'opt',
    cos: 'opt',
    log: 'opt',
    e: 'opt',
    tan: 'opt',
    Ans: 'opt',
    EXP: 'opt',
  };
  return className[btn];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  // This will put the value into decimal form when a user clicks the period
  // Subsequent calcuations will remain in decimal form
  const periodClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    });
  };

  // When a user clicks "AC", this will reset num and res to zero
  const resetClick = () => {
    setCalc({ sign: '', num: 0, res: 0 });
  };

  // This is for when a user clicks a button 0-9 or the period (.)
  // It will store the value in num variable
  const handleClickButton = () => {
    const numberString = value.toString();
    let numberValue;
    if (numberString === '0' && calc.num === 0) {
      numberValue = '0';
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  // This updates the value in res based on whether or not res previously held a value
  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  // This calcuates values between 2 numbers when the equal button is pressed
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          x: (a, b) => a * b,
          '\u00F7': (a, b) => a / b,
          'x\u02b8': (a, b) => Math.pow(a, b),
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: '',
        num: 0,
      });
    }
  };

  // This calculates the percentage in decimal form
  const percentClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: '',
    });
  };

  // Inputs value of pi onto screen to use in calculations
  const piClick = () => {
    const numberString = Math.PI.toString();
    let numberValue;
    if (numberString === '0' && calc.num === 0) {
      numberValue = '0';
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  // Inputs value of e onto screen to use in calculations
  const eClick = () => {
    const numberString = Math.E.toString();
    let numberValue;
    if (numberString === '0' && calc.num === 0) {
      numberValue = '0';
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  // This changed from positive value to negative value and vice versa
  // This was actually meant to bring out the inverse of the buttons on a real calculator
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: '',
    });
  };

  // Cos Button Function
  const cosClick = () => {
    setCalc({
      ...calc,
      num: calc.res ? Math.cos(calc.res) : Math.cos(calc.num),
    });
  };

  // Sin Button Function
  const sinClick = () => {
    setCalc({
      ...calc,
      num: calc.res ? Math.sin(calc.res) : Math.sin(calc.num),
    });
  };

  // Tangent Button Function
  const tanClick = () => {
    setCalc({
      ...calc,
      num: calc.res ? Math.tan(calc.res) : Math.tan(calc.num),
    });
  };

  // LN Button Function
  const lnClick = () => {
    setCalc({
      ...calc,
      num: calc.res ? Math.log10(calc.res) : Math.log10(calc.num),
    });
  };

  // Log Button Function
  const logClick = () => {
    setCalc({
      ...calc,
      num: calc.res ? Math.log(calc.res) : Math.log(calc.num),
    });
  };

  // Square Root Button Function
  const sqrtClick = () => {
    setCalc({
      ...calc,
      num: calc.res ? Math.sqrt(calc.res) : Math.sqrt(calc.num),
    });
  };

  // Factoral Button Function
  const xFactorialClick = () => {
    let answer = 0;
    if (!calc.res && !calc.num) return;
    if (calc.res) {
      if (calc.res < 0) return;
      answer = recursive(calc.res);
      setCalc({
        ...calc,
        res: answer,
        num: answer,
      });
      return;
    }
    if (calc.num < 0) return;
    answer = recursive(calc.num);
    setCalc({
      ...calc,
      res: answer,
      num: answer,
    });
  };

  function recursive(n) {
    if (n === 0 || n === 1) {
      return 1;
    } else {
      return n * recursive(n - 1);
    }
  }

  // The Ans will use the res and num values and perform a math calculation based on the operands used
  // Not for sure on how this should be implented
  const answerClick = () => {
    if (calc.res && calc.num) {
      equalsClick();
    }
  };

  // Exponential button function
  const expClick = () => {
    setCalc({
      ...calc,
      num: calc.res ? Math.exp(calc.res) : Math.exp(calc.num),
    });
  };

  // This links the button pressed to the correct function
  const handleBtnClick = () => {
    const results = {
      '.': periodClick,
      AC: resetClick,
      '\u00F7': signClick,
      x: signClick,
      '-': signClick,
      '+': signClick,
      '=': equalsClick,
      '%': percentClick,
      Inv: invertClick,
      cos: cosClick,
      sin: sinClick,
      tan: tanClick,
      '\u03C0': piClick,
      e: eClick,
      ln: lnClick,
      '\u221A': sqrtClick,
      log: logClick,
      'x!': xFactorialClick,
      'x\u02b8': signClick,
      Ans: answerClick,
      EXP: expClick,
    };
    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };

  return (
    <button
      onClick={handleBtnClick}
      className={`${getStyleName(value)} button`}
    >
      {value}
    </button>
  );
};

export default Button;
