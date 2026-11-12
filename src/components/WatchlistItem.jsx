import { ListGroup, Form, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { STATUSES } from '../hooks/useWatchlist.js'

// One row in the watchlist. It does not change any state itself:
// it calls the onUpdate / onRemove callbacks it gets from the parent.
function WatchlistItem({ item, onUpdate, onRemove }) {
  return (
    <ListGroup.Item className="d-flex gap-3 align-items-center flex-wrap">
      <Image src={item.image} alt="" rounded className="watch-thumb" />

      <div className="flex-grow-1 watch-info">
        <Link to={`/anime/${item.id}`} className="fw-semibold">
          {item.title}
        </Link>
        <div className="small text-muted">
          {item.episodes ? `${item.episodes} episodes` : 'Episodes unknown'}
          {item.score ? ` · MAL ★ ${item.score}` : ''}
        </div>
      </div>

      <Form.Select
        size="sm"
        className="watch-select"
        aria-label={`Status of ${item.title}`}
        value={item.status}
        onChange={(e) => onUpdate(item.id, { status: e.target.value })}
      >
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </Form.Select>

      <Form.Select
        size="sm"
        className="watch-select"
        aria-label={`My rating for ${item.title}`}
        value={item.myRating}
        onChange={(e) => onUpdate(item.id, { myRating: Number(e.target.value) })}
      >
        <option value={0}>My rating</option>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {'★'.repeat(Math.ceil(n / 2))} {n}/10
          </option>
        ))}
      </Form.Select>

      <Button variant="outline-danger" size="sm" onClick={() => onRemove(item)} aria-label={`Remove ${item.title}`}>
        ✕
      </Button>
    </ListGroup.Item>
  )
}

export default WatchlistItem
