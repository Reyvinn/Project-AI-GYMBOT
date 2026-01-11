document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const randomizeBtn = document.getElementById('randomizeBtn'); 
    
    // START PERUBAHAN: New Controls
    const loadSelectedBtn = document.getElementById('loadSelectedBtn');
    const clearSelectionsBtn = document.getElementById('clearSelectionsBtn');
    // END PERUBAHAN

    const inputReps = document.getElementById('inputReps');
    const inputSets = document.getElementById('inputSets');
    const inputDuration = document.getElementById('inputDuration');

    const exerciseList = document.getElementById('exerciseList'); 
    const currentExerciseName = document.getElementById('currentExerciseName');
    
    const currentSetDisplay = document.getElementById('currentSet');
    const totalSetsDisplay = document.getElementById('totalSets');
    const currentLapDisplay = document.getElementById('currentLap');
    const totalRepsDisplay = document.getElementById('totalReps');
    
    let timerInterval;
    let timeRemaining = 0; // Waktu dalam detik
    let isRunning = false;
    
    let totalReps = parseInt(inputReps.value);
    let totalSets = parseInt(inputSets.value);
    let currentSet = 0;
    let currentLap = 0;
    
    // -------------------- EXERCISE DATA --------------------
    const allExercises = [
        {
            name: "Push-ups", reps: "10", sets: "3", duration: "45",
            steps: [
                "Start in a high plank position, hands slightly wider than shoulder-width.",
                "Keep your body straight from head to heels, engage your core.",
                "Lower your chest towards the floor by bending your elbows.",
                "Push back up to the starting position until your arms are fully extended."
            ]
        },
        {
            name: "Squats", reps: "15", sets: "4", duration: "60",
            steps: [
                "Stand with feet shoulder-width apart, chest up, and core engaged.",
                "Push your hips back and bend your knees as if sitting in a chair.",
                "Go down until your thighs are parallel to the floor, if possible.",
                "Drive through your heels to return to the starting position."
            ]
        },
        {
            name: "Plank Hold", reps: "1", sets: "3", duration: "90",
            steps: [
                "Start in a forearm plank position, elbows aligned under shoulders.",
                "Form a straight line from your head to your heels.",
                "Engage your core and glutes tightly.",
                "Hold this position for the full duration without letting your hips sag."
            ]
        },
        {
            name: "Lunges", reps: "12", sets: "3", duration: "40",
            steps: [
                "Stand tall, step forward with one leg.",
                "Lower your hips until both knees are bent at a 90-degree angle.",
                "Ensure your front knee is directly above your ankle.",
                "Push off with your front foot to return to the start."
            ]
        },
        {
            name: "Crunches", reps: "15", sets: "3", duration: "30",
            steps: [
                "Lie on your back, knees bent, feet flat on the floor, hands behind your head.",
                "Engage your core and lift your shoulder blades off the floor.",
                "Avoid pulling on your neck.",
                "Slowly lower back down to the starting position."
            ]
        },
        {
            name: "Burpees", reps: "8", sets: "3", duration: "60",
            steps: [
                "Start standing, drop into a squat position with hands on the ground.",
                "Kick your feet back to a plank position.",
                "Perform a push-up (optional).",
                "Jump your feet back to the squat position and leap into the air."
            ]
        },
        {
            name: "Tricep Dips (Chair)", reps: "10", sets: "3", duration: "45",
            steps: [
                "Sit on a chair/bench edge, gripping the side with hands shoulder-width apart.",
                "Slide your hips off the edge, supporting your weight with your arms.",
                "Lower your body until your elbows are bent at a 90-degree angle.",
                "Push back up until your arms are straight."
            ]
        },
        {
            name: "Mountain Climbers", reps: "20", sets: "3", duration: "45",
            steps: [
                "Start in a high plank position, hands under your shoulders.",
                "Alternate bringing your knees toward your chest quickly.",
                "Keep your hips low and your core tight.",
                "Maintain a fast, controlled pace."
            ]
        },
        {
            name: "Jumping Jacks", reps: "30", sets: "3", duration: "60",
            steps: [
                "Stand with feet together and arms at your sides.",
                "Jump while spreading your feet and raising your arms over your head.",
                "Jump back to the starting position with feet together and arms down.",
                "Repeat in a continuous, rhythmic motion."
            ]
        },
        {
            name: "Reverse Crunches", reps: "15", sets: "3", duration: "40",
            steps: [
                "Lie on your back, hands by your sides or under your lower back.",
                "Lift your legs, bending your knees to 90 degrees.",
                "Exhale and use your abs to curl your hips off the floor, bringing knees towards your chest.",
                "Lower slowly and repeat."
            ]
        },
        {
            name: "Glute Bridge", reps: "15", sets: "3", duration: "50",
            steps: [
                "Lie on your back, knees bent, feet flat on the floor hip-width apart.",
                "Push through your heels, lifting your hips toward the ceiling.",
                "Squeeze your glutes at the top.",
                "Slowly lower your hips back down."
            ]
        },
        {
            name: "High Knees", reps: "30", sets: "3", duration: "60",
            steps: [
                "Stand tall and start jogging in place.",
                "Bring your knees up toward your chest as high as possible.",
                "Keep your arms pumping in coordination with your legs.",
                "Stay light on your feet and maintain a quick tempo."
            ]
        }
    ];

    // START PERUBAHAN: State untuk Latihan yang Ditampilkan (max 3 slots)
    let displayedExercises = []; 
    // END PERUBAHAN

    // --- UTILITY FUNCTIONS ---

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
    };

    const updateTimerDisplay = () => {
        const timerMinutes = document.getElementById('timerMinutes');
        const timerSeconds = document.getElementById('timerSeconds');
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerMinutes.textContent = formatTime(minutes);
        timerSeconds.textContent = formatTime(seconds);
    };

    const updateProgressDisplay = () => {
        totalSetsDisplay.textContent = totalSets;
        totalRepsDisplay.textContent = totalReps;
        currentSetDisplay.textContent = currentSet;
        currentLapDisplay.textContent = currentLap;
    };


    // -------------------- NEW RENDERING LOGIC --------------------

    const getUniqueRandomExercises = (count = 3) => {
        // Shuffle and slice to get random unique exercises
        return [...allExercises].sort(() => 0.5 - Math.random()).slice(0, count);
    };

    // Fungsi inti untuk me-render 3 slot, baik terisi atau kosong
    const renderExercises = (exercises) => {
        exerciseList.innerHTML = '';
        
        // Ensure we only process the first 3 exercises
        const exercisesToRender = exercises.slice(0, 3);
        
        exercisesToRender.forEach((exercise, index) => {
            if (exercise) {
                // Render Normal Card
                const stepsHtml = exercise.steps.map(step => `<li>${step}</li>`).join('');
                const cardHtml = `
                    <div class="exercise-card" 
                         data-name="${exercise.name}" 
                         data-reps="${exercise.reps}" 
                         data-sets="${exercise.sets}" 
                         data-duration="${exercise.duration}"
                         data-index="${index}">
                        
                        <div class="remove-card-btn" data-name="${exercise.name}" title="Remove this exercise"><i class='bx bx-x'></i></div>
                        <label class="select-toggle" title="Select this exercise">
                            <input type="checkbox" class="exercise-select-checkbox" data-name="${exercise.name}">
                            <i class='bx bx-check-circle'></i>
                        </label>

                        <h4>${exercise.name}</h4>
                        <ol class="steps">
                            ${stepsHtml}
                        </ol>
                        <button class="btn select-exercise-btn">Select & Load to Timer</button>
                    </div>
                `;
                exerciseList.innerHTML += cardHtml;
            }
        });
        
        // Render Empty Selector Cards for remaining slots (up to 3)
        for (let i = exercisesToRender.length; i < 3; i++) {
            const emptyCardHtml = `
                <div class="exercise-card empty-selector-card" data-index="${i}">
                    <h4>Select Exercise for Slot ${i + 1}</h4>
                    <select id="select-slot-${i}" class="full-exercise-selector">
                        <option value="">-- Choose Exercise --</option>
                        ${allExercises.map(ex => `<option value="${ex.name}">${ex.name}</option>`).join('')}
                    </select>
                    <button class="btn fill-slot-btn" data-index="${i}">Add Exercise</button>
                </div>
            `;
            exerciseList.innerHTML += emptyCardHtml;
        }

        // Re-attach event listeners after rendering new cards
        attachListeners();
        
        // Update the global state
        displayedExercises = exercisesToRender.filter(ex => ex !== null); 
    };
    
    // Fungsi untuk mengisi slot kosong
    const fillSlot = (exerciseName, slotIndex) => {
        const selectedExercise = allExercises.find(ex => ex.name === exerciseName);
        if (selectedExercise) {
            // Check if exercise is already displayed in any current card
            const isAlreadyDisplayed = displayedExercises.some(ex => ex && ex.name === exerciseName);
            if (isAlreadyDisplayed) {
                 alert(`${exerciseName} is already displayed. Please select a different exercise.`);
                 // Re-render to reset the dropdown value
                 renderExercises(displayedExercises); 
                 return;
            }
            
            // Cari slot yang benar-benar kosong di array (atau yang index-nya berada di luar list saat ini)
            let newExercises = [...displayedExercises];
            
            // Masukkan di index kosong pertama yang tersedia.
            if (slotIndex >= newExercises.length) {
                newExercises.push(selectedExercise);
            } else {
                // Ini untuk jaga-jaga, tapi seharusnya index yang diberikan valid
                newExercises[slotIndex] = selectedExercise; 
            }
            
            // Re-render dengan list baru
            renderExercises(newExercises);
        } else {
             alert("Please select a valid exercise.");
        }
    };
    
    const attachListeners = () => {
        // 1. SELECT & LOAD BUTTON (Untuk memuat 1 latihan ke timer)
        document.querySelectorAll('.select-exercise-btn').forEach(button => {
            button.removeEventListener('click', handleSelectExerciseAndLoad); 
            button.addEventListener('click', handleSelectExerciseAndLoad);
        });
        
        // 2. REMOVE CARD BUTTON ('X')
        document.querySelectorAll('.remove-card-btn').forEach(button => {
            button.removeEventListener('click', handleRemoveCard); 
            button.addEventListener('click', handleRemoveCard);
        });
        
        // 3. SELECTION TOGGLE (CHECKBOX)
        document.querySelectorAll('.exercise-select-checkbox').forEach(checkbox => {
            checkbox.removeEventListener('change', handleCardSelectionToggle); 
            checkbox.addEventListener('change', handleCardSelectionToggle);
        });
        
        // 4. FILL SLOT BUTTON (for empty cards)
        document.querySelectorAll('.fill-slot-btn').forEach(button => {
            button.removeEventListener('click', handleFillSlot); 
            button.addEventListener('click', handleFillSlot);
        });
    };

    // --- HANDLERS ---

    // Handler untuk tombol "Select & Load to Timer" di setiap kartu
    const handleSelectExerciseAndLoad = (e) => {
        const card = e.target.closest('.exercise-card');
        loadExerciseToTimer(card);
        
        resetCheckmarks(); 
    };

    // Handler untuk tombol 'X' (Remove Card)
    const handleRemoveCard = (e) => {
        const cardToRemove = e.target.closest('.exercise-card');
        const nameToRemove = cardToRemove.dataset.name;
        
        // Filter out the removed exercise
        const newExercises = displayedExercises.filter(ex => ex.name !== nameToRemove);
        
        // Re-render with the filtered list (yang akan merender slot kosong di sisa tempat)
        renderExercises(newExercises);
    };

    // Handler untuk checkbox di kartu (memilih 1-3 latihan)
    const handleCardSelectionToggle = (e) => {
        const checkbox = e.target;
        const card = checkbox.closest('.exercise-card');
        
        if (checkbox.checked) {
            // Check if maximum selections reached (max 3)
            const selectedCards = document.querySelectorAll('.exercise-card.selected');
            if (selectedCards.length >= 3) {
                alert("You can select a maximum of 3 exercises.");
                checkbox.checked = false; // Prevent selection
                return;
            }
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    };

    // Handler untuk tombol "Add Exercise" di slot kosong
    const handleFillSlot = (e) => {
        const slotIndex = parseInt(e.target.dataset.index);
        const selector = document.getElementById(`select-slot-${slotIndex}`);
        const exerciseName = selector.value;
        
        if (exerciseName) {
            fillSlot(exerciseName, slotIndex);
        } else {
            alert("Please select an exercise from the list.");
        }
    };

    // Handler untuk tombol "Randomize 3"
    const handleRandomize = () => {
        const newRandomExercises = getUniqueRandomExercises(3);
        renderExercises(newRandomExercises);
    };

    // Handler untuk tombol "Clear Selections"
    // Handler untuk tombol "Clear Selections" (MENGHAPUS SEMUA KARTU JADI KOSONG)
    const clearAllSelections = () => {
        displayedExercises = []; 
        renderExercises(displayedExercises);
    };
    
    // Handler untuk tombol "Load Selected Exercise"
    const handleLoadSelected = () => {
        const selectedCards = document.querySelectorAll('.exercise-card.selected');
        
        if (selectedCards.length === 0) {
            alert("Please select 1 to 3 exercises using the checkmark toggle before loading.");
            return;
        }

        if (selectedCards.length === 1) {
             loadExerciseToTimer(selectedCards[0]);
        } else {
            loadExerciseToTimer(selectedCards[0]);
            alert(`Loaded: ${selectedCards[0].dataset.name}. The timer only loads one at a time.`);
        }
        
        // GANTI INI: Pakai resetCheckmarks() agar kartu tidak hilang
        resetCheckmarks();
    };

    const resetCheckmarks = () => {
        document.querySelectorAll('.exercise-card.selected').forEach(card => {
            card.classList.remove('selected');
            const checkbox = card.querySelector('.exercise-select-checkbox');
            if (checkbox) checkbox.checked = false;
        });
    };

    // FUNGSI INTI UNTUK MEMUAT DATA KE TIMER
    const loadExerciseToTimer = (card) => {
        const name = card.dataset.name;
        const reps = card.dataset.reps;
        const sets = card.dataset.sets;
        const duration = card.dataset.duration;

        inputReps.value = reps;
        inputSets.value = sets;
        inputDuration.value = duration;
        currentExerciseName.textContent = name;

        totalReps = parseInt(reps);
        totalSets = parseInt(sets);
        resetTimer(); 
        
        timeRemaining = parseInt(duration);
        updateTimerDisplay();

        // alert(`Loaded: ${name}. Set R: ${reps}, S: ${sets}, D: ${duration}s. Ready to start!`);
    };

    // --- TIMER LOGIC (remains the same) ---
    
    const countdown = () => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            if (currentLap < totalReps) {
                currentLap++;
            }
            
            if (currentLap >= totalReps) {
                currentSet++;
                currentLap = 0; 
            }

            if (currentSet > totalSets) { 
                currentSet = totalSets; 
                console.log("Workout Complete!");
                alert(`Workout Complete: ${currentExerciseName.textContent}!`);
                resetTimer();
                return;
            }
            
            timeRemaining = parseInt(inputDuration.value);
            if (currentSet <= totalSets && currentSet > 0) {
                 startTimer(false); 
            }
            
        } else {
            timeRemaining--;
        }
        
        updateTimerDisplay();
        updateProgressDisplay();
    };

    const startTimer = (isInitialStart = true) => {
        if (isRunning) return;
        
        if (currentExerciseName.textContent === "Not Selected") {
             alert("Please select an exercise first.");
             return;
        }
        
        if (isInitialStart && currentSet === 0) {
            currentSet = 1; 
            currentLap = 1; 
            timeRemaining = parseInt(inputDuration.value);
        } else if (timeRemaining === 0) {
            timeRemaining = parseInt(inputDuration.value);
            if (currentLap === 0) currentLap = 1;
        }

        isRunning = true;
        timerInterval = setInterval(countdown, 1000);
        startBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        updateProgressDisplay();
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    };

    const resetTimer = () => {
        pauseTimer();
        
        currentSet = 0;
        currentLap = 0;
        timeRemaining = parseInt(inputDuration.value) || 0; 
        
        updateTimerDisplay();
        updateProgressDisplay();
        startBtn.textContent = "Start Timer";
        startBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    };


    // --- EVENT LISTENERS PADA INIT ---

    startBtn.addEventListener('click', () => startTimer(true)); 
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Attach new controls listeners
    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', handleRandomize);
    }
    if (loadSelectedBtn) {
        loadSelectedBtn.addEventListener('click', handleLoadSelected);
    }
    if (clearSelectionsBtn) {
        clearSelectionsBtn.addEventListener('click', clearAllSelections);
    }

    inputReps.addEventListener('change', () => {
        totalReps = parseInt(inputReps.value);
        updateProgressDisplay();
    });
    inputSets.addEventListener('change', () => {
        totalSets = parseInt(inputSets.value);
        updateProgressDisplay();
    });

    // Initialize display on load
    updateProgressDisplay();
    updateTimerDisplay(); 
    
    // Initial rendering: 3 random exercises
    renderExercises(getUniqueRandomExercises(3));
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