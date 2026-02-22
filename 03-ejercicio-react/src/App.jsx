import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchForm } from "./components/SearchForm.jsx";
import { SearchResults } from "./components/SearchResults.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <SearchResults key={1} />
      </main>
      <Footer />
    </>
  );
}

export default App;
