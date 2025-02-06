import "./styles.css";
import { getFilteredResults, debounce } from "./utils";

const searchBox = document.getElementById("search-input");
const suggestionBox = document.getElementById("suggestions-wrapper");

const resetState = () => {
  setTimeout(() => {
    suggestionBox.classList.remove("suggestion-visible");
  }, 500);
};

const renderDropdownItems = (list) => {
  const suggFragment = document.createDocumentFragment();
  list.forEach((item) => {
    const el = document.createElement("li");
    el.innerHTML = item;
    el.setAttribute("data-key", item);
    suggFragment.appendChild(el);
  });
  suggestionBox.innerHTML = "";
  suggestionBox.appendChild(suggFragment);
};

const handleSearch = async (value) => {
  const res = await getFilteredResults(value);
  if (res.length) {
    suggestionBox.classList.add("suggestion-visible");
    renderDropdownItems(res);
  } else {
    resetState();
  }
};

const handleInputChange = (event) => {
  const inputText = event.target.value;
  if (inputText) {
    handleSearch(inputText);
  } else {
    resetState();
  }
};

const selectItem = (event) => {
  const { key } = event.target.dataset;
  if (key) {
    searchBox.value = key;
    resetState();
  }
};

(() => {
  searchBox.addEventListener("input", debounce(handleInputChange, 250));
  // Due to event delegation, we are putting click event listener on the parent
  // i.e. suggestionBox. By doing this, we dont put too many event listeners on
  // each child list-items (li) and it improves performance of the app within
  // the browser.
  suggestionBox.addEventListener("click", selectItem);
})();
