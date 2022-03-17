import "./App.css";
import { Home } from "./Compo/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { GetNote } from "./Compo/getNote";

function App() {
  return (
    <Router>
      <Routes>
        {/* <div className="App"> */}
        <>
          <Route path="/" element={<Home />} />

          <Route path="/tasks/:id" element={<GetNote />} />
        </>
        {/* </div> */}
      </Routes>
    </Router>
  );
}

export default App;
