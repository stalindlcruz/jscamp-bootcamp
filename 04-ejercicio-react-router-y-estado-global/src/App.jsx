import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const DetailPage = lazy(() => import("./pages/Detail.jsx"));
const LoadingSpinner = lazy(() => import("./components/LoadingSpinner.jsx"));
const ContactPage = lazy(() => import("./pages/Contact.jsx"));
const NotFoundPage = lazy(() => import("./pages/404.jsx"));

function App() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <>
            <LoadingSpinner text="Cargando la página. por favor espere!" />
          </>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:id" element={<DetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
