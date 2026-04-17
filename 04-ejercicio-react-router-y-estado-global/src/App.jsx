import { Routes, Route } from "react-router";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";

import { DetailPage } from "./pages/Detail.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/jobs/:id" element={<DetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
