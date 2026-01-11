import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Exponential Backoff Constants ---
const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 1000; // 1 second
// -----------------------------------

// Helper function for waiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Menggunakan v1 API yang stabil
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY, {
  apiVersion: "v1"
});

// GANTI di sini: Menggunakan "gemini-2.5-flash" untuk batas kuota Free Tier yang lebih longgar (60 RPM).
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash" 
});

app.post("/chat", async (req, res) => {
  try {
    const { message, userData } = req.body;

    // Pastikan userData tidak null dan berisi semua field
    const name = userData?.name || 'User';
    const age = userData?.age || 'unknown';
    const gender = userData?.gender || 'unknown';
    const weight = userData?.weight || 'unknown';
    const height = userData?.height || 'unknown';
    const goals = userData?.goals || 'no specific goal';
    const meals = userData?.meals || 'not provided';
    const schedule = JSON.stringify(userData?.schedule || {});

    const systemPrompt = `
      You are a professional gym & nutrition coach AI.
      Use the following user data to provide personalized advice:
      - Name: ${name}
      - Age: ${age}
      - Gender: ${gender}
      - Weight: ${weight} kg
      - Height: ${height} cm
      - Goals: ${goals}
      - Favorite Meals: ${meals}
      - Weekly Schedule: ${schedule}

      Give clear, practical recommendations about workouts, diets, and routines.
      Be concise but helpful, like a personal coach.
      Use the same language as the user's message (e.g., if the user writes in Indonesian, respond in Indonesian).
    `;

    // --- Retry Logic Implementation ---
    let result;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(`Attempting to generate content (Attempt ${attempt}/${MAX_RETRIES})...`);
            // Untuk menghindari log yang terlalu banyak, kita hanya log jika gagal atau sukses final
            if (attempt > 1) {
              await delay(INITIAL_DELAY_MS * Math.pow(2, attempt - 2)); // Adjusted backoff delay
            }
            
            result = await model.generateContent([systemPrompt, message]);
            // Jika berhasil, keluar dari loop
            break; 
        } catch (error) {
            // Kita hanya melakukan retry pada error sementara (503)
            if (error.status === 429) {
                console.error(`🔴 Quota Exceeded (429). Stopping retries. Check your API key usage.`);
                throw error;
            }
            
            // Jika ini adalah percobaan terakhir, lemparkan error untuk ditangkap oleh blok catch di luar
            if (attempt === MAX_RETRIES) {
                console.error(`🔴 All ${MAX_RETRIES} attempts failed.`);
                throw error;
            }

            // Hanya log warning untuk error non-429 transient (seperti 503)
            const delayTime = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
            console.warn(`⚠️ Attempt ${attempt} failed (Transient Error: ${error.status}). Retrying in ${delayTime}ms...`);
            
            // Tunggu delay yang telah dihitung
            await delay(delayTime);
        }
    }
    // --- End Retry Logic ---

    // Tambahkan pengecekan result. Jika result null, artinya semua retry gagal
    if (!result) {
        throw new Error("Failed to get response after all retries.");
    }
    
    console.log("✅ Gemini replied:", result.response?.text());

    const replyText = result.response?.text() || "Maaf, AI tidak merespon.";
    res.json({ reply: replyText });

  } catch (error) {
    console.error("🔴 Chat error:", error);
    // Beri pesan error yang lebih informatif ke klien
    res.status(500).json({ 
        error: "Server error or API quota limit reached.",
        details: error.message 
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});