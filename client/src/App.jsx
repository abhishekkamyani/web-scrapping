import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Post from "./pages/Post";

export default function App() {


  return (
    // <div className="bg-white dark:bg-dark-main">
    <Router>
      {/* <CategoriesSelection /> */}
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route exact path="posts/:website" element={<Home />} />
          <Route path="post/:website" element={<Post />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>

    // </div>
  );
}
