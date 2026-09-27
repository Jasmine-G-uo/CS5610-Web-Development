// Typewriter effect: types a phrase letter by letter, pauses, deletes it,
// then moves on to the next phrase in an endless loop.

const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const PAUSE_AFTER_TYPING = 1600;
const PAUSE_AFTER_DELETING = 400;

export function initTypewriter() {
  const target = document.querySelector(".typewriter__text");
  if (!target) {
    return;
  }

  const phrases = JSON.parse(target.dataset.phrases || "[]");
  if (phrases.length === 0) {
    return;
  }

  // Respect visitors who prefer less motion: show the first phrase only.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];
    charIndex += isDeleting ? -1 : 1;
    target.textContent = phrase.slice(0, charIndex);

    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

    if (!isDeleting && charIndex === phrase.length) {
      isDeleting = true;
      delay = PAUSE_AFTER_TYPING;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = PAUSE_AFTER_DELETING;
    }

    setTimeout(tick, delay);
  }

  target.textContent = "";
  tick();
}
