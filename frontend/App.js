import { BrowserRouter, Routes,  Route} from "react-router-dom";
import Form from './Form';
import Home from './Home';
import View from './View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/form' element={<Form/>}></Route>
          <Route path='/view' element={<View/>}></Route>
          <Route path='/view/:Date/:Time' element={<View/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
