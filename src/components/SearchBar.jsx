import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

// Controlled search form. It keeps its own input state and only tells
// the parent (DiscoverPage) about the search when the form is submitted.
function SearchBar({ onSearch, onClear, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [type, setType] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(query.trim(), type)
  }

  function handleClear() {
    setQuery('')
    setType('')
    onClear()
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-4" role="search">
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Search anime, e.g. Attack on Titan"
          aria-label="Anime title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Form.Select
          aria-label="Filter by type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="search-type"
        >
          <option value="">All types</option>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
        </Form.Select>
        <Button type="submit" variant="primary" disabled={query.trim().length === 0}>
          Search
        </Button>
        <Button variant="outline-secondary" onClick={handleClear}>
          Clear
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBar
