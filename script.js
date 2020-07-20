const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);

}

// Double everyone's money with map()
function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    }
  });

  updateDOM();
}

// Sort by wealth with sort()
function sortWealth() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Show only the millionaires with filter()
function showMillionairesOnly() {
  data = data.filter(item => item.money >= 1000000 && item.money <= 9999999);

  updateDOM();
}

// Calculate everyone's wealth with reduce()
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM using forEach
function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionairesOnly);
sortBtn.addEventListener('click', sortWealth);
calculateWealthBtn.addEventListener('click', calculateWealth);