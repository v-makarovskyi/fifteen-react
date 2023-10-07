import { useState } from "react";
import Item from './components/Item'
import "./app.css";

const createArray = (size) => {
  if (!size) {
    console.log("Данный размер массива не предусмотрен!");
  }
  const arr = Array.from({ length: size }, (_, index) => index + 1);
  arr.push(0);
  return arr;
};

const shuffled = (arr) => {
  return arr
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

function Button({ id, title, onClick }) {
  return (
    <button className="select-button" onClick={() => onClick(id)}>
      <span>{title}</span>
    </button>
  );
}

const selectButtonsValues = [
  { id: 0, value: 8, btnTitle: "3 × 3" },
  { id: 1, value: 15, btnTitle: "4 × 4" },
  { id: 2, value: 24, btnTitle: "5 × 5" },
];

function App() {
  const arrayOfGame = createArray(15);
  const [items, setItems] = useState(shuffled(arrayOfGame));
  const [stepCount, setStepCount] = useState(0);
  const [gameMode, setGameMode] = useState(15);
  const [tableGameSize, setTableGameSize] = useState(4);
  const [winner, setWinner] = useState(false);

  const handleChangeMode = (itemId) => {
    selectButtonsValues.map((item) => {
      if (item.id === itemId) {
        const mode = parseInt(item.value, 10);
        setTableGameSize(Math.sqrt(mode + 1));
        setGameMode(mode);
        setStepCount(0);
        setWinner(false);
      }
      return item;
    });
  };

  return (
    <div className="app container">
      <h1 className="title">Классическая головоломка 'Пятнашки'</h1>
      <div className="selectSizeArea">
        <h2 className="selectSizeArea-title">Выберите размерность поля:</h2>
        <div className="selectSizeArea-wrapper">
          {selectButtonsValues.map((item) => (
            <Button
              key={item.id}
              title={item.btnTitle}
              id={item.id}
              onClick={handleChangeMode}
            />
          ))}
        </div>
      </div>
      <div className={['game-area', 'game-area-size-' + tableGameSize].join(' ')}>
            {items.map(elem => <Item key={elem} elem={elem} />)}
      </div>
      <div className="info">
        <div className="info-count">Сделано ходов: {stepCount}</div>
      </div>
    </div>
  );
}

export default App;
