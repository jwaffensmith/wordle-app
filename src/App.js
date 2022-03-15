import { useEffect, useState } from "react";
import Header from "./Header";
import GameContainer from "./GameContainer";
import getLocalStorageKey from "./helpers/getLocalStorageKey";
import words from "./words.json"
import { Provider } from "react-redux";
import store from "./store"

function App() {

  const [ word, setWord ] = useState("");
  const wordList = words

  useEffect(() => {
      const key = getLocalStorageKey("word");
      const solution = localStorage.getItem(key);
      if (!solution) {
          const newWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
          localStorage.setItem(`${key}`, newWord);
          setWord(newWord)
        } else {
          setWord(solution)
        }
  }, []);

  return (
    <div>
      <Provider store={store} >
        <Header />
        <GameContainer word={word} />
      </Provider>
    </div>
  );
}

export default App;

