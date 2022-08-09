import {Routes, Route} from 'react-router-dom';
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={ <Main /> } />
      </Routes>
    </div>
  );
}

export default App;
