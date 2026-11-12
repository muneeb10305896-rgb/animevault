# AnimeVault

AnimeVault is a React web application for discovering anime and keeping a personal watchlist.
You can search the MyAnimeList database, open any title to see its details and main characters,
and save it to your own watchlist with a status (Plan to watch, Watching, Completed, Dropped) and a personal rating.

Final project for the Web Programming I course at the University of Eastern Finland, autumn 2026.
Author: Muneeb Ahmed Butt

- Live app: https://muneeb10305896-rgb.github.io/animevault/
- Repository: https://github.com/muneeb10305896-rgb/animevault

## Screens

| Route | Screen | What it does |
| --- | --- | --- |
| `#/` | Discover | Shows top rated anime, or search results for a title with an optional type filter |
| `#/anime/:id` | Details | Poster, score, genres, episodes, studio, synopsis, trailer link, main characters, add or remove from watchlist |
| `#/watchlist` | My Watchlist | Saved anime with status and rating controls, status filter, Chart.js doughnut chart and statistics |

## External API

[Jikan API v4](https://docs.api.jikan.moe/), a free REST API for MyAnimeList data that returns JSON and needs no API key.
Endpoints used: `/top/anime`, `/anime?q=`, `/anime/{id}/full` and `/anime/{id}/characters`.

## Third-party libraries

| Library | Used for |
| --- | --- |
| React Bootstrap + Bootstrap | Layout grid, navbar, cards, forms, badges, spinner and alerts (style) |
| React Router | Navigation between the three screens with `HashRouter` (functionality) |
| React Toastify | Notifications when anime are added or removed (functionality) |
| Chart.js + react-chartjs-2 | Doughnut chart of watchlist statuses (functionality) |

## How to run the project

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
# 1. Install the dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open the address Vite prints in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build     # production build into the dist folder
npm run preview   # preview the production build locally
npm run deploy    # build and publish the dist folder to GitHub Pages (gh-pages branch)
```

## Project structure

```
src/
  api/jikan.js            all fetch calls to the Jikan API and error messages
  hooks/useWatchlist.js   watchlist state, saved to localStorage
  components/             NavBar, AnimeCard, SearchBar, StatusMessage, WatchlistItem, StatusChart
  pages/                  DiscoverPage, DetailsPage, WatchlistPage, NotFoundPage
  App.jsx                 routes and shared state
  main.jsx                entry point
```

## Notes

- The watchlist is stored in the browser's localStorage, so it stays after a page refresh but is not shared between devices.
- Jikan limits requests to about 3 per second. If the limit is hit, the app shows a message and a "Try again" button.
