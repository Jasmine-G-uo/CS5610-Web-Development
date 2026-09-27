# Jiaying Guo: Homepage

My personal homepage, telling the story of my journey **from Finance to Computer Science**. Built with vanilla HTML5, CSS3 and ES6 modules.

![Screenshot of the homepage](docs/screenshot-index.png)

## Links

- **Live site:** https://jasmine-g-uo.github.io/CS5610-Web-Development/Project%201%20Personal%20Homepage/
- **Design document:** [docs/design.md](docs/design.md)
- **Demo video:** https://youtu.be/0tqEjJEhdMM

## Author

**Jiaying Guo**, MS in Computer Science student at Northeastern University

## Class Link

[CS5610 Web Development, Northeastern University](https://northeastern.instructure.com/courses/261032)

## Project Objective

Build a personal homepage using only front-end web standards: vanilla HTML5, CSS3 and ES6+ JavaScript modules, with no backend and no jQuery. The site should present meaningful information about me and include an original, creative component that makes it different from other homepages.

My homepage is a personal brand site with three pages:

| Page    | File           | Content                                                                      |
| ------- | -------------- | ---------------------------------------------------------------------------- |
| Home    | `index.html`   | Study and career: Education (UIBE, Northeastern), Adobe internship, Projects |
| Hobbies | `hobbies.html` | Favorite games as click-to-flip cards, plus a scrolling row of other hobbies |
| Kitchen | `kitchen.html` | Sichuan recipes I love (**this page was generated with AI**)                 |

### Original features

- **Typewriter effect** in the hero ([js/typewriter.js](js/typewriter.js))
- **Light / dark theme toggle** that remembers your choice ([js/theme.js](js/theme.js))
- **Click-to-flip game cards** built as real buttons, so they work with mouse, keyboard and touch ([js/flipCards.js](js/flipCards.js))
- **Scroll reveal** animations that respect `prefers-reduced-motion` ([js/reveal.js](js/reveal.js))

## Tech Stack

- HTML5 (semantic tags, W3C valid)
- CSS3 (custom properties for theming, Flexbox, no `!important`)
- Bootstrap 5.3 (grid, navbar and utilities, loaded from the jsDelivr CDN and listed in `package.json`)
- JavaScript ES6 modules (`type="module"`)
- ESLint (class configuration) and Prettier
- Hosted on GitHub Pages

## Project Structure

```
homepage/
├── index.html          # Home page
├── hobbies.html        # Hobbies page
├── kitchen.html        # AI generated page
├── css/style.css       # All styles
├── js/                 # ES6 modules
│   ├── main.js
│   ├── theme.js
│   ├── typewriter.js
│   ├── flipCards.js
│   └── reveal.js
├── images/             # Avatar, school logos, project screenshots, game covers, favicon
├── docs/               # Design document, mockups, screenshots
├── .eslintrc.cjs       # Class ESLint configuration
├── package.json
└── LICENSE             # MIT
```

## Instructions to Build

The site is static, so no build step is needed. To run it locally:

1. Install [Node.js](https://nodejs.org/) (v18 or newer).
2. Clone the repository and enter this project folder, then install the dev tools:
   ```bash
   git clone https://github.com/Jasmine-G-uo/CS5610-Web-Development.git
   cd "CS5610-Web-Development/Project 1 Personal Homepage"
   npm install
   ```
3. Start a local server and open the URL it prints (ES6 modules need a server; opening the file directly will not work):
   ```bash
   npm start
   ```
4. Check code quality:
   ```bash
   npm run lint          # ESLint with the class configuration
   npm run format:check  # Prettier
   ```

## Use of GenAI

I used generative AI as a planning and brainstorming partner while working on this project.

- **Tool:** Claude (Anthropic)
- **When:** September 2026

### Home and Hobbies pages

For `index.html` and `hobbies.html` I mostly used the AI to think through what a good personal homepage should include. We discussed how to tell the story of switching from Finance to Computer Science, how to arrange the Adobe internship section and the course projects, and which hobbies were worth featuring. The site's content, structure, palette, and interactive features are my own decisions.

### Kitchen page (fully AI generated)

The rubric asks for a third page generated with AI. `kitchen.html` is that page. The prompt I used:

> Generate a third page called "Jiaying's Kitchen" that shows four spicy dishes I love to cook, mostly from Sichuan and Chongqing (mapo tofu, Chongqing chicken, hot and sour noodles, dan dan noodles). For each dish give a short intro, an ingredients list, and a steps list. Add a small emoji icon next to each dish name and a spice level tag on the right. Reuse the same header, footer, milk-tea palette, and Bootstrap layout as the rest of the site.

I then opened the page in the browser and made a few small edits.

## License

This project is licensed under the [MIT License](LICENSE).
