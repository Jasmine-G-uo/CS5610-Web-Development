// Scroll reveal: elements with the "reveal" class fade in the first time
// they scroll into view.

export function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  document.documentElement.classList.add("js-enabled");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("reveal--visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach((element) => observer.observe(element));
}
