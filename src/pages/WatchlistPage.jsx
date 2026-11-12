import { useState } from 'react'
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import WatchlistItem from '../components/WatchlistItem.jsx'
import StatusChart from '../components/StatusChart.jsx'
import { STATUSES } from '../hooks/useWatchlist.js'

// Screen 3: the user's own watchlist. No API calls here, the data
// comes from the watchlist state that was saved in localStorage.
function WatchlistPage({ watchlist }) {
  const [filter, setFilter] = useState('All')
  const { items, updateItem, removeItem } = watchlist

  const visibleItems = filter === 'All' ? items : items.filter((item) => item.status === filter)

  // Simple statistics shown next to the chart
  const rated = items.filter((item) => item.myRating > 0)
  const averageRating = rated.length
    ? (rated.reduce((sum, item) => sum + item.myRating, 0) / rated.length).toFixed(1)
    : '–'
  const completedEpisodes = items
    .filter((item) => item.status === 'Completed')
    .reduce((sum, item) => sum + (item.episodes || 0), 0)

  function handleRemove(item) {
    removeItem(item.id)
    toast.info(`${item.title} removed`)
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <h1 className="h2 fw-bold">My watchlist</h1>
        <p className="text-muted">Your watchlist is empty. Find something to watch first.</p>
        <Button as={Link} to="/" variant="primary">
          Discover anime
        </Button>
      </div>
    )
  }

  return (
    <>
      <h1 className="h2 fw-bold mb-4">My watchlist</h1>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="h5">
                Statistics
              </Card.Title>
              <StatusChart items={items} />
              <Row className="text-center mt-3">
                <Col>
                  <div className="fs-4 fw-bold">{items.length}</div>
                  <div className="small text-muted">saved</div>
                </Col>
                <Col>
                  <div className="fs-4 fw-bold">{averageRating}</div>
                  <div className="small text-muted">my avg rating</div>
                </Col>
                <Col>
                  <div className="fs-4 fw-bold">{completedEpisodes}</div>
                  <div className="small text-muted">episodes done</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <div className="d-flex flex-wrap gap-2 mb-3" role="group" aria-label="Filter by status">
            {['All', ...STATUSES].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={filter === s ? 'dark' : 'outline-dark'}
                onClick={() => setFilter(s)}
                aria-pressed={filter === s}
              >
                {s}
              </Button>
            ))}
          </div>

          {visibleItems.length === 0 ? (
            <p className="text-muted">Nothing with the status "{filter}" yet.</p>
          ) : (
            <ListGroup className="shadow-sm">
              {visibleItems.map((item) => (
                <WatchlistItem key={item.id} item={item} onUpdate={updateItem} onRemove={handleRemove} />
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </>
  )
}

export default WatchlistPage
