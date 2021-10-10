import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Error404, Rent, Lend, Dashboard, Faq } from './components/exportComponents'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Rent />} exact />
          <Route path="/lend" element={<Lend />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<Faq />} />

          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
