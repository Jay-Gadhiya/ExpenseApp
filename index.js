const userAmount = document.querySelector("#userAmount");
const addAmountBtn = document.querySelector("#addAmountBtn");
const showTotalExpense = document.querySelector("#showTotalExpense");
const description = document.querySelector("#description");
const showItemList = document.querySelector("#showItemList");

let totalExpense = 0;
let allExpense = [];

// Date function

function getDateString(moment) {
  return moment.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// render function
function renderItems() {
  const allExpenseItemsHtml = allExpense.map((expense) => designView(expense));
  var expenseHtmlJoin = allExpenseItemsHtml.join("");
  showItemList.innerHTML = expenseHtmlJoin;

  // clean input
  userAmount.value = "";
  description.value = "";
}


// Delete item function

function deleteItems(dateValue) {
  // const newArray = [];

  // for (let i = 0; i < allExpense.length; i++) {
  //   if (allExpense[i].moment.valueOf() !== dateValue) {
  //     newArray.push(allExpense[i]);

  //   }
  // }
  for (let i = 0; i < allExpense.length; i++) {
    if (allExpense[i].moment.valueOf() == dateValue) {
      totalExpense = totalExpense - Number(allExpense[i].amount);
      showTotalExpense.textContent = totalExpense;

      let index = allExpense.indexOf(allExpense[i]);
      allExpense.splice(index, 1);
    }
  }
  renderItems();
}

function designView({ amount, description, moment }) {
  return `    
    <li class="list-group-item d-flex justify-content-between">
              <div class="d-flex flex-column">
              ${description}
                <small class="text-muted">${getDateString(moment)}</small>
              </div>
              <div>
                <span class="px-5">
                ${amount}
                </span>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick = "deleteItems(${moment.valueOf()})" >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </li>
      `;
}

// amount store array
const amountArr = [];

function addAmountToExpense() {
  // push amount in array
  amountArr.push(userAmount.value);

  totalExpense += Number(userAmount.value);
  showTotalExpense.textContent = totalExpense;

  // object create for items
  expenseObj = {};
  expenseObj.amount = userAmount.value;
  expenseObj.description = description.value;
  expenseObj.moment = new Date();

  // store all data in array
  allExpense.push(expenseObj);

  renderItems();
}

addAmountBtn.addEventListener("click", addAmountToExpense);
