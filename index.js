const saveEl = document.getElementById("btn-save");
const inputEl = document.getElementById("input-el");
let myleads = [];
let ulEl = document.getElementById("ul-el");
let delEl = document.getElementById("btn-del");
let tabEl = document.getElementById("btn-tab");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));

if (leadsFromLocalStorage) {
  myleads = leadsFromLocalStorage;
  render(myleads);
}
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
      </li>`;
  }
  ulEl.innerHTML = listItems;
}

saveEl.addEventListener("click", function () {
  myleads.push(inputEl.value);
  localStorage.setItem("myleads", JSON.stringify(myleads));
  render(myleads);
  console.log(localStorage.getItem("myleads"));
  inputEl.value = "";
});

tabEl.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myleads.push(tabs[0].url);
    localStorage.setItem("myleads", JSON.stringify(myleads));
    render(myleads);
  });
});

delEl.addEventListener("dblclick", function () {
  localStorage.clear();
  myleads = [];
  render(myleads);
});
