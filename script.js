let chart;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

renderExpenses();

function addExpense(){

  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const amount = Number(document.getElementById("amount").value);

  if(!date || !title || !amount){
    alert("กรุณากรอกข้อมูลให้ครบ");
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
      <td>${expense.amount.toLocaleString()} บาท</td>
      <td>
        <button class="delete-btn" onclick="deleteExpense(${expense.id})">
          ลบ
        </button>
      </td>
    `;

    expenseList.appendChild(tr);

  });

  document.getElementById("monthlyTotal").innerText =
    `รวมเดือนนี้: ${total.toLocaleString()} บาท`;
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
function renderChart(){

  const categories = {};
  
  expenses.forEach(expense => {

    if(categories[expense.category]){
      categories[expense.category] += expense.amount;
    }else{
      categories[expense.category] = expense.amount;
    }

  });

  const labels = Object.keys(categories);
  const data = Object.values(categories);

  const ctx = document
    .getElementById("expenseChart")
    .getContext("2d");

  if(chart){
    chart.destroy();
  }

  chart = new Chart(ctx, {

    type: "pie",

    data: {

      labels: labels,

      datasets: [{
        data: data
      }]

    }

  });

}