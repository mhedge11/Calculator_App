import ButtonBox from './components/ButtonBox';
import Layout from './components/Layout';
import Screen from './components/Screen';
import Button from './components/Button';
import CalcProvider from './context/CalcContext';

// Skeleton Code - basic calculator functionality from this demo and github:
// https://www.youtube.com/watch?v=o89bhL-S6g8
// https://github.com/candraKriswinarto/react-calculator-app/blob/main/src/index.css

const btnValues = [
  ['Rad', 'Deg', 'x!', '(', ')', '%', 'AC'],
  ['Inv', 'sin', 'ln', 7, 8, 9, '\u00F7'],
  ['\u03C0', 'cos', 'log', 4, 5, 6, 'x'],
  ['e', 'tan', '\u221A', 1, 2, 3, '-'],
  ['Ans', 'EXP', 'x\u02b8', 0, '.', '=', '+'],
];

function App() {
  return (
    <CalcProvider>
      <Layout>
        <Screen />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => (
            <Button value={btn} key={i} />
          ))}
        </ButtonBox>
      </Layout>
    </CalcProvider>
  );
}

export default App;
