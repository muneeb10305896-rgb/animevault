// All communication with the Jikan API lives in this file.
// Jikan is a free REST API for MyAnimeList data. It returns JSON and needs no API key.
// Docs: https://docs.api.jikan.moe/

const BASE_URL = 'https://api.jikan.moe/v4'

// Shared helper: fetch a URL, check the status and return the parsed JSON.
// Throws an Error with a readable message so the screens can show it to the user.
async function getJson(path) {
  let response
  try {
    response = await fetch(BASE_URL + path)
  } catch {
    // fetch only throws when the network itself fails (offline, DNS, CORS)
    throw new Error('Could not reach the anime database. Check your internet connection.')
  }

  if (response.status === 429) {
    // Jikan allows about 3 requests per second
    throw new Error('Too many requests right now. Wait a second and try again.')
  }
  if (response.status === 404) {
    throw new Error('That anime was not found.')
  }
  if (!response.ok) {
    throw new Error(`The anime database answered with an error (${response.status}).`)
  }

  return response.json()
}

// Top rated anime, used on the home screen before the user searches
export async function getTopAnime() {
  const json = await getJson('/top/anime?limit=12&sfw=true')
  return json.data
}

// Search by title, optionally filtered by type (tv, movie, ova...)
export async function searchAnime(query, type = '') {
  const params = new URLSearchParams({ q: query, limit: '12', sfw: 'true', order_by: 'members', sort: 'desc' })
  if (type) params.set('type', type)
  const json = await getJson('/anime?' + params.toString())
  return json.data
}

// Full information about one anime (details screen)
export async function getAnimeById(id) {
  const json = await getJson(`/anime/${id}/full`)
  return json.data
}

// Characters of one anime (details screen)
export async function getAnimeCharacters(id) {
  const json = await getJson(`/anime/${id}/characters`)
  return json.data
}
