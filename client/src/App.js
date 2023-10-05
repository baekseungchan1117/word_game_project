import "./App.css";
import Main from "./pages";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="main">
        <Main />
      </div>
    </>
  );
}

export default App;
