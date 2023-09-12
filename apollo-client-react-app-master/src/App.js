import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PostsPage from "./pages/PostsPage/PostsPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PostDetailsPage from "./pages/PostsPage/PostDetailsPage";
import AddPostPage from "./pages/PostsPage/AddPostPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="mt-5 pt-3 container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/add" element={<AddPostPage />} />
          <Route path="/posts/:postId" element={<PostDetailsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
