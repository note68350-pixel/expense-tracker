import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDVb8nhkcfFuvvSp_ov7fkVmt2ihwqk19o",
  authDomain: "expense-tracker-eaba8.firebaseapp.com",
  projectId: "expense-tracker-eaba8",
  storageBucket: "expense-tracker-eaba8.firebasestorage.app",
  messagingSenderId: "406037044423",
  appId: "1:406037044423:web:d6aecc9f60d5e20ca8b2e2",
  measurementId: "G-KBGTD51K3D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const handleCreate = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    alert("สมัครสมาชิกสำเร็จ!");
  } catch (error) {
    alert(error.message);
  }
};
  const handleLogin = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    setLoggedIn(true);
  } catch (error) {
    alert(error.message);
  }
};
  const addTransaction = () => {
  if (!text || !amount) return;

  const newTransaction = {
    id: Date.now(),
    text,
    amount: Number(amount),
  };

  setTransactions([...transactions, newTransaction]);

  setText("");
  setAmount("");
};

const total = transactions.reduce(
  (acc, item) => acc + item.amount,
  0
);

  return (
  <>
    {!loggedIn ? (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#e9ebf2",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            width: "300px",
            textAlign: "center",
          }}
        >
          <h1>Expense Tracker</h1>

          <input
            id="email"
            type="email"
            placeholder="Email"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
            }}
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Login
          </button>

          <p
            onClick={handleCreate}
            style={{
              marginTop: "20px",
              cursor: "pointer",
              color: "#2563eb",
            }}
          >
            Create account
          </p>
        </div>
      </div>
    ) : (
      <div
  style={{
    minHeight: "100vh",
    background: "#f1f5f9",
    padding: "20px",
    fontFamily: "sans-serif",
  }}
>
  <div
    style={{
      background: "linear-gradient(135deg,#2563eb,#4f46e5)",
      padding: "25px",
      borderRadius: "25px",
      color: "white",
      marginBottom: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    }}
  >
    <h1 style={{ margin: 0 }}>💰 Expense Tracker</h1>

    <p style={{ opacity: 0.8 }}>
      Welcome back
    </p>

    <h2 style={{ fontSize: "40px", marginTop: "20px" }}>
      {total} ₭
    </h2>

    <p>Total Balance</p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      marginBottom: "20px",
    }}
  >
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <h3>Income</h3>

      <h2 style={{ color: "#16a34a" }}>
        + {transactions
          .filter((t) => t.amount > 0)
          .reduce((a, b) => a + b.amount, 0)} ₭
      </h2>
    </div>

    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <h3>Expense</h3>

      <h2 style={{ color: "#dc2626" }}>
        {transactions
          .filter((t) => t.amount < 0)
          .reduce((a, b) => a + b.amount, 0)} ₭
      </h2>
    </div>
  </div>

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "20px",
      marginBottom: "20px",
    }}
  >
    <h2>Add Transaction</h2>

    <input
      type="text"
      placeholder="Description"
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{
        width: "100%",
        padding: "14px",
        marginTop: "10px",
        borderRadius: "12px",
        border: "1px solid #ddd",
      }}
    />

    <input
      type="number"
      placeholder="Amount (+ income / - expense)"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      style={{
        width: "100%",
        padding: "14px",
        marginTop: "10px",
        borderRadius: "12px",
        border: "1px solid #ddd",
      }}
    />

    <button
      onClick={addTransaction}
      style={{
        width: "100%",
        padding: "15px",
        marginTop: "15px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "15px",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      Add Transaction
    </button>
  </div>

  <h2>Recent Transactions</h2>

  {transactions.map((item) => (
    <div
      key={item.id}
      style={{
        background: "white",
        padding: "18px",
        borderRadius: "18px",
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>
          {item.text}
        </h3>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Transaction
        </p>
      </div>

      <h3
        style={{
          color:
            item.amount > 0
              ? "#16a34a"
              : "#dc2626",
        }}
      >
        {item.amount} ₭
      </h3>
    </div>
  ))}
</div>
    )}
  </>
);
}

export default App;