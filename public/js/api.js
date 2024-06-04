fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad,us&units=metric&appid=e1ffd8f4f1e0f0124da9f6c2bfa13c74"
)
  .then((response) => response.json())
  .then((data) => {
    const forecastList = data.list;
    const currentDate = new Date();

    // Update current day forecast
    const currentDayForecast = forecastList.find((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      return forecastDate.toDateString() === currentDate.toDateString();
    });

    if (currentDayForecast) {
      const temperature = Math.round(currentDayForecast.main.temp);
      const conditions = capitalizeFirstLetter(
        currentDayForecast.weather[0].description
      );

      const iconCode = currentDayForecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

      document.getElementById("current-day-weather-image").src = iconUrl;
      document.getElementById(
        "current-day-forecast-date"
      ).textContent = `Today - ${currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })}`;
      document.getElementById(
        "current-day-forecast-temperature"
      ).textContent = `${temperature}°C`;
      document.getElementById("current-day-forecast-conditions").textContent =
        conditions;
    }

    // Update day 1 forecast
    const nextDay1 = new Date(currentDate);
    nextDay1.setDate(currentDate.getDate() + 1);
    const day1Forecast = forecastList.find((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      return forecastDate.toDateString() === nextDay1.toDateString();
    });

    if (day1Forecast) {
      const temperature = Math.round(day1Forecast.main.temp);
      const conditions = capitalizeFirstLetter(
        day1Forecast.weather[0].description
      );

      const iconCode = day1Forecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

      document.getElementById("day-1-weather-image").src = iconUrl;
      document.getElementById(
        "day-1-forecast-date"
      ).textContent = `${nextDay1.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}`;
      document.getElementById(
        "day-1-forecast-temperature"
      ).textContent = `${temperature}°C`;
      document.getElementById("day-1-forecast-conditions").textContent =
        conditions;
    }

    // Update day 2 forecast
    const nextDay2 = new Date(currentDate);
    nextDay2.setDate(currentDate.getDate() + 2);
    const day2Forecast = forecastList.find((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      return forecastDate.toDateString() === nextDay2.toDateString();
    });

    if (day2Forecast) {
      const temperature = Math.round(day2Forecast.main.temp);
      const conditions = capitalizeFirstLetter(
        day2Forecast.weather[0].description
      );

      const iconCode = day2Forecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

      document.getElementById("day-2-weather-image").src = iconUrl;
      document.getElementById(
        "day-2-forecast-date"
      ).textContent = `${nextDay2.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}`;
      document.getElementById(
        "day-2-forecast-temperature"
      ).textContent = `${temperature}°C`;
      document.getElementById("day-2-forecast-conditions").textContent =
        conditions;
    }

    // Update day 3 forecast
    const nextDay3 = new Date(currentDate);
    nextDay3.setDate(currentDate.getDate() + 3);
    const day3Forecast = forecastList.find((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000);
      return forecastDate.toDateString() === nextDay3.toDateString();
    });

    if (day3Forecast) {
      const temperature = Math.round(day3Forecast.main.temp);
      const conditions = capitalizeFirstLetter(
        day3Forecast.weather[0].description
      );

      const iconCode = day3Forecast.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

      document.getElementById("day-3-weather-image").src = iconUrl;
      document.getElementById(
        "day-3-forecast-date"
      ).textContent = `${nextDay3.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}`;
      document.getElementById(
        "day-3-forecast-temperature"
      ).textContent = `${temperature}°C`;
      document.getElementById("day-3-forecast-conditions").textContent =
        conditions;
    }
  })
  .catch((error) => {
    console.error("Error fetching forecast data:", error);
  });

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

fetch("json/tips.json")
  .then((response) => response.json())
  .then((data) => {
    const tipCardTitle = document.querySelector("#tip-card--title");
    const tipCardImg = document.querySelector("#tip-card-img");
    const tipCardDesc = document.querySelector("#tip-card-description");
    const randomTip = data[Math.floor(Math.random() * data.length)];

    tipCardTitle.innerText = randomTip.title;
    tipCardImg.src = randomTip.image;
    tipCardDesc.innerText = randomTip.description;
  })
  .catch((error) => console.error("Error fetching tips:", error));

document.addEventListener("DOMContentLoaded", () => {
  fetch("json/recipes.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const recipes = data.recipe;
      console.log("Fetched recipes:", recipes);

      if (!Array.isArray(recipes) || recipes.length === 0) {
        throw new Error("No recipes found or invalid format");
      }

      // Extract a random recipe from the array
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const recipe = recipes[randomIndex];
      console.log("Selected recipe:", recipe);

      // Create the recipe card container
      const recipeCard = document.querySelector("#recipe-card");
      recipeCard.innerHTML = ""; // Clear any existing content

      // Create the recipe title element
      const titleElement = document.createElement("h2");
      titleElement.innerHTML = recipe.name;
      recipeCard.appendChild(titleElement);

      // Create the recipe image element if it exists
      if (recipe.image) {
        const imageElement = document.createElement("img");
        imageElement.src = recipe.image;
        imageElement.alt = "Recipe image";
        recipeCard.appendChild(imageElement);
      }

      // Create the recipe description element
      const descriptionElement = document.createElement("p");
      descriptionElement.innerHTML = recipe.description;
      recipeCard.appendChild(descriptionElement);

      // Create the recipe instructions container
      const recipeInstructions = document.createElement("div");
      recipeInstructions.id = "recipe-instructions";

      // Create the ingredients list element
      const ingredientsListElement = document.createElement("ul");

      // Handle the ingredients
      recipe.ingredient.forEach((ingredient) => {
        const ingredientListItem = document.createElement("li");
        ingredientListItem.innerHTML = `${
          ingredient.amount ? ingredient.amount + " " : ""
        }${ingredient.unit ? ingredient.unit + " " : ""}${ingredient.name}${
          ingredient.preparation ? ", " + ingredient.preparation : ""
        }`;
        ingredientsListElement.appendChild(ingredientListItem);
      });

      // Handle ingredient groups
      recipe.ingredientGroup.forEach((group) => {
        const groupTitle = document.createElement("li");
        groupTitle.innerHTML = `<strong>${group.name}</strong>`;
        ingredientsListElement.appendChild(groupTitle);

        group.ingredient.forEach((ingredient) => {
          const ingredientListItem = document.createElement("li");
          ingredientListItem.innerHTML = `${
            ingredient.amount ? ingredient.amount + " " : ""
          }${ingredient.unit ? ingredient.unit + " " : ""}${ingredient.name}${
            ingredient.preparation ? ", " + ingredient.preparation : ""
          }`;
          ingredientsListElement.appendChild(ingredientListItem);
        });
      });

      recipeInstructions.appendChild(ingredientsListElement);

      // Create the instructions list element
      const instructionsListElement = document.createElement("div");
      instructionsListElement.className = "instructions";
      recipe.step.forEach((step, index) => {
        const instructionListItem = document.createElement("p");
        instructionListItem.innerHTML = `${index + 1}. ${step.description}`;
        instructionsListElement.appendChild(instructionListItem);
      });
      recipeInstructions.appendChild(instructionsListElement);

      recipeCard.appendChild(recipeInstructions);
    })
    .catch((error) => {
      console.error("Error loading recipes.json:", error);
    });
});

