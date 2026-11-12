import { useEffect, useState } from 'react'

const STORAGE_KEY = 'animevault-watchlist'

export const STATUSES = ['Plan to watch', 'Watching', 'Completed', 'Dropped']

// Read the saved list once when the app starts. If localStorage is
// blocked or the data is broken, start with an empty list.
function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Custom hook that owns the watchlist state. App.jsx calls it once and
// passes the values down as props (lifting state up), so every screen
// sees the same list.
export function useWatchlist() {
  const [items, setItems] = useState(loadFromStorage)

  // Save to localStorage every time the list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage full or disabled: the app still works, it just will not remember
    }
  }, [items])

  function isSaved(id) {
    return items.some((item) => item.id === id)
  }

  function getItem(id) {
    return items.find((item) => item.id === id)
  }

  // Only keep the fields the watchlist needs, not the whole API object
  function addItem(anime, status = 'Plan to watch') {
    if (isSaved(anime.mal_id)) return
    const newItem = {
      id: anime.mal_id,
      title: anime.title_english || anime.title,
      image: anime.images?.webp?.image_url || anime.images?.jpg?.image_url,
      episodes: anime.episodes,
      score: anime.score,
      genres: (anime.genres || []).map((g) => g.name),
      status,
      myRating: 0,
      addedAt: new Date().toISOString(),
    }
    setItems((prev) => [newItem, ...prev])
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Update any fields of one item, e.g. updateItem(5114, { status: 'Completed' })
  function updateItem(id, changes) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...changes } : item)))
  }

  return { items, isSaved, getItem, addItem, removeItem, updateItem }
}
