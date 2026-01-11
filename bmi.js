document.addEventListener("DOMContentLoaded", () => {
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");
  const resultBox = document.getElementById("bmiResult");
  const resultValue = document.getElementById("bmiValue");
  const resultStatus = document.getElementById("bmiStatus");
  const calcBtn = document.getElementById("calculateBMI");

  calcBtn.addEventListener("click", () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value) / 100;

    if (!weight || !height) {
      alert("Please enter both weight and height!");
      return;
    }

    const bmi = (weight / (height * height)).toFixed(1);
    resultValue.textContent = bmi;

    let status = "";
    if (bmi < 18.5) status = "Underweight";
    else if (bmi < 25) status = "Normal";
    else if (bmi < 30) status = "Overweight";
    else status = "Obese";

    resultStatus.textContent = `Status: ${status}`;
    resultBox.classList.remove("hidden");
  });
});

// ---------- AI CHAT WIDGET (Disalin dari index.js) ----------
(function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const chatToggle = document.getElementById("chatToggle");
  const chatWidget = document.getElementById("chat-widget");
  const closeChat = document.getElementById("closeChat");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chatText");
  const sendChat = document.getElementById("sendChat");

  // Hanya tampilkan chatbox jika user sudah login
  if (user && chatToggle && chatWidget) {
    chatToggle.classList.remove("hidden");
  }

  // Event listener untuk membuka chat
  if (chatToggle) {
    chatToggle.addEventListener("click", () => {
      chatWidget.classList.remove("hidden");
      chatToggle.classList.add("hidden");
    });
  }

  // Event listener untuk menutup chat
  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatWidget.classList.add("hidden");
      chatToggle.classList.remove("hidden");
    });
  }

  // Fungsi untuk mengirim pesan ke server (pastikan server.js Anda berjalan)
  async function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    chatMessages.innerHTML += `<p class="user">You: ${msg}</p>`;
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          userData: user || {
            name: "Guest",
            age: 20,
            gender: "Other",
            weight: 60,
            height: 170,
            goals: "Stay fit",
            meals: ["rice"],
            schedule: {}
          }
        }),
      });

      const data = await response.json();
      chatMessages.innerHTML += `<p class="ai">AI: ${data.reply}</p>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (err) {
      chatMessages.innerHTML += `<p class="ai">AI: Sorry, server error.</p>`;
    }
  }

  if (sendChat) sendChat.addEventListener("click", sendMessage);
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
})();