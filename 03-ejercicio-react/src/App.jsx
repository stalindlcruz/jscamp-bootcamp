import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { SearchPage } from "./pages/Search";
import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/404";

function App() {
  const currentPathname = window.location.pathname;

  let page = <NotFoundPage />;
  if (currentPathname === "/") {
    page = <HomePage />;
  } else if (currentPathname === "/search") {
    page = <SearchPage />;
  }

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}

export default App;
