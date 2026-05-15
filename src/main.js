document.querySelector('#app').innerHTML = `
  <h1>Hello</h1>
  <button id="testBtn">CLICK ME</button>
`;

document.getElementById("testBtn").addEventListener("click", () => {
  alert("WORKING");
});