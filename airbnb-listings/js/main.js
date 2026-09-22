function MainModule(listingsID = "#listings") {
  const me = {};

  const LISTING_LIMIT = 50;
  const AMENITY_LIMIT = 6;
  const FAVORITES_KEY = "airbnb-favorites";
  const THEME_KEY = "airbnb-theme";

  const listingsElement = document.querySelector(listingsID);
  const statusElement = document.querySelector("#status");
  const resultCountElement = document.querySelector("#resultCount");
  const favoritesFilterElement = document.querySelector("#favoritesFilter");
  const favoritesCountElement = document.querySelector("#favoritesCount");
  const themeToggleElement = document.querySelector("#themeToggle");
  const themeToggleLabelElement = document.querySelector("#themeToggleLabel");

  let allListings = [];
  let favorites = readFavorites();
  let showOnlyFavorites = false;

  function readFavorites() {
    try {
      const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY));
      return new Set(Array.isArray(stored) ? stored : []);
    } catch {
      return new Set();
    }
  }

  function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  // Descriptions in the dataset are HTML fragments full of <br /> and <b> tags.
  function toPlainText(html) {
    const element = document.createElement("div");
    element.innerHTML = String(html ?? "");
    return element.textContent.replace(/\s+/g, " ").trim();
  }

  function truncate(text, maxLength) {
    return text.length > maxLength
      ? `${text.slice(0, maxLength).trimEnd()}…`
      : text;
  }

  // The amenities column is a JSON array stored as a string.
  function parseAmenities(listing) {
    try {
      const amenities = JSON.parse(listing.amenities);
      return Array.isArray(amenities) ? amenities : [];
    } catch {
      return [];
    }
  }

  function parsePrice(listing) {
    const price = Number(String(listing.price ?? "").replace(/[$,]/g, ""));
    return Number.isFinite(price) ? price : null;
  }

  function getListingCode(listing) {
    const amenities = parseAmenities(listing);
    const extraAmenities = amenities.length - AMENITY_LIMIT;
    const price = parsePrice(listing);
    const isFavorite = favorites.has(listing.id);

    const amenityBadges = amenities
      .slice(0, AMENITY_LIMIT)
      .map(
        (amenity) =>
          `<li class="badge rounded-pill text-body-secondary bg-body-tertiary border">${escapeHTML(
            amenity,
          )}</li>`,
      )
      .join("");

    const extraAmenityBadge =
      extraAmenities > 0
        ? `<li class="badge rounded-pill bg-secondary-subtle text-body-secondary border">+${extraAmenities} more</li>`
        : "";

    const superhostBadge =
      listing.host_is_superhost === "t"
        ? '<span class="badge bg-danger-subtle text-danger-emphasis">Superhost</span>'
        : "";

    const ratingBadge = listing.review_scores_rating
      ? `<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle">&#9733; ${listing.review_scores_rating.toFixed(
          2,
        )} (${listing.number_of_reviews})</span>`
      : "";

    return `<div class="col">
  <article class="listing card h-100 shadow-sm">
    <div class="listing-image">
      <img
        src="${escapeHTML(listing.picture_url)}"
        class="card-img-top"
        alt="Photo of ${escapeHTML(listing.name)}"
        loading="lazy"
      />
      <button
        class="btn favorite-btn ${isFavorite ? "is-favorite" : ""}"
        type="button"
        data-listing-id="${listing.id}"
        aria-pressed="${isFavorite}"
        aria-label="${isFavorite ? "Remove from saved listings" : "Save this listing"}"
      >${isFavorite ? "♥" : "♡"}</button>
    </div>

    <div class="card-body d-flex flex-column">
      <div class="d-flex flex-wrap gap-2 mb-2">
        <span class="badge bg-body-tertiary text-body-secondary border">${escapeHTML(
          listing.neighbourhood_cleansed,
        )}</span>
        ${ratingBadge}
      </div>

      <h3 class="card-title h6">${escapeHTML(listing.name)}</h3>

      <p class="card-text small text-body-secondary">
        ${escapeHTML(truncate(toPlainText(listing.description), 180))}
      </p>

      <p class="small text-body-secondary mb-2">
        ${escapeHTML(listing.room_type)} &middot; ${listing.accommodates} guests
        &middot; ${listing.beds ?? "?"} beds &middot; ${escapeHTML(
          listing.bathrooms_text,
        )}
      </p>

      <h4 class="small text-uppercase text-body-secondary mt-2 mb-2">Amenities</h4>
      <ul class="amenities list-unstyled d-flex flex-wrap gap-1 mb-3">
        ${amenityBadges}${extraAmenityBadge}
      </ul>

      <div class="host d-flex align-items-center gap-2 mt-auto pt-3 border-top">
        <img
          src="${escapeHTML(listing.host_thumbnail_url)}"
          class="host-photo rounded-circle"
          alt="Host ${escapeHTML(listing.host_name)}"
          loading="lazy"
        />
        <div class="small">
          <div class="fw-semibold">${escapeHTML(listing.host_name)}</div>
          <div class="text-body-secondary">Host since ${escapeHTML(
            new Date(listing.host_since).getFullYear(),
          )}</div>
        </div>
        ${superhostBadge}
      </div>

      <div class="d-flex align-items-center justify-content-between mt-3">
        <p class="price h5 mb-0">
          ${price === null ? "Price on request" : `$${price}`}
          <span class="fw-normal small text-body-secondary">/ night</span>
        </p>
        <a
          href="${escapeHTML(listing.listing_url)}"
          class="btn btn-sm btn-primary"
          target="_blank"
          rel="noopener"
          >View on Airbnb</a
        >
      </div>
    </div>
  </article>
  </div>
  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");

    favoritesCountElement.textContent = favorites.size;
    favoritesFilterElement.setAttribute("aria-pressed", showOnlyFavorites);
    favoritesFilterElement.classList.toggle("active", showOnlyFavorites);

    if (showOnlyFavorites) {
      resultCountElement.textContent = `Showing ${listings.length} saved listing${
        listings.length === 1 ? "" : "s"
      }`;
    } else {
      resultCountElement.textContent = `Showing ${listings.length} listings`;
    }

    if (listings.length === 0) {
      listingsElement.innerHTML = `<div class="col-12">
        <p class="text-body-secondary text-center py-5 mb-0">
          No saved listings yet. Tap a heart to save one.
        </p>
      </div>`;
    }
  }

  function getVisibleListings() {
    return showOnlyFavorites
      ? allListings.filter((listing) => favorites.has(listing.id))
      : allListings;
  }

  function drawStats(listings) {
    const prices = listings
      .map(parsePrice)
      .filter((price) => price !== null)
      .sort((a, b) => a - b);
    const ratings = listings
      .map((listing) => listing.review_scores_rating)
      .filter((rating) => typeof rating === "number");
    const superhosts = listings.filter(
      (listing) => listing.host_is_superhost === "t",
    );

    document.querySelector("#statCount").textContent = listings.length;
    document.querySelector("#statMedianPrice").textContent = prices.length
      ? `$${prices[Math.floor(prices.length / 2)]}`
      : "—";
    document.querySelector("#statRating").textContent = ratings.length
      ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(2)
      : "—";
    document.querySelector("#statSuperhosts").textContent = superhosts.length;
  }

  function toggleFavorite(listingID) {
    if (favorites.has(listingID)) {
      favorites.delete(listingID);
    } else {
      favorites.add(listingID);
    }
    saveFavorites();
    me.redraw(getVisibleListings());
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    themeToggleLabelElement.textContent =
      theme === "dark" ? "Light mode" : "Dark mode";
    localStorage.setItem(THEME_KEY, theme);
  }

  // Some 2023 photo URLs are dead, so swap in a local placeholder.
  // `error` does not bubble, hence the capture phase.
  function setupImageFallbacks() {
    listingsElement.addEventListener(
      "error",
      (event) => {
        const image = event.target;
        if (image.tagName !== "IMG" || image.dataset.fallbackApplied) {
          return;
        }
        image.dataset.fallbackApplied = "true";
        image.classList.add("image-missing");
        image.src = image.classList.contains("host-photo")
          ? "img/host-placeholder.svg"
          : "img/listing-placeholder.svg";
      },
      true,
    );
  }

  function setupEvents() {
    setupImageFallbacks();

    listingsElement.addEventListener("click", (event) => {
      const button = event.target.closest(".favorite-btn");
      if (button) {
        toggleFavorite(Number(button.dataset.listingId));
      }
    });

    favoritesFilterElement.addEventListener("click", () => {
      showOnlyFavorites = !showOnlyFavorites;
      me.redraw(getVisibleListings());
    });

    themeToggleElement.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-bs-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  async function loadData() {
    try {
      const res = await fetch("./airbnb_sf_listings_500.json");
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const listings = await res.json();

      allListings = listings.slice(0, LISTING_LIMIT);
      statusElement.hidden = true;
      drawStats(allListings);
      me.redraw(getVisibleListings());
    } catch (error) {
      statusElement.innerHTML = `<div class="alert alert-danger mb-0" role="alert">
        <strong>Could not load the listings.</strong>
        <span class="d-block small">${escapeHTML(error.message)}</span>
      </div>`;
    }
  }

  applyTheme(localStorage.getItem(THEME_KEY) ?? "light");
  setupEvents();

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();

main.loadData();
