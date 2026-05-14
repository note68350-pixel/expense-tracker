let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

renderExpenses();

function addExpense(){

  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const amount = Number(document.getElementById("amount").value);

  if(!date || !title || !amount){
    alert("ກະລຸນາກອກຂໍມູນໃຫ້ຄົບ");
    return;
  }

  const expense = {
    id: Date.now(),
    date,
    title,
    category,
    amount
  };

  expenses.push(expense);

  saveData();

  renderExpenses();

  clearForm();
}

function renderExpenses(){

  const expenseList = document.getElementById("expenseList");

  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach(expense => {

    total += expense.amount;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.title}</td>
      <td>${expense.category}</td>
      <td>${expense.amount.toLocaleString()} ກີບ</td>
      <td>
        <button class="delete-btn" onclick="deleteExpense(${expense.id})">
          ลบ
        </button>
      </td>
    `;

    expenseList.appendChild(tr);

  });

    document.getElementById("monthlyTotal").innerText =
        `ລວມເດືອນນີ້: ${total.toLocaleString()} ກີບ`;
}

function deleteExpense(id){

  expenses = expenses.filter(expense => expense.id !== id);

  saveData();

  renderExpenses();
}

function saveData(){

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function clearForm(){

  document.getElementById("date").value = "";
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}
if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker.register("./service-worker.js")
      .then(() => {
        console.log("Service Worker Registered");
      });

  });

}