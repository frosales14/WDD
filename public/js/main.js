// Function to format the current date and time in footer
function formatDateTime(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  };
  return date.toLocaleString(undefined, options);
}

// Insert the formatted date and time into the element with id 'footerdate'
document.addEventListener("DOMContentLoaded", (event) => {
  const footerDateElement = document.getElementById("footerdate");
  const currentDate = new Date();
  footerDateElement.textContent = formatDateTime(currentDate);
});

//JS for search bar
document.addEventListener("DOMContentLoaded", function () {
  console.log("content load");
  const searchForm = document.querySelector("#search-form");
  console.log(searchForm);
  const searchInput = document.querySelector(
    '#search-form input[name="search"]'
  );

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });

  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    }
  });
});

// Define image sources for default and active states
const defaultImageSrc = "/images/site/default-favorite.png";
const activeImageSrc = "/images/site/active-favorite.png";

// Function to get the favorite IDs from local storage
function getFavoriteIds() {
  const favorites = localStorage.getItem("favoriteExercises");
  return favorites ? JSON.parse(favorites) : [];
}

// Function to save the favorite IDs to local storage
function saveFavoriteIds(favoriteIds) {
  localStorage.setItem("favoriteExercises", JSON.stringify(favoriteIds));
}

// Function to check if an exercise ID is in the favorite IDs
function isFavorite(exid) {
  const favoriteIds = getFavoriteIds();
  return favoriteIds.includes(exid);
}

// Function to toggle favorite state
function toggleFavorite(event) {
  const button = event.target;
  const exid = button.getAttribute("data-exid");
  let favoriteIds = getFavoriteIds();

  // Toggle favorite state
  if (favoriteIds.includes(exid)) {
    // Remove from favorites
    favoriteIds = favoriteIds.filter((id) => id !== exid);
    button.src = defaultImageSrc;
  } else {
    // Add to favorites
    favoriteIds.push(exid);
    button.src = activeImageSrc;
  }

  // Save updated favorite IDs to local storage
  saveFavoriteIds(favoriteIds);
}

// Add click event listener to all favorite buttons
document.querySelectorAll(".favorite-button").forEach((button) => {
  const exid = button.getAttribute("data-exid");
  // Set the initial state based on local storage
  button.src = isFavorite(exid) ? activeImageSrc : defaultImageSrc;

  // Add event listener
  button.addEventListener("click", toggleFavorite);
});

