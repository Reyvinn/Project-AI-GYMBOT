// ---------- SIGN UP PAGE ----------
if (document.getElementById("signUpForm")) {
  const form = document.getElementById("signUpForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const oldData = JSON.parse(localStorage.getItem("database_user")) || {};

    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      weight: document.getElementById("weight").value,
      height: document.getElementById("height").value,
      goals: document.getElementById("goals").value,

      schedule: oldData.schedule || {},
      meals: oldData.meals || "",
      caloriesHistory: oldData.caloriesHistory || [],
      waterHistory: oldData.waterHistory || [],
      nutritionHistory: oldData.nutritionHistory || { protein: [], carbs: [], fat: [], calories: [] },

      customColors: oldData.customColors || { calorie: "#4caf50", water: "#2196f3" }
    };

    localStorage.setItem("database_user", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user)); 

    alert("Profil berhasil diperbarui!");

    window.location.href = "personal.html"; 
  });
}

// ---------- LOGIKA LOGIN DITAMBAHKAN AGAR BISA LOGIN ----------
// --- DI BAGIAN LOGIN ---
if (document.getElementById("loginForm")) {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;

        // 1. Ambil data dari "Database" (yang aman, tidak dihapus saat logout)
        const dbData = localStorage.getItem("database_user");
        const storedUser = JSON.parse(dbData);

        // 2. Cek apakah ada data di database
        if (!storedUser) {
            alert("Belum ada akun terdaftar! Silakan daftar dulu.");
            return;
        }

        // 3. Cek Email & Password
        if (storedUser.email === loginEmail && storedUser.password === loginPassword) {
            alert("Login berhasil! Selamat datang, " + storedUser.name);
            
            // 4. INI KUNCINYA:
            // Saat Login berhasil, kita COPY data dari database ke key "user".
            // Key "user" ini sekarang hanya berfungsi sebagai "Tiket Masuk" (Session).
            localStorage.setItem("user", JSON.stringify(storedUser));
            
            window.location.href = "personal.html";
        } else {
            alert("Login gagal. Email atau Password salah.");
        }
    });
}


// ---------- AI CHAT WIDGET ----------
(function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const chatToggle = document.getElementById("chatToggle");
  const chatWidget = document.getElementById("chat-widget");
  const closeChat = document.getElementById("closeChat");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chatText");
  const sendChat = document.getElementById("sendChat");

  if (user && chatToggle && chatWidget) {
    chatToggle.classList.remove("hidden");
  }

  if (chatToggle) {
    chatToggle.addEventListener("click", () => {
      chatWidget.classList.toggle("hidden");
    });
  }
  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatWidget.classList.add("hidden");
    });
  }

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
        body: JSON.stringify({ message: msg, userData: user }),
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