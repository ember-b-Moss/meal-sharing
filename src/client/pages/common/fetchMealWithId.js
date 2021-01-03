const fetchMealWithId = (id) => {
  fetch("/api/meals/" + id)
    .then((response) => response.json())
    .then((data) => renderMealData(data));

  // render specific meal from db
  const renderMealData = (data) => {
    const root = document.getElementById("root");
    const mealsSection = document.createElement("section");
    root.append(mealsSection);
    mealsSection.className = "meals";
    mealsSection.classList.add("meal-id");
    const divTile = document.createElement("div");
    mealsSection.append(divTile);
    divTile.className = "meal-tile";
    divTile.innerHTML = `
        <img src="/public/images/meal-${id}.jpg" alt="${data.title}" />
    `;
    const divDetails = document.createElement("div");
    divTile.append(divDetails);

    divDetails.innerHTML = `
        <header class="meal-title">${data.title}</header>
        <p>${data.description}</p>
        <div class="info">
        <div class="price"><span>Price: </span>${data.price} DKK</div>
        <div class="guest-number"><span>Maximum number of guests: </span><span id="max-guests-number">${
          data.max_guests
        }</span></div>
        <div class="when"><span>When: </span>${new Date(
          data.when_date
        ).toLocaleString()}</div>
        </div>
    `;
  };
};

export { fetchMealWithId };
