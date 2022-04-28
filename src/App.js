import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PropertiesListings from './Components/Properties/PropertiesListings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropertiesListings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
