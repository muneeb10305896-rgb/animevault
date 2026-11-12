import { HashRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DiscoverPage from './pages/DiscoverPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import WatchlistPage from './pages/WatchlistPage.jsx'
import { useWatchlist } from './hooks/useWatchlist.js'

// HashRouter is used instead of BrowserRouter because GitHub Pages
// only serves static files. URLs look like /#/watchlist, so a page
// refresh never asks the server for a path that does not exist.
function App() {
  // The watchlist state lives here, at the top, so all screens share it
  const watchlist = useWatchlist()

  return (
    <HashRouter>
      <NavBar watchlistCount={watchlist.items.length} />
      <Container as="main" className="py-4">
        <Routes>
          <Route path="/" element={<DiscoverPage isSaved={watchlist.isSaved} />} />
          <Route path="/anime/:id" element={<DetailsPage watchlist={watchlist} />} />
          <Route path="/watchlist" element={<WatchlistPage watchlist={watchlist} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <ToastContainer position="bottom-right" autoClose={2500} limit={3} theme="colored" />
    </HashRouter>
  )
}

export default App
