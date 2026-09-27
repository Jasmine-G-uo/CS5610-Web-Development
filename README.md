# CS5610 Web Development

Coursework for CS5610 Web Development at Northeastern University.

## Assignments

| Assignment | Live demo | Source |
| --- | --- | --- |
| Self-assessment 1 — HTML/CSS fundamentals | [View](https://jasmine-g-uo.github.io/CS5610-Web-Development/self-assessment1/) | [`self-assessment1/`](self-assessment1/) |
| Airbnb listings — load 50 listings with `fetch` | [View](https://jasmine-g-uo.github.io/CS5610-Web-Development/airbnb-listings/) | [`airbnb-listings/`](airbnb-listings/) |
| Project 1 — Personal homepage (from Finance to CS) | [View](https://jasmine-g-uo.github.io/CS5610-Web-Development/Project%201%20Personal%20Homepage/) | [`Project 1 Personal Homepage/`](Project%201%20Personal%20Homepage/) |

Each assignment folder has its own README with details.

## Running locally

The pages are static, but the Airbnb listings page fetches a local JSON file,
so it needs to be served over HTTP rather than opened as a `file://` URL:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
