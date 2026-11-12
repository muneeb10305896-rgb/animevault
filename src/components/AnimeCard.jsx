import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// One anime in a grid. The whole card links to the details screen.
function AnimeCard({ anime, isSaved }) {
  const image = anime.images?.webp?.image_url || anime.images?.jpg?.image_url
  const title = anime.title_english || anime.title

  return (
    <Card as={Link} to={`/anime/${anime.mal_id}`} className="anime-card h-100 text-decoration-none shadow-sm">
      <div className="anime-card__img-wrap">
        <Card.Img variant="top" src={image} alt={`Poster of ${title}`} loading="lazy" />
        {anime.score && (
          <Badge bg="dark" className="anime-card__score">
            ★ {anime.score}
          </Badge>
        )}
        {isSaved && (
          <Badge bg="success" className="anime-card__saved">
            In watchlist
          </Badge>
        )}
      </div>
      <Card.Body className="p-2">
        <Card.Title as="h3" className="fs-6 mb-1 text-body anime-card__title">
          {title}
        </Card.Title>
        <Card.Text className="small text-muted mb-0">
          {anime.type || 'Unknown'} · {anime.episodes ? `${anime.episodes} eps` : 'ongoing'}
          {anime.year ? ` · ${anime.year}` : ''}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default AnimeCard
