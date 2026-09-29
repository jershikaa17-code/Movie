import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import FinishSignUp from "./pages/onboarding/FinishSignUp";
import Login from "./pages/Login";

function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<FinishSignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<AppLayout />}>
            <Route path="/browse" element={<Home />} />
            <Route
              path="/popular"
              element={<Browse category="popular" title="Popular Movies" />}
            />
            <Route
              path="/now-playing"
              element={<Browse category="now-playing" title="Now Playing" />}
            />
            <Route
              path="/top-rated"
              element={<Browse category="top-rated" title="Top Rated" />}
            />
            <Route
              path="/upcoming"
              element={<Browse category="upcoming" title="Upcoming Movies" />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}
