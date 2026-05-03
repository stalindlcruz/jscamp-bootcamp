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
const ProfilePage = lazy(() => import("./pages/Profile.jsx"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute.jsx"));
const LoginPage = lazy(() => import("./pages/Login.jsx"));
const RegisterPage = lazy(() => import("./pages/Register.jsx"));

function App() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <>
            <title>Cargando página</title>
            <LoadingSpinner text="Cargando la página. por favor espere!" />
          </>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:id" element={<DetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
