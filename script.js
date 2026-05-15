let expenses = JSON.parse(
  localStorage.getItem("expenses")
) || [];

function saveExpenses(){

  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );
}

function updateDashboard(){

  let total = 0;

  expenses.forEach(expense=>{
    total += expense.amount;
  });

  const totalElement =
    document.getElementById("monthlyTotal");

  if(totalElement){
    totalElement.innerText =
      total.toLocaleString() + " ກີບ";
  }

  const countElement =
    document.getElementById("expenseCount");

  if(countElement){
    countElement.innerText =
      expenses.length + " ລາຍການ";
  }

  const todayElement =
    document.getElementById("todayDate");

  if(todayElement){
    todayElement.innerText =
      new Date().toLocaleDateString("lo-LA");
  }
}

function addExpense(){

  const title =
    document.getElementById("title").value;

  const amount =
    document.getElementById("amount").value;

  const category =
    document.getElementById("category").value;

  if(title === "" || amount === ""){

    alert("ກະລຸນາປ້ອນຂໍ້ມູນ");

    return;
  }

  const today = new Date();

  const expense = {

    title:title,

    amount:Number(amount),

    category:category,

    date:
      today.toLocaleDateString("lo-LA"),

    time:
      today.toLocaleTimeString("lo-LA",{
        hour:"2-digit",
        minute:"2-digit"
      })
  };

  expenses.unshift(expense);

  saveExpenses();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";

  alert("ເພີ່ມລາຍຈ່າຍສຳເລັດ");
}

function deleteExpense(index){

  expenses.splice(index,1);

  saveExpenses();

  renderExpenses();

  updateDashboard();
}

function renderExpenses(){

  const expenseList =
    document.getElementById("expenseList");

  if(!expenseList) return;

  const searchInput =
    document.getElementById("searchInput");

  const filterCategory =
    document.getElementById("filterCategory");

  let search = "";
  let filter = "all";

  if(searchInput){
    search = searchInput.value.toLowerCase();
  }

  if(filterCategory){
    filter = filterCategory.value;
  }

  expenseList.innerHTML = "";

  expenses.forEach((expense,index)=>{

    const matchSearch =
      expense.title.toLowerCase()
      .includes(search);

    const matchCategory =
      filter === "all" ||
      expense.category === filter;

    if(matchSearch && matchCategory){

      expenseList.innerHTML += `

      <div class="expense-card">

        <div class="expense-top">

          <div>

            <h3>${expense.title}</h3>

            <div class="category">
              ${expense.category}
            </div>

            <div class="date">
              📅 ${expense.date}
              •
              ⏰ ${expense.time}
            </div>

          </div>

          <div class="amount">
            ${expense.amount.toLocaleString()} ກີບ
          </div>

        </div>

        <button
          class="delete-btn"
          onclick="deleteExpense(${index})"
        >
          ລົບລາຍການ
        </button>

      </div>

      `;
    }
  });
}

updateDashboard();
renderExpenses();