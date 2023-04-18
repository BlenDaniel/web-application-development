// Get DOM elements
const cardsContainer = document.querySelector(".cards-container");
const filterSelect = document.querySelector("#filter");
const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
// Selected filters section and list
const selectedFiltersSection = document.querySelector(
  ".selected-filters-section"
);
const selectedFiltersList = document.getElementById("selected-filters");

let data = []; // Data array to hold the JSON data
let selectedFilters = []; // Data array to hold the JSON data

// Fetch data from JSON file
fetch("./src/assets/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Get the columns by their IDs
    const column1 = document.getElementById("card-column1");
    const column2 = document.getElementById("card-column2");

    // Loop through each item in the data array
    for (let i = 0; i < data.data.length; i++) {
      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("card");
    
      // Create an image element with the card image
      const image = document.createElement("img");
      image.src = data.data[i].image_url;
      card.appendChild(image);
    
      // Create a header element with the card name
      const header = document.createElement("h2");
      header.textContent = data.data[i].name;
      card.appendChild(header);
    
      // Create a paragraph element with the card description
      const description = document.createElement("p");
      description.textContent = data.data[i].description;
      card.appendChild(description);
    
      // Create a paragraph element with the card date
      const date = document.createElement("p");
      date.textContent = "Date: " + data.data[i].date;
      card.appendChild(date);
    
      // Create a paragraph element with the card link
      const link = document.createElement("p");
      link.innerHTML = "Link: <a href='" + data.data[i].link + "'>" + data.data[i].link + "</a>";
      card.appendChild(link);
    
    
      // Create a paragraph element with the card tag
      const tag = document.createElement("p");
      tag.textContent = "Tag: " + data.data[i].tag;
      card.appendChild(tag);
    
      // Add the card to the appropriate column
      if (i % 2 === 0) {
        column1.appendChild(card);
      } else {
        column2.appendChild(card);
      }
    }
    
  })
  .catch((error) => console.error(error));

// Filter data based on search input and filter select
function filterData(data) {
  const filterValue = filterSelect.value; // Get selected filter value
  const searchValue = searchInput.value.toLowerCase(); // Get search input value
  const filteredData = data.filter((item) => {
    return item[filterValue].toLowerCase().includes(searchValue); // Filter data based on selected filter and search input
  });
  return filteredData;
}

function displayFilters() {
  const filters = [
    { value: "all", text: "All" },
    { value: "food", text: "Food" },
    { value: "drink", text: "Drink" },
    { value: "music", text: "Music" },
    { value: "art", text: "Art" },
  ];

  let filtersContent = "";
  filters.forEach((filter) => {
    filtersContent += `
      <option value="${filter.value}">${filter.text}</option>
    `;
  });

  filterSelect.innerHTML = filtersContent;
}

function createSelectedFilterItem(value) {
  const li = document.createElement("li");
  li.classList.add("selected-filter");
  li.textContent = `${filterMap[value]}: ${searchTerm}`;
  const removeButton = document.createElement("span");
  removeButton.classList.add("remove-filter");
  removeButton.textContent = "X";
  li.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeSelectedFilter(value);
  });
  return li;
}

// Add filter event listener
filterSelect.addEventListener("change", function (event) {
  const selectedFilter = event.target.value;

  // Check if filter is already selected
  if (!selectedFilters.includes(selectedFilter)) {
    // Add filter to selected filters array
    selectedFilters.push(selectedFilter);

    // Add filter to selected filters list
    const filterListItem = document.createElement("li");
    filterListItem.classList.add("selected-filter-item");
    const filterText = document.createElement("span");
    filterText.textContent = selectedFilter;
    filterListItem.appendChild(filterText);
    const removeButton = document.createElement("span");
    removeButton.classList.add("remove-filter");
    removeButton.textContent = "x";
    filterListItem.appendChild(removeButton);
    selectedFiltersList.appendChild(filterListItem);
  }
});

// Handle search button click
searchBtn.addEventListener("click", () => {
  displayCards(data); // Display cards with default data
});

// Handle filter select change
filterSelect.addEventListener("change", () => {
  displayCards(data); // Display cards with default data
  displaySelectedFilters(); // Display selected filters
});

// Handle search input change
searchInput.addEventListener("input", () => {
  displayCards(data); // Display cards with default data
});

// Remove filter event listener
selectedFiltersList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-filter")) {
    const selectedFilter = event.target.parentNode.textContent
      .trim()
      .slice(0, -1);

    // Remove filter from selected filters array
    selectedFilters = selectedFilters.filter(
      (filter) => filter !== selectedFilter
    );

    // Remove filter from selected filters list
    event.target.parentNode.remove();
  }
});

// Handle enter key press on search input
searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    displayCards(data); // Display cards with default data
  }
});

// Display filter options
displayFilters();
