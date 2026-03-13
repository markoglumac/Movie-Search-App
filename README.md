# Movie Search App

A movie search app built with Vue 3 and TypeScript, powered by the TMDB API. Browse trending movies, search by title, view details, and save favorites.

**Live demo:** https://movie-search-app-iota-five.vercel.app/

---

## Features

- Real-time search with debouncing
- Trending movies on load
- Movie detail pages with genres, runtime, rating, and tagline
- Add/remove favorites with localStorage persistence
- Animated loading skeletons
- Pagination
- Fully responsive

---

## Tech Stack

- Vue 3 — Composition API, `<script setup>`, composables, Vue Router, Pinia
- TypeScript — strict mode, interfaces, generics, typed error classes
- SCSS — variables, nesting, mixins, responsive breakpoints
- Vite — build tool and dev server
- VueUse — `watchDebounced`
- TMDB API — movie data

---

## What I Learned

This was my first project with Vue and TypeScript. A few things that stood out:

**Composables** — pulling logic out of components into reusable functions (`useMovies`, `useMovieDetail`) made the codebase noticeably cleaner. Components ended up focused purely on the template, which made them easier to reason about.

**TypeScript with Vue** — typing API responses with interfaces caught several bugs early. The combination of `ref<Movie[]>` and strict mode meant the compiler flagged issues I would have otherwise found at runtime.

**Vue's reactivity system** — coming from vanilla JS, the shift to just updating data and letting the UI handle itself took some getting used to, but once it clicked it felt like the right way to build UIs.
