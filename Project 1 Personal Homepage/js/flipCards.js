// Game flip cards: each card is a <button>. Clicking it (or pressing
// Enter / Space) flips it between the cover image and the description.

const FLIPPED_CLASS = "game-card--flipped";

export function initFlipCards() {
  const cards = document.querySelectorAll(".game-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const isFlipped = card.classList.toggle(FLIPPED_CLASS);
      card.setAttribute("aria-pressed", String(isFlipped));
    });
  });
}
