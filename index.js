// ---------- NAVBAR BUTTON SWITCH ----------
(function () {
  const authLink = document.getElementById("auth-link");
  const homeAuthBtn = document.getElementById("home-auth-btn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (authLink) {
    if (user) {
      authLink.textContent = "Profile";
      authLink.href = "personal.html";
    } else {
      authLink.textContent = "Join Us";
      authLink.href = "sign.html";
    }
  }

  if (homeAuthBtn) {
    if (user) {
      homeAuthBtn.textContent = "Profile";
      homeAuthBtn.href = "personal.html";
    } else {
      homeAuthBtn.textContent = "Join Us";
      homeAuthBtn.href = "sign.html";
    }
  }
})();


// ---------- EXERCISE RECOMMENDATIONS SECTION ----------
(function () {
  const exerciseData = [
    { name: "Bench Press", category: "chest", img: "images/benchpress.jpg", desc: "A compound exercise for building chest, shoulder, and triceps strength." },
    { name: "Push-ups", category: "chest", img: "images/pushup.jpg", desc: "A classic bodyweight exercise that targets the chest muscles and core." },
    { name: "Dumbbell Flyes", category: "chest", img: "images/dumblefly.gif", desc: "An isolation exercise to stretch and build the pectoral muscles." },
    { name: "Pull-ups", category: "back", img: "images/pullup.jpg", desc: "A challenging bodyweight exercise for building a wide, strong back." },
    { name: "Barbell Rows", category: "back", img: "images/barbelrow.jpg", desc: "A compound movement that adds thickness and strength to the back." },
    { name: "Lat Pulldowns", category: "back", img: "images/latpulldown.jpg", desc: "A machine exercise that targets the latissimus dorsi muscles." },
    { name: "Squats", category: "legs", img: "images/squats.jpg", desc: "The king of leg exercises, targeting quads, hamstrings, and glutes." },
    { name: "Lunges", category: "legs", img: "images/lunges.jpg", desc: "A unilateral exercise great for balance, stability, and leg strength." },
    { name: "Leg Press", category: "legs", img: "images/legpress.jpg", desc: "A machine-based alternative to squats for building leg mass." },
    { name: "Overhead Press", category: "shoulders", img: "images/overheadpress.gif", desc: "A fundamental shoulder exercise for building strength and size." },
    { name: "Lateral Raises", category: "shoulders", img: "images/lateralraise.jpg", desc: "An isolation exercise for developing the medial deltoid for broader shoulders." },
    { name: "Bicep Curls", category: "arms", img: "images/bicepcurl.jpg", desc: "The classic exercise for building bigger and stronger biceps." },
    { name: "Tricep Dips", category: "arms", img: "images/tricepdips.jpg", desc: "An effective bodyweight or weighted exercise for the triceps." }
  ];

  const exerciseList = document.getElementById("exercise-list");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function renderExercises(filteredData) {
    if (!exerciseList) return;
    exerciseList.innerHTML = "";
    filteredData.forEach(exercise => {
      exerciseList.innerHTML += `
        <div class="exercise-card">
          <img src="${exercise.img}" alt="${exercise.name}">
          <h4>${exercise.name}</h4>
          <p>${exercise.desc}</p>
        </div>
      `;
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");
        renderExercises(
          filter === "all"
            ? exerciseData
            : exerciseData.filter(ex => ex.category === filter)
        );
      });
    });
  }

  renderExercises(exerciseData);
})();


// ---------- REVIEWS ----------
(function () {
  const reviewsList = document.getElementById("reviews-list");
  const addReviewSection = document.getElementById("add-review-section");
  const submitReviewBtn = document.getElementById("submitReview");

  if (!reviewsList) return;

  const presetReviews = [
    { name: "Alex M.", comment: "This is a very good website.", stars: 5 },
    { name: "Samantha L.", comment: "Reliable chatbot, I love it!", stars: 5 },
    { name: "David R.", comment: "Really useful for planning my workouts.", stars: 5 },
    { name: "Emily T.", comment: "Great design and easy to use.", stars: 5 },
    { name: "Michael K.", comment: "Super helpful fitness recommendations.", stars: 5 },
    { name: "Jessica H.", comment: "Free and very effective!", stars: 5 }
  ];

  function getRandomFour() {
    return [...presetReviews].sort(() => 0.5 - Math.random()).slice(0, 4);
  }

  const storedUserReview = JSON.parse(localStorage.getItem("userReview"));
  const currentUser = JSON.parse(localStorage.getItem("user"));

  function renderReviews() {
    reviewsList.innerHTML = "";
    getRandomFour().forEach(r => {
      reviewsList.innerHTML += `
        <div class="review-card">
          <h4>${r.name}</h4>
          <div class="stars">${"⭐".repeat(r.stars)}</div>
          <p>${r.comment}</p>
        </div>
      `;
    });

    if (storedUserReview) {
      reviewsList.innerHTML += `
        <div class="review-card user-review">
          <h4>${storedUserReview.name}</h4>
          <div class="stars">${"⭐".repeat(storedUserReview.stars)}</div>
          <p>${storedUserReview.comment}</p>
        </div>
      `;
    }
  }

  renderReviews();

  if (currentUser && !storedUserReview && addReviewSection) {
    addReviewSection.classList.remove("hidden");
  }

  if (submitReviewBtn) {
    submitReviewBtn.addEventListener("click", () => {
      const stars = parseInt(document.getElementById("reviewStars").value);
      const comment = document.getElementById("reviewComment").value.trim();
      if (!comment) return alert("Please write a comment!");

      const newReview = {
        name: currentUser.name,
        email: currentUser.email,
        stars,
        comment
      };

      localStorage.setItem("userReview", JSON.stringify(newReview));
      alert("Review submitted!");
      location.reload();
    });
  }
})();


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
      chatWidget.classList.remove("hidden");
      chatToggle.classList.add("hidden");
    });
  }

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatWidget.classList.add("hidden");
      chatToggle.classList.remove("hidden");
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

// Mengambil semua section dan link navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Offset agar ganti aktifnya pas
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Jika posisi scroll sedang berada di dalam area section ini
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                // Hapus class active dari semua link
                links.classList.remove('active');
                
                // Tambahkan class active hanya ke link yang sesuai dengan ID section
                // Pastikan link tersebut mengarah ke ID (#home, #review, dll)
                let activeLink = document.querySelector('header .navbar a[href="#' + id + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });
};

// ----------------------------------------------------
// 1. SCROLL REVEAL
// ----------------------------------------------------
(function () {
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
})(); 


// ----------------------------------------------------
// 2. TYPING TEXT EFFECT
// ----------------------------------------------------
(function () {
  const textSpan = document.querySelector(".typing-text");
  if (!textSpan) return;

  const words = ["Meals Recommendation", "AI Workouts", "Healthy Lifestyle", "Dream Physique"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);

    textSpan.textContent = currentChars;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(typeEffect, 1200);
    }
  };

  typeEffect();
})();

// ----------------------------------------------------
// 3. FAQ ACCORDION
// ----------------------------------------------------
(function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      
      // Close other active answers
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
          otherQuestion.classList.remove('active');
          otherQuestion.nextElementSibling.classList.remove('active');
          otherQuestion.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle the clicked answer
      question.classList.toggle("active");
      answer.classList.toggle("active");

      if (answer.classList.contains("active")) {
        // Set max-height to the actual content height for a smooth animation
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
})();