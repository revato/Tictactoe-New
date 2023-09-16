import "./App.css";
import Tictactoe from "./Tictactoe";

function App() {
  return (
    <div className="App">
      <Tictactoe />
      <button
        onClick={() => {
          window.location.reload(true);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
