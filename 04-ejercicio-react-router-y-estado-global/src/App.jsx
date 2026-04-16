import { Routes, Route } from "react-router";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
// import { Route } from "./components/Route.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
