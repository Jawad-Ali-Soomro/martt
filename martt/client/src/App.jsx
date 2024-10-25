import { BrowserRouter } from "react-router-dom";
import Header from "./_components/Header";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Welcome from "./_pages/Welcome";
import Main from "./_pages/Main";
import ScrollToTop from "./_constants/ScroolToTop";
import Profile from "./_pages/Profile";
import NotFound from "./_pages/notFound";

function App() {
  const token = window.localStorage.getItem("_martt_auth");
  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/product/:id" element={<Main />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={token ? <Profile /> : <NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
