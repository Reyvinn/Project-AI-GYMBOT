// ---------- SAMPLE MEALS DATA WITH FULL INGREDIENTS, MACROS, AND STEPS (BASE WEIGHT 70 KG) ----------
// Data ini LENGKAP dan TIDAK akan di-scale
const mealsData = [
  { 
    name: "Grilled Chicken Salad", 
    type: "diet", 
    img: "images/chickensalad.jpg", 
    desc: "Ingredients: Chicken breast (150g), Lettuce (50g), Cucumber (40g), Olive oil (10g)",
    ingredients: [
      { item: "Chicken breast", qty: 150, unit: "g" },
      { item: "Lettuce", qty: 50, unit: "g" },
      { item: "Cucumber", qty: 40, unit: "g" },
      { item: "Olive oil", qty: 10, unit: "g" }
    ],
    calories: 330, protein: 45, carbs: 5, fat: 15,
    steps: [
      "Preheat the oven or grill. Season chicken breast with olive oil, salt, and pepper.",
      "Grill the chicken breast until fully cooked (about 6-8 minutes per side). Slice into pieces.",
      "Combine lettuce, cucumber, and sliced chicken in a bowl.",
      "Add the remaining olive oil as dressing. Mix well and serve immediately."
    ]
  },
  { 
    name: "Oatmeal with Berries", 
    type: "diet", 
    img: "images/outmealberry.jpg", 
    desc: "Ingredients: Oats (60g), Blueberries (50g), Strawberries (50g), Almond milk (150ml)",
    ingredients: [
      { item: "Oats", qty: 60, unit: "g" },
      { item: "Blueberries", qty: 50, unit: "g" },
      { item: "Strawberries", qty: 50, unit: "g" },
      { item: "Almond milk", qty: 150, unit: "ml" }
    ],
    calories: 320, protein: 12, carbs: 50, fat: 8,
    steps: [
      "Cook the oats with almond milk over medium heat until thickened (about 5 minutes).",
      "Pour the oatmeal into a bowl.",
      "Sprinkle fresh blueberries and strawberries on top.",
      "Serve warm. (Optional: Add a little natural sweetener if desired)."
    ]
  },
  { 
    name: "Smoothie Bowl", 
    type: "diet", 
    img: "images/smoothiebowl.jpg", 
    desc: "Ingredients: Banana (100g), Mango (80g), Spinach (30g), Almond butter (15g)",
    ingredients: [
      { item: "Banana", qty: 100, unit: "g" },
      { item: "Mango", qty: 80, unit: "g" },
      { item: "Spinach", qty: 30, unit: "g" },
      { item: "Almond butter", qty: 15, unit: "g" }
    ],
    calories: 350, protein: 10, carbs: 55, fat: 12,
    steps: [
      "Freeze the banana and mango overnight (if not frozen, use ice cubes).",
      "Blend the frozen banana, frozen mango, spinach, and almond butter until very thick.",
      "Pour into a bowl.",
      "Add favorite toppings (e.g., granola, chia seeds) and eat with a spoon."
    ]
  },
  { 
    name: "Quinoa and Veggie Bowl", 
    type: "diet", 
    img: "images/quinoa.jpg", 
    desc: "Ingredients: Quinoa (80g), Black beans (50g), Bell peppers (40g), Corn (30g)",
    ingredients: [
      { item: "Quinoa", qty: 80, unit: "g" },
      { item: "Black beans", qty: 50, unit: "g" },
      { item: "Bell peppers", qty: 40, unit: "g" },
      { item: "Corn", qty: 30, unit: "g" }
    ],
    calories: 380, protein: 18, carbs: 60, fat: 10,
    steps: [
      "Cook quinoa according to package directions (usually 1 part quinoa to 2 parts water).",
      "Mix the cooked quinoa with black beans, bell peppers, and corn.",
      "Add a little lime juice, salt, and pepper.",
      "Stir well and serve warm or cold."
    ]
  },
  { 
    name: "Turkey Breast Wrap", 
    type: "diet", 
    img: "images/turkey.jpg", 
    desc: "Ingredients: Whole wheat tortilla (1 pc), Turkey breast slices (80g), Spinach (30g), Mustard (5g)",
    ingredients: [
      { item: "Whole wheat tortilla", qty: 1, unit: "pc" },
      { item: "Turkey breast slices", qty: 80, unit: "g" },
      { item: "Spinach", qty: 30, unit: "g" },
      { item: "Mustard", qty: 5, unit: "g" }
    ],
    calories: 290, protein: 30, carbs: 30, fat: 5,
    steps: [
      "Spread the whole wheat tortilla evenly with mustard.",
      "Place spinach leaves on top.",
      "Arrange the turkey breast slices over the spinach.",
      "Roll the tortilla tightly. Cut in half and serve."
    ]
  },
  { 
    name: "Baked Cod with Lemon", 
    type: "diet", 
    img: "images/bakedcod.jpg", 
    desc: "Ingredients: Cod fillet (150g), Lemon slices, Green beans (70g), Asparagus (50g)",
    ingredients: [
      { item: "Cod fillet", qty: 150, unit: "g" },
      { item: "Lemon slices", qty: 2, unit: "slices" },
      { item: "Green beans", qty: 70, unit: "g" },
      { item: "Asparagus", qty: 50, unit: "g" }
    ],
    calories: 250, protein: 40, carbs: 10, fat: 5,
    steps: [
      "Preheat oven to 200°C. Prepare a baking sheet with parchment paper.",
      "Place the cod fillet on the baking sheet. Sprinkle with salt and pepper. Arrange lemon slices on top.",
      "Place green beans and asparagus around the fish.",
      "Bake for 12-15 minutes or until the fish is cooked and flakes easily."
    ]
  },
  
  { 
    name: "Steak with Veggies", 
    type: "bulk", 
    img: "images/steak.jpg", 
    desc: "Ingredients: Beef steak (200g), Broccoli (70g), Carrots (50g), Olive oil (10g)",
    ingredients: [
      { item: "Beef steak", qty: 200, unit: "g" },
      { item: "Broccoli", qty: 70, unit: "g" },
      { item: "Carrots", qty: 50, unit: "g" },
      { item: "Olive oil", qty: 10, unit: "g" }
    ],
    calories: 550, protein: 50, carbs: 20, fat: 30,
    steps: [
      "Season the steak with olive oil, salt, and pepper. Let it rest for 10 minutes.",
      "Heat a pan over high heat. Cook the steak according to your desired doneness.",
      "Meanwhile, boil or steam the broccoli and carrots until tender.",
      "Slice the steak and serve with the steamed vegetables."
    ]
  },
  { 
    name: "Salmon with Rice", 
    type: "diet", 
    img: "images/salmon.jpg", 
    desc: "Ingredients: Salmon fillet (150g), White rice (120g), Asparagus (60g), Lemon (10g)",
    ingredients: [
      { item: "Salmon fillet", qty: 150, unit: "g" },
      { item: "White rice", qty: 120, unit: "g" },
      { item: "Asparagus", qty: 60, unit: "g" },
      { item: "Lemon", qty: 10, unit: "g" }
    ],
    calories: 450, protein: 35, carbs: 40, fat: 20,
    steps: [
      "Grill or pan-sear the salmon until cooked. Squeeze lemon juice over it.",
      "Cook the white rice until perfectly done.",
      "Roast the asparagus with a little salt and olive oil.",
      "Serve the salmon, rice, and asparagus on one plate."
    ]
  },
  { 
    name: "Egg Omelette", 
    type: "protein", 
    img: "images/egg.jpg", 
    desc: "Ingredients: Eggs (3x 60g), Spinach (40g), Onion (30g), Olive oil (5g)",
    ingredients: [
      { item: "Eggs", qty: 3, unit: "x 60g" },
      { item: "Spinach", qty: 40, unit: "g" },
      { item: "Onion", qty: 30, unit: "g" },
      { item: "Olive oil", qty: 5, unit: "g" }
    ],
    calories: 310, protein: 25, carbs: 10, fat: 20,
    steps: [
      "Whisk the eggs with salt and pepper.",
      "Sauté spinach and onion with olive oil until wilted.",
      "Pour the whisked eggs over the vegetables. Cook over low heat until the bottom is set.",
      "Fold the omelette in half. Serve warm."
    ]
  },
  { 
    name: "Greek Yogurt Bowl", 
    type: "diet", 
    img: "images/greek.jpg", 
    desc: "Ingredients: Greek Yogurt (150g), Granola (30g), Honey (5g), Chia seeds (5g)",
    ingredients: [
      { item: "Greek Yogurt", qty: 150, unit: "g" },
      { item: "Granola", qty: 30, unit: "g" },
      { item: "Honey", qty: 5, unit: "g" },
      { item: "Chia seeds", qty: 5, unit: "g" }
    ],
    calories: 270, protein: 18, carbs: 35, fat: 8,
    steps: [
      "Pour Greek yogurt into a bowl.",
      "Sprinkle granola and chia seeds on top.",
      "Drizzle a little honey over it.",
      "Enjoy immediately as a breakfast or snack."
    ]
  },
  { 
    name: "Tuna Sandwich", 
    type: "diet", 
    img: "images/tuna.jpg", 
    desc: "Ingredients: Whole grain bread (2 slices), Tuna (80g), Lettuce (50g), Low-fat mayo (5g)",
    ingredients: [
      { item: "Whole grain bread", qty: 2, unit: "slices" },
      { item: "Tuna", qty: 80, unit: "g" },
      { item: "Lettuce", qty: 50, unit: "g" },
      { item: "Low-fat mayo", qty: 5, unit: "g" }
    ],
    calories: 340, protein: 30, carbs: 35, fat: 8,
    steps: [
      "Mix canned tuna with low-fat mayonnaise.",
      "Spread one slice of whole grain bread with the tuna mixture.",
      "Add lettuce leaves on top.",
      "Cover with the other slice of whole grain bread. Cut diagonally and serve."
    ]
  },
  { 
    name: "Lentil Soup", 
    type: "diet", 
    img: "images/lentil.jpg", 
    desc: "Ingredients: Lentils (100g), Carrots (50g), Celery (50g), Vegetable broth (200ml)",
    ingredients: [
      { item: "Lentils", qty: 100, unit: "g" },
      { item: "Carrots", qty: 50, unit: "g" },
      { item: "Celery", qty: 50, unit: "g" },
      { item: "Vegetable broth", qty: 200, unit: "ml" }
    ],
    calories: 360, protein: 25, carbs: 60, fat: 5,
    steps: [
      "Sauté the chopped carrots and celery until softened.",
      "Add the lentils and vegetable broth. Bring to a boil.",
      "Reduce the heat and cook until the lentils are tender (about 20-30 minutes).",
      "Season with salt, pepper, and other spices to taste. Serve warm."
    ]
  },
  { 
    name: "Chicken and Rice", 
    type: "bulk", 
    img: "images/chickenrice.jpg", 
    desc: "Ingredients: Chicken thigh (200g), White rice (200g), Soy sauce (10ml)",
    ingredients: [
      { item: "Chicken thigh", qty: 200, unit: "g" },
      { item: "White rice", qty: 200, unit: "g" },
      { item: "Soy sauce", qty: 10, unit: "ml" }
    ],
    calories: 700, protein: 55, carbs: 80, fat: 20,
    steps: [
      "Cook the white rice until done.",
      "Sauté or grill the chicken thigh with a little oil. Add soy sauce when almost cooked.",
      "Cut the chicken into pieces.",
      "Serve the chicken with rice. (Optional: add steamed vegetables)."
    ]
  },
  { 
    name: "Protein Shake", 
    type: "protein", 
    img: "images/protein.jpg", 
    desc: "Ingredients: Whey protein (30g), Milk (300ml), Banana (50g)",
    ingredients: [
      { item: "Whey protein powder", qty: 30, unit: "g" },
      { item: "Milk", qty: 300, unit: "ml" },
      { item: "Banana", qty: 50, unit: "g" }
    ],
    calories: 250, protein: 35, carbs: 20, fat: 5,
    steps: [
      "Put the whey protein powder, milk, and banana into a blender.",
      "Blend until all ingredients are well combined and smooth.",
      "Pour into a glass and drink immediately after working out."
    ]
  },
  { 
    name: "Avocado Toast", 
    type: "diet", 
    img: "images/avocado.jpg", 
    desc: "Ingredients: Whole grain bread (2 slices), Avocado (80g), Cherry tomatoes (50g), Olive oil (5g)",
    ingredients: [
      { item: "Whole grain bread", qty: 2, unit: "slices" },
      { item: "Avocado", qty: 80, unit: "g" },
      { item: "Cherry tomatoes", qty: 50, unit: "g" },
      { item: "Olive oil", qty: 5, unit: "g" }
    ],
    calories: 360, protein: 10, carbs: 40, fat: 20,
    steps: [
      "Toast the whole grain bread.",
      "Mash the avocado and spread it on the toast. Add a little salt and pepper.",
      "Arranging the sliced cherry tomatoes on top of the avocado.",
      "Drizzle a little olive oil over it and serve."
    ]
  },
  { 
    name: "Beef Burger Patty", 
    type: "protein", 
    img: "images/beef.jpg", 
    desc: "Ingredients: Lean ground beef (150g), Whole wheat bun, Lettuce, Tomato",
    ingredients: [
      { item: "Lean ground beef", qty: 150, unit: "g" },
      { item: "Whole wheat bun", qty: 1, unit: "pc" },
      { item: "Lettuce", qty: 30, unit: "g" },
      { item: "Tomato", qty: 30, unit: "g" }
    ],
    calories: 420, protein: 40, carbs: 30, fat: 15,
    steps: [
      "Form the ground beef into a patty. Sprinkle with salt and pepper.",
      "Grill or pan-sear the patty until perfectly cooked.",
      "Lightly toast the bun.",
      "Assemble the patty in the bun, add lettuce and tomato."
    ]
  },
  { 
    name: "Pasta with Meatballs", 
    type: "bulk", 
    img: "images/pasta.jpg", 
    desc: "Ingredients: Spaghetti (150g), Beef meatballs (100g), Tomato sauce",
    ingredients: [
      { item: "Spaghetti", qty: 150, unit: "g" },
      { item: "Beef meatballs", qty: 100, unit: "g" },
      { item: "Tomato sauce", qty: 100, unit: "ml" }
    ],
    calories: 650, protein: 35, carbs: 80, fat: 20,
    steps: [
      "Cook spaghetti according to package directions until al dente.",
      "Heat the pre-made beef meatballs in tomato sauce.",
      "Mix the drained spaghetti with the sauce and meatballs.",
      "Serve warm. (Optional: Sprinkle with parmesan cheese)."
    ]
  },
  
  { 
    name: "Cottage Cheese Pancakes", 
    type: "protein", 
    img: "images/cottage.jpg", 
    desc: "Ingredients: Cottage cheese (100g), Eggs (2x 60g), Oats flour (30g), Cinnamon",
    ingredients: [
      { item: "Cottage cheese", qty: 100, unit: "g" },
      { item: "Eggs", qty: 2, unit: "x 60g" },
      { item: "Oats flour", qty: 30, unit: "g" },
      { item: "Cinnamon", qty: 1, unit: "tsp" }
    ],
    calories: 300, protein: 28, carbs: 30, fat: 8,
    steps: [
      "Mix cottage cheese, eggs, oat flour, and cinnamon until well combined.",
      "Heat a little oil or butter in a non-stick pan.",
      "Pour small portions of batter onto the pan. Cook until bubbles appear.",
      "Flip and cook until done. Serve with fruits."
    ]
  },
  { 
    name: "Shrimp Stir-fry", 
    type: "protein", 
    img: "images/shrimp.jpg", 
    desc: "Ingredients: Shrimp (150g), Soy sauce, Broccoli (50g), Brown rice (80g)",
    ingredients: [
      { item: "Shrimp", qty: 150, unit: "g" },
      { item: "Soy sauce", qty: 10, unit: "ml" },
      { item: "Broccoli", qty: 50, unit: "g" },
      { item: "Brown rice", qty: 80, unit: "g" }
    ],
    calories: 320, protein: 38, carbs: 30, fat: 5,
    steps: [
      "Cook brown rice until done.",
      "Stir-fry shrimp until they change color. Remove and set aside.",
      "Stir-fry broccoli with a little oil.",
      "Return the shrimp, add soy sauce. Stir quickly. Serve with brown rice."
    ]
  },
  { 
    name: "Tofu Scramble", 
    type: "protein", 
    img: "images/tofuscramble.jpg", 
    desc: "Ingredients: Firm Tofu (150g), Turmeric, Nutritional yeast, Bell peppers (40g)",
    ingredients: [
      { item: "Firm Tofu", qty: 150, unit: "g" },
      { item: "Turmeric", qty: 1, unit: "tsp" },
      { item: "Nutritional yeast", qty: 5, unit: "g" },
      { item: "Bell peppers", qty: 40, unit: "g" }
    ],
    calories: 220, protein: 20, carbs: 10, fat: 12,
    steps: [
      "Crumble the firm tofu with a fork.",
      "Sauté the bell peppers. Add the crumbled tofu, turmeric, and nutritional yeast.",
      "Cook while stirring until the tofu is hot and the seasoning is evenly distributed.",
      "Add salt and pepper. Serve as a vegan alternative to scrambled eggs."
    ]
  },
  
  { 
    name: "Sweet Potato & Beef Hash", 
    type: "bulk", 
    img: "images/sweetpotato.jpg", 
    desc: "Ingredients: Lean ground beef (180g), Sweet potato (150g), Onion, Olive oil (15g)",
    ingredients: [
      { item: "Lean ground beef", qty: 180, unit: "g" },
      { item: "Sweet potato", qty: 150, unit: "g" },
      { item: "Onion", qty: 50, unit: "g" },
      { item: "Olive oil", qty: 15, unit: "g" }
    ],
    calories: 680, protein: 50, carbs: 60, fat: 30,
    steps: [
      "Dice the sweet potato and onion.",
      "Sauté the sweet potato and onion with olive oil until the potato is almost tender.",
      "Add the lean ground beef. Cook until the meat is browned.",
      "Season with salt and pepper. Stir well and serve warm."
    ]
  },
  { 
    name: "Mass Gainer Shake", 
    type: "bulk", 
    img: "images/mass.jpg", 
    desc: "Ingredients: Mass gainer powder (100g), Whole milk (400ml), Peanut butter (20g), Banana (100g)",
    ingredients: [
      { item: "Mass gainer powder", qty: 100, unit: "g" },
      { item: "Whole milk", qty: 400, unit: "ml" },
      { item: "Peanut butter", qty: 20, unit: "g" },
      { item: "Banana", qty: 100, unit: "g" }
    ],
    calories: 900, protein: 55, carbs: 110, fat: 30,
    steps: [
      "Place all ingredients (mass gainer powder, milk, peanut butter, and banana) into a blender.",
      "Blend until the mixture is very smooth and lump-free.",
      "Pour into a glass. Drink immediately to boost calories and protein after exercise."
    ]
  },
  { 
    name: "Pork Chops & Mashed Potato", 
    type: "bulk", 
    img: "images/pork.jpg", 
    desc: "Ingredients: Pork chops (200g), Mashed potatoes (180g), Butter (10g), Gravy",
    ingredients: [
      { item: "Pork chops", qty: 200, unit: "g" },
      { item: "Potatoes (for mashing)", qty: 180, unit: "g" },
      { item: "Butter", qty: 10, unit: "g" },
      { item: "Gravy", qty: 50, unit: "ml" }
    ],
    calories: 750, protein: 50, carbs: 60, fat: 40,
    steps: [
      "Pan-sear or grill the pork chops until perfectly cooked.",
      "Boil potatoes until tender, then mash them with butter, salt, and milk (optional).",
      "Serve the pork chops with mashed potatoes and a drizzle of gravy."
    ]
  },
];

const defaultMealCount = 10; 
const BASE_WEIGHT_KG = 70; // Tetap menggunakan 70 kg sebagai porsi dasar


// ---------- FUNGSI UNTUK MENAMPILKAN MODAL RESEP BARU (Hanya menampilkan data 70kg) ----------
function showRecipeModal(meal) {
    const modal = document.getElementById('recipe-modal');
    if (!modal) return;
    
    // TIDAK ADA LOGIKA SCALING DI SINI. Kita ambil langsung dari data 'meal'.
    
    // --- 1. ISI MAKRO (SISI KANAN ATAS) ---
    // PENTING: Menggunakan <strong> untuk menggantikan ** agar tidak muncul dd.
    const macroHTML = `
        <h4>Information :</h4>
        <ul>
            <li><strong>Calories:</strong> ${meal.calories} Kcal</li>
            <li><strong>Protein:</strong> ${meal.protein} g</li>
            <li><strong>Carbs:</strong> ${meal.carbs} g</li>
            <li><strong>Fat:</strong> ${meal.fat} g</li>
        </ul>
    `;
    document.getElementById('modal-macros').innerHTML = macroHTML;

    
    // --- 2. ISI INSTRUCTIONS (SISI KANAN BAWAH) ---
    const stepsHTML = `
        <h3>Instructions:</h3>
        ${meal.steps.map((step, index) => `
            <div class="step-item">
                <div class="step-number">${index + 1}</div>
                <p>${step}</p>
            </div>
        `).join('')}
    `;
    document.getElementById('modal-steps').innerHTML = stepsHTML;

    
    // --- 3. ISI INGREDIENTS (SISI KIRI BAWAH) ---
    const ingredientsHTML = `
        <h3>Ingredients</h3>
        <ul>
            ${meal.ingredients.map(item => `
                <li>${item.item}: <strong>${item.qty}${item.unit}</strong></li>
            `).join('')}
        </ul>
    `;
    document.getElementById('modal-ingredients').innerHTML = ingredientsHTML;
    
    
    // --- 4. ISI DETAIL LAIN ---
    document.getElementById('modal-title').textContent = meal.name;
    document.getElementById('modal-image').src = meal.img;
    document.getElementById('modal-image').alt = meal.name;
    
    modal.style.display = 'flex';
}

// Event listener untuk tombol close modal
document.getElementById('close-modal')?.addEventListener('click', () => {
    document.getElementById('recipe-modal').style.display = 'none';
});

// Tutup modal jika klik di luar area modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('recipe-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// ---------- RENDER MEALS (DIPERBARUI UNTUK CLICK LISTENER) ----------
function renderMeals(meals) {
  const container = document.getElementById("meals-container");
  if (!container) return;

  if (meals.length === 0) {
     container.innerHTML = `<p style="font-size: 2rem; color: #ff6347; margin-top: 5rem;">❌ No meals found for this category. Please select another type!</p>`;
     return;
  }
  
  container.innerHTML = meals.map(meal => `
    <div class="meal-card" data-meal-name="${meal.name}">
      <img src="${meal.img}" alt="${meal.name}">
      <h4>${meal.name}</h4>
      <p><strong>Type: ${meal.type.toUpperCase()}</strong></p>
      <p class="meal-desc">Cals: ${meal.calories} | Protein: ${meal.protein}g</p> 
    </div>
  `).join("");
  
  // Tambahkan event listener ke setiap card setelah di-render
  document.querySelectorAll('.meal-card').forEach(card => {
        card.addEventListener('click', () => {
            const mealName = card.getAttribute('data-meal-name');
            // Cari data resep lengkap
            const meal = mealsData.find(m => m.name === mealName);
            if (meal) {
                showRecipeModal(meal);
            }
        });
    });
}


// ---------- RANDOM PICK FUNCTION ----------
function getRandomMeals(arr, count) {
  if (arr.length === 0) return [];
  
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(arr.length, count));
}


// ---------- INISIALISASI PADA SAAT LOAD ----------
if (document.getElementById("meals-container")) {
  renderMeals(getRandomMeals(mealsData, defaultMealCount));
}


// ---------- SEARCH FUNCTION ----------
if (document.getElementById("searchBtn")) {
  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("mealSearch").value.toLowerCase().trim();

    if (query === "all") {
        renderMeals(getRandomMeals(mealsData, defaultMealCount));
        return;
    }
    
    const results = mealsData.filter(meal => meal.type.toLowerCase() === query);
    renderMeals(getRandomMeals(results, 5)); 
  });
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