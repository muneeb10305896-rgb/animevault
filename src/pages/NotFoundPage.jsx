import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">This page does not exist.</p>
      <Button as={Link} to="/" variant="primary">
        Back to Discover
      </Button>
    </div>
  )
}

export default NotFoundPage
