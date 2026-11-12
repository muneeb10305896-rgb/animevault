import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Badge, Button, Form, Card, Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Loading, ErrorMessage } from '../components/StatusMessage.jsx'
import { getAnimeById, getAnimeCharacters } from '../api/jikan.js'
import { STATUSES } from '../hooks/useWatchlist.js'

// Screen 2: Details of one anime. The id comes from the URL (/anime/:id).
function DetailsPage({ watchlist }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const animeId = Number(id)

  const [anime, setAnime] = useState(null)
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [chosenStatus, setChosenStatus] = useState(STATUSES[0])

  useEffect(() => {
    let ignore = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getAnimeById(animeId)
        if (ignore) return
        setAnime(data)
        setLoading(false)

        // Characters are extra information. If this second request fails
        // the page still works, so the error is not shown to the user.
        try {
          const chars = await getAnimeCharacters(animeId)
          if (!ignore) setCharacters(chars.filter((c) => c.role === 'Main').slice(0, 6))
        } catch {
          if (!ignore) setCharacters([])
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [animeId, reloadKey])

  if (loading) return <Loading text="Loading anime details..." />
  if (error)
    return (
      <>
        <Button variant="link" className="px-0 mb-3" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
      </>
    )
  if (!anime) return null

  const title = anime.title_english || anime.title
  const savedItem = watchlist.getItem(anime.mal_id)

  function handleAdd() {
    watchlist.addItem(anime, chosenStatus)
    toast.success(`${title} added to your watchlist`)
  }

  function handleRemove() {
    watchlist.removeItem(anime.mal_id)
    toast.info(`${title} removed from your watchlist`)
  }

  return (
    <article>
      <Button variant="link" className="px-0 mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Row className="g-4">
        <Col md={4} lg={3}>
          <Image
            src={anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url}
            alt={`Poster of ${title}`}
            fluid
            rounded
            className="shadow w-100"
          />

          <Card className="mt-3 shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="h6">
                Your watchlist
              </Card.Title>
              {savedItem ? (
                <>
                  <p className="small mb-2">
                    Saved as <Badge bg="success">{savedItem.status}</Badge>
                  </p>
                  <Button variant="outline-danger" size="sm" className="w-100" onClick={handleRemove}>
                    Remove from watchlist
                  </Button>
                </>
              ) : (
                <>
                  <Form.Select
                    size="sm"
                    className="mb-2"
                    aria-label="Watch status"
                    value={chosenStatus}
                    onChange={(e) => setChosenStatus(e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Form.Select>
                  <Button variant="success" size="sm" className="w-100" onClick={handleAdd}>
                    + Add to watchlist
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} lg={9}>
          <h1 className="h2 fw-bold mb-1">{title}</h1>
          {anime.title_japanese && <p className="text-muted mb-2">{anime.title_japanese}</p>}

          <div className="d-flex flex-wrap gap-2 mb-3">
            {anime.score && <Badge bg="warning" text="dark">★ {anime.score}</Badge>}
            {anime.rank && <Badge bg="secondary">Rank #{anime.rank}</Badge>}
            <Badge bg="primary">{anime.type || 'Unknown type'}</Badge>
            <Badge bg="info" text="dark">{anime.status}</Badge>
            {anime.genres?.map((g) => (
              <Badge key={g.mal_id} bg="light" text="dark" className="border">
                {g.name}
              </Badge>
            ))}
          </div>

          <dl className="row small mb-3">
            <dt className="col-5 col-sm-3">Episodes</dt>
            <dd className="col-7 col-sm-9">{anime.episodes ?? 'Unknown'}</dd>
            <dt className="col-5 col-sm-3">Aired</dt>
            <dd className="col-7 col-sm-9">{anime.aired?.string || 'Unknown'}</dd>
            <dt className="col-5 col-sm-3">Studio</dt>
            <dd className="col-7 col-sm-9">{anime.studios?.map((s) => s.name).join(', ') || 'Unknown'}</dd>
            <dt className="col-5 col-sm-3">Duration</dt>
            <dd className="col-7 col-sm-9">{anime.duration || 'Unknown'}</dd>
          </dl>

          <h2 className="h5">Synopsis</h2>
          <p className="synopsis">{anime.synopsis || 'No synopsis available.'}</p>

          {anime.trailer?.url && (
            <Button href={anime.trailer.url} target="_blank" rel="noreferrer" variant="danger" size="sm" className="mb-4">
              ▶ Watch trailer on YouTube
            </Button>
          )}

          {characters.length > 0 && (
            <>
              <h2 className="h5">Main characters</h2>
              <Row xs={3} sm={4} lg={6} className="g-2">
                {characters.map((c) => (
                  <Col key={c.character.mal_id} className="text-center">
                    <Image
                      src={c.character.images?.webp?.image_url || c.character.images?.jpg?.image_url}
                      alt={c.character.name}
                      rounded
                      className="character-img mb-1"
                    />
                    <p className="small mb-0">{c.character.name}</p>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </article>
  )
}

export default DetailsPage
