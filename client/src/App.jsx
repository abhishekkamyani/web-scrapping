import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    // <div className="bg-white dark:bg-dark-main">
    <Router>
      {/* <CategoriesSelection /> */}
      <Navbar />
      <main className="min-h-screen">
        {/* <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes> */}
      </main>
      {/* <Footer /> */}
    </Router>

    // </div>
  );
}
