import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Fetch from "./component/Fetchapp";
import User from "./component/userdetail/UserDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fetch />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
