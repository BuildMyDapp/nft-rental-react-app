import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Error404,
  Rent,
  Lend,
  Dashboard,
  Faq,
  Header,
  PublishNft
} from "./components/exportComponents";
import "./App.css";
function App() {
  return (
    <>
      <Router>
          <Header /> 
        <div className=" container mt-5">
          <Routes>
            <Route path="/" element={<Rent />} exact />
            <Route path="/lend" element={<Lend />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/publish_nft" element={<PublishNft />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
