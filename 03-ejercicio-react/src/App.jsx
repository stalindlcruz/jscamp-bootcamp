import { Route } from "./components/Route.jsx";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { SearchPage } from "./pages/Search";
import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/404";

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/404" component={NotFoundPage} />
      <Footer />
    </>
  );
}

export default App;
