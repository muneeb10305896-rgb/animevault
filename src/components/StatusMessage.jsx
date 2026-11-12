import { Spinner, Alert, Button } from 'react-bootstrap'

// Reusable feedback for API calls: a spinner while loading,
// or an error box with an optional "Try again" button.
export function Loading({ text = 'Loading...' }) {
  return (
    <div className="text-center py-5" role="status" aria-live="polite">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2 text-muted">{text}</p>
    </div>
  )
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <Alert variant="danger" className="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <span>⚠️ {message}</span>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Alert>
  )
}
