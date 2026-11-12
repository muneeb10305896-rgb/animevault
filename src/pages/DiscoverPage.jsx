import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import AnimeCard from '../components/AnimeCard.jsx'
import { Loading, ErrorMessage } from '../components/StatusMessage.jsx'
import { getTopAnime, searchAnime } from '../api/jikan.js'

// Screen 1: Discover. Shows top rated anime, or search results.
// The search is stored in the URL (?q=naruto) so the back button
// from the details screen brings the user back to the same results.
function DiscoverPage({ isSaved }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const type = searchParams.get('type') || ''

  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0) // changing this re-runs the effect

  useEffect(() => {
    let ignore = false // prevents an old, slow request from overwriting newer results

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = query ? await searchAnime(query, type) : await getTopAnime()
        if (!ignore) setAnimeList(data)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [query, type, reloadKey])

  function handleSearch(newQuery, newType) {
    const params = { q: newQuery }
    if (newType) params.type = newType
    setSearchParams(params)
  }

  function handleClear() {
    setSearchParams({})
  }

  return (
    <>
      <header className="mb-4">
        <h1 className="h2 fw-bold">Discover anime</h1>
        <p className="text-muted mb-0">
          Search the MyAnimeList database, open any title for details and save it to your watchlist.
        </p>
      </header>

      <SearchBar key={query} initialQuery={query} onSearch={handleSearch} onClear={handleClear} />

      <h2 className="h5 mb-3">{query ? `Results for "${query}"` : 'Top rated anime'}</h2>

      {loading && <Loading text={query ? 'Searching...' : 'Loading top anime...'} />}
      {error && <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />}

      {!loading && !error && animeList.length === 0 && (
        <p className="text-muted">No anime found. Try another title.</p>
      )}

      {!loading && !error && (
        <Row xs={2} sm={3} md={4} lg={6} className="g-3">
          {animeList.map((anime) => (
            <Col key={anime.mal_id}>
              <AnimeCard anime={anime} isSaved={isSaved(anime.mal_id)} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default DiscoverPage
