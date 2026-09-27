// Entry point shared by every page. Each feature checks whether its
// elements exist, so pages only get the behaviour they need.

import { initTheme } from "./theme.js";
import { initTypewriter } from "./typewriter.js";
import { initReveal } from "./reveal.js";
import { initFlipCards } from "./flipCards.js";

initTheme();
initTypewriter();
initReveal();
initFlipCards();
