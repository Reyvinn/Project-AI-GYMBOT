// ---------- PERSONAL PAGE ----------
if (document.getElementById("profile-info")) {
  const profileInfo = document.getElementById("profile-info");
  
  // Ambil data session saat ini
  let user = JSON.parse(localStorage.getItem("user"));

  // --- FUNGSI PENTING: SIMPAN KE SESSION DAN DATABASE SEKALIGUS ---
  // Kita pakai fungsi ini setiap kali ada perubahan data, 
  // supaya data tetap aman di 'database_user' meskipun user logout.
  const saveUser = (updatedUser) => {
      // 1. Update Session (biar tampilan saat ini update)
      localStorage.setItem("user", JSON.stringify(updatedUser));
      // 2. Update Database (biar data tersimpan permanen)
      localStorage.setItem("database_user", JSON.stringify(updatedUser));
  };

  // -------------------- COLOR & USER UTILITIES --------------------
  // Inisialisasi default color jika belum ada
  if (user && !user.customColors) {
    user.customColors = {
      calorie: "#4caf50", // Hijau
      water: "#2196f3"    // Biru
    };
    saveUser(user); // GANTI: Pakai fungsi saveUser
  }
  
  // Fungsi untuk mendapatkan warna dari user/default
  const getColor = (key) => user && user.customColors ? user.customColors[key] : { calorie: "#4caf50", water: "#2196f3" }[key];

  // Load color from storage to input fields and setup change listeners
  const calorieColorInput = document.getElementById("calorieColor");
  if (calorieColorInput) {
      calorieColorInput.value = getColor("calorie");
      calorieColorInput.addEventListener("change", () => {
          if (user) {
              user.customColors.calorie = calorieColorInput.value;
              saveUser(user); // GANTI: Pakai fungsi saveUser
              // Reload untuk memperbarui warna grafik kalori
              window.location.reload(); 
          }
      });
  }
  const waterColorInput = document.getElementById("waterColor");
  if (waterColorInput) {
      waterColorInput.value = getColor("water");
      waterColorInput.addEventListener("change", () => {
          if (user) {
              user.customColors.water = waterColorInput.value;
              saveUser(user); // GANTI: Pakai fungsi saveUser
              // Reload untuk memperbarui warna grafik air
              window.location.reload(); 
          }
      });
  }


  // -------------------- PROFILE INFO & FORMS --------------------
  if (user) {
    // Memastikan Age dan Goals ditampilkan
    profileInfo.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Age:</strong> ${user.age} tahun</p>
      <p><strong>Gender:</strong> ${user.gender}</p>
      <p><strong>Weight:</strong> ${user.weight} kg</p>
      <p><strong>Height:</strong> ${user.height} cm</p>
      <p><strong>Goals:</strong> ${user.goals || "Not specified"}</p>
      <p><strong>Favorite Meals:</strong> ${user.meals || "Not added"}</p>
    `;

    // Prefill schedule
    if (user.schedule) {
      Object.keys(user.schedule).forEach(day => {
        const input = document.getElementById(day);
        if (input) input.value = user.schedule[day];
      });
    }

    // Prefill meals
    if (user.meals) {
      const mealsInput = document.getElementById("meals");
      if (mealsInput) mealsInput.value = user.meals;
    }
    
    // BARU: Prefill goals
    const goalsInput = document.getElementById("goals_edit");
    if (goalsInput && user.goals) {
      goalsInput.value = user.goals;
    }

    // BARU: Prefill age
    const ageInput = document.getElementById("age_edit");
    if (ageInput && user.age) {
      ageInput.value = user.age;
    }

  } else {
    // Jika tidak ada session user, lempar ke login
    alert("Sesi habis. Silakan login kembali.");
    window.location.href = "sign.html";
  }

  // Save schedule
  const scheduleForm = document.getElementById("scheduleForm");
  if (scheduleForm) {
    scheduleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const schedule = {
        monday: document.getElementById("monday").value,
        tuesday: document.getElementById("tuesday").value, 
        wednesday: document.getElementById("wednesday").value,
        thursday: document.getElementById("thursday").value,
        friday: document.getElementById("friday").value,
        saturday: document.getElementById("saturday").value,
        sunday: document.getElementById("sunday").value
      };
      user.schedule = schedule;
      saveUser(user); // GANTI: Pakai fungsi saveUser
      alert("Schedule saved!");
    });
  }

  // Save meals
  const mealsForm = document.getElementById("mealsForm");
  if (mealsForm) {
    mealsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      user.meals = document.getElementById("meals").value;
      saveUser(user); // GANTI: Pakai fungsi saveUser
      alert("Favorite meals saved!");
      window.location.reload();
    });
  }
  
  // BARU: Save goals
  const goalsForm = document.getElementById("goalsForm");
  if (goalsForm) {
    goalsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      user.goals = document.getElementById("goals_edit").value;
      saveUser(user); // GANTI: Pakai fungsi saveUser
      alert("Fitness goals saved!");
      window.location.reload(); 
    });
  }
  
  // BARU: Save age
  const ageForm = document.getElementById("ageForm");
  if (ageForm) {
    ageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newAge = document.getElementById("age_edit").value;
      user.age = newAge;
      saveUser(user); // GANTI: Pakai fungsi saveUser
      alert("Age saved!");
      window.location.reload(); 
    });
  }

  // -------------------- CHART: Calorie Tracker (Doughnut + Undo) --------------------
  const calorieChartCtx = document.getElementById("calorieChart");
  if (calorieChartCtx && user) {
    if (!user.caloriesHistory) user.caloriesHistory = [];

    const calorieGoal = 2000;
    const totalConsumed = user.caloriesHistory.reduce((a, b) => a + b, 0);
    const remainingCalories = Math.max(0, calorieGoal - totalConsumed); 
    
    const calorieChart = new Chart(calorieChartCtx, {
      type: "doughnut",
      data: {
        labels: ["Consumed", "Remaining"],
        datasets: [{
          data: [totalConsumed, remainingCalories],
          backgroundColor: [getColor("calorie"), "#ddd"]
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                return `${label}: ${value.toFixed(0)} kcal`;
              }
            }
          }
        }
      }
    });

    // Add calories
    document.getElementById("calorieForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const caloriesInput = document.getElementById("calories");
      const added = parseInt(caloriesInput.value);
      if (isNaN(added) || added <= 0) return;

      user.caloriesHistory.push(added);
      saveUser(user); // GANTI: Pakai fungsi saveUser

      const total = user.caloriesHistory.reduce((a, b) => a + b, 0);
      calorieChart.data.datasets[0].data = [total, Math.max(0, calorieGoal - total)]; 
      calorieChart.update();
      caloriesInput.value = ''; 
    });

    // Undo last calorie entry
    const undoCalBtn = document.createElement("button");
    undoCalBtn.textContent = "Undo Last Calories";
    undoCalBtn.className = "btn";
    undoCalBtn.style.marginTop = "1rem";
    calorieChartCtx.parentNode.appendChild(undoCalBtn);

    undoCalBtn.addEventListener("click", () => {
        if (user.caloriesHistory.length > 0) { 
            user.caloriesHistory.pop();
            saveUser(user); // GANTI: Pakai fungsi saveUser

            const total = user.caloriesHistory.reduce((a, b) => a + b, 0);
            calorieChart.data.datasets[0].data = [total, Math.max(0, calorieGoal - total)];
            calorieChart.update();
        }
    });
  }

  // -------------------- CHART: Water Intake (Line Chart + Undo) --------------------
  const waterStatus = document.getElementById("waterStatus");
  if (waterStatus && user) {
    if (!user.waterHistory) user.waterHistory = [];
    waterStatus.textContent = `${user.waterHistory.reduce((a, b) => a + b, 0)} ml`;

    const waterChartCanvas = document.createElement("canvas");
    waterChartCanvas.id = "waterChart";
    
    const waterChart = new Chart(waterChartCanvas, {
      type: "line",
      data: {
        labels: user.waterHistory.map((_, i) => `Glass ${i + 1}`),
        datasets: [{
          label: "Water Intake (ml)",
          data: user.waterHistory,
          borderColor: getColor("water"), 
          backgroundColor: getColor("water") + '40', 
          fill: true,
          tension: 0.3
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });

    waterStatus.parentNode.insertBefore(waterChartCanvas, waterStatus.nextSibling);

    // Add water
    document.getElementById("addWater").addEventListener("click", () => {
      user.waterHistory.push(600);
      saveUser(user); // GANTI: Pakai fungsi saveUser
      
      waterStatus.textContent = `${user.waterHistory.reduce((a, b) => a + b, 0)} ml`;
      waterChart.data.labels.push(`Glass ${user.waterHistory.length}`);
      waterChart.data.datasets[0].data.push(600);
      waterChart.update();
    });

    // Undo last water entry
    const undoWaterBtn = document.createElement("button");
    undoWaterBtn.textContent = "Undo Last Water";
    undoWaterBtn.className = "btn";
    undoWaterBtn.style.marginTop = "1rem";
    waterStatus.parentNode.appendChild(undoWaterBtn);

    undoWaterBtn.addEventListener("click", () => {
        if (user.waterHistory.length > 0) {
            user.waterHistory.pop();
            saveUser(user); // GANTI: Pakai fungsi saveUser
            
            waterStatus.textContent = `${user.waterHistory.reduce((a, b) => a + b, 0)} ml`;
            waterChart.data.labels.pop();
            waterChart.data.datasets[0].data.pop();
            waterChart.update();
        }
    });
  }

  // -------------------- CHART: Nutrition Summary (Multi-line + Undo) --------------------
  const nutritionChartCtx = document.getElementById("nutritionChart");
  if (nutritionChartCtx && user) {
    if (!user.nutritionHistory) {
      user.nutritionHistory = { protein: [], carbs: [], fat: [], calories: [] };
    }

    const nutritionChart = new Chart(nutritionChartCtx, {
      type: "line",
      data: {
        labels: user.nutritionHistory.protein.map((_, i) => `Meal ${i + 1}`),
        datasets: [
          { label: "Protein (g)", data: user.nutritionHistory.protein, borderColor: "#2196f3", backgroundColor: "#2196f340", fill: true, tension: 0.3 },
          { label: "Carbs (g)", data: user.nutritionHistory.carbs, borderColor: "#ff9800", backgroundColor: "#ff980040", fill: true, tension: 0.3 },
          { label: "Fat (g)", data: user.nutritionHistory.fat, borderColor: "#f44336", backgroundColor: "#f4433640", fill: true, tension: 0.3 },
          { label: "Calories (kcal)", data: user.nutritionHistory.calories, borderColor: "#4caf50", backgroundColor: "#4caf5040", fill: true, tension: 0.3 }
        ]
      },
      options: { 
        scales: { y: { beginAtZero: true } },
        plugins: {
          legend: { display: true }
        } 
      }
    });

    // Add nutrition
    document.getElementById("nutritionForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const p = parseInt(document.getElementById("protein").value);
      const c = parseInt(document.getElementById("carbs").value);
      const f = parseInt(document.getElementById("fat").value);
      const cal = parseInt(document.getElementById("mealCalories").value);

      if (isNaN(p) || isNaN(c) || isNaN(f) || isNaN(cal)) return;

      user.nutritionHistory.protein.push(p);
      user.nutritionHistory.carbs.push(c);
      user.nutritionHistory.fat.push(f);
      user.nutritionHistory.calories.push(cal);

      saveUser(user); // GANTI: Pakai fungsi saveUser

      nutritionChart.data.labels.push(`Meal ${user.nutritionHistory.protein.length}`);
      nutritionChart.data.datasets[0].data.push(p);
      nutritionChart.data.datasets[1].data.push(c);
      nutritionChart.data.datasets[2].data.push(f);
      nutritionChart.data.datasets[3].data.push(cal);
      nutritionChart.update();
      
      document.getElementById("protein").value = '';
      document.getElementById("carbs").value = '';
      document.getElementById("fat").value = '';
      document.getElementById("mealCalories").value = '';
    });

    // Undo last nutrition entry
    const undoNutBtn = document.createElement("button");
    undoNutBtn.textContent = "Undo Last Meal";
    undoNutBtn.className = "btn";
    undoNutBtn.style.marginTop = "1rem";
    nutritionChartCtx.parentNode.appendChild(undoNutBtn);

    undoNutBtn.addEventListener("click", () => {
        if (user.nutritionHistory.protein.length > 0) {
            ["protein", "carbs", "fat", "calories"].forEach(k => user.nutritionHistory[k].pop());
            
            saveUser(user); // GANTI: Pakai fungsi saveUser

            nutritionChart.data.labels.pop();
            nutritionChart.data.datasets.forEach(ds => ds.data.pop());
            nutritionChart.update();
        }
    });
  }

  // -------------------- BUTTONS --------------------
  // Edit profile (redirect to sign up to create new/overwrite)
  const editBtn = document.getElementById("editProfile");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      window.location.href = "sign.html?mode=edit";
    });
  }

  // Logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // HANYA hapus 'user' (Session).
      // 'database_user' TETAP ADA agar data tidak hilang.
      localStorage.removeItem("user");
      alert("Anda berhasil logout.");
      window.location.href = "index.html";
    });
  }
}

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