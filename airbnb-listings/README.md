# San Francisco Airbnb Listings

A single-page site that loads Airbnb listing data from a local JSON file with the
`fetch` API and renders the first 50 listings as Bootstrap cards.

**Live demo:** https://jasmine-g-uo.github.io/CS5610-Web-Development/airbnb-listings/

Built for CS5610 Web Development, starting from the in-class demo
[john-guerra/Airbnb_Listings_demo_page](https://github.com/john-guerra/Airbnb_Listings_demo_page).

## What each card shows

Every one of the 50 cards renders the fields required by the assignment:

| Requirement | Source field |
| --- | --- |
| Listing name | `name` |
| Description | `description` (HTML stripped to plain text, truncated to 180 characters) |
| Amenities | `amenities` (a JSON array stored as a string, so it is parsed; first 6 shown as pills with a `+N more` count) |
| Host name and photo | `host_name`, `host_picture_url`, plus a Superhost badge from `host_is_superhost` |
| Price | `price` (parsed from `"$187.00"` into a number) |
| Thumbnail | `picture_url` |

Cards also show the neighbourhood, star rating and review count, room type, and
capacity, and link out to the listing on Airbnb.

## Creative additions

Three things that go beyond the in-class version:

1. **Save your favorites.** Tap the heart on any card to save a listing. Saved
   IDs are written to `localStorage`, so they survive a page reload. The
   **Saved** button in the navbar shows a live count and filters the grid down to
   just your picks, with an empty state when you have not saved anything yet.
2. **Dark / light theme toggle.** Uses Bootstrap 5.3's `data-bs-theme` attribute
   so the whole page — including the cards — re-themes with one click. The choice
   is also persisted in `localStorage`.
3. **"At a glance" summary panel.** Computed from the loaded data at runtime:
   listing count, median nightly price, average rating, and how many of the 50
   hosts are Superhosts.

Smaller touches: an accessible loading spinner and a real error message if the
fetch fails, lazy-loaded images, and local SVG placeholders that swap in
automatically for the handful of 2023 photo URLs that are no longer online.

## Running it locally

The page fetches a local JSON file, so it needs to be served over HTTP rather
than opened as a `file://` URL:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Project structure

```
airbnb-listings/
├── index.html                    # page markup, navbar, summary panel, card grid
├── css/main.css                  # card, host photo, and favorite-button styles
├── js/main.js                    # MainModule: fetch, render, favorites, theme
├── img/                          # SVG placeholders for dead photo URLs
└── airbnb_sf_listings_500.json   # data (523 listings; the page uses the first 50)
```

`js/main.js` keeps the module pattern from class: `MainModule()` returns an
object exposing `loadData()` and `redraw()`, with everything else closed over.

## Data

[Inside Airbnb](http://insideairbnb.com/get-the-data/) — San Francisco,
scraped September 2023. The file holds 523 listings; the page renders
`listings.slice(0, 50)`.
