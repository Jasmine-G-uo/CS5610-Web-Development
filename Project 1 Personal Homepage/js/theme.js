// Light / dark theme switcher.
// Remembers the visitor's choice in localStorage and falls back to the
// operating system preference on the first visit. Uses Bootstrap 5.3's
// data-bs-theme attribute so Bootstrap components pick up the theme too.

const STORAGE_KEY = "jg-theme";

function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(theme, toggleButton) {
  const isDark = theme === "dark";
  document.documentElement.setAttribute(
    "data-bs-theme",
    isDark ? "dark" : "light",
  );

  if (toggleButton) {
    toggleButton.textContent = isDark ? "☀️" : "🌙";
    toggleButton.setAttribute("aria-pressed", String(isDark));
    toggleButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  }
}

export function initTheme() {
  const toggleButton = document.querySelector(".theme-toggle");
  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme, toggleButton);

  if (!toggleButton) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, currentTheme);
    applyTheme(currentTheme, toggleButton);
  });
}
