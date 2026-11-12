import { HashRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DiscoverPage from './pages/DiscoverPage.jsx'

// HashRouter is used instead of BrowserRouter because GitHub Pages
// only serves static files. URLs look like /#/watchlist, so a page
// refresh never asks the server for a path that does not exist.
function App() {
  return (
    <HashRouter>
      <NavBar watchlistCount={0} />
      <Container as="main" className="py-4">
        <Routes>
          <Route path="/" element={<DiscoverPage isSaved={() => false} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
