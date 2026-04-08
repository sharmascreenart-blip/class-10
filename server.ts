import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini AI Setup
  const getAi = () => {
    // In production, we MUST use the environment variable for security.
    // Set GEMINI_API_KEY in your deployment platform's dashboard (Vercel/Netlify/Render).
    const apiKey = process.env.GEMINI_API_KEY?.replace(/['"\s]/g, '');
    
    if (!apiKey) {
      // Fallback for local development if .env is not set
      const fallbackKey = "AIzaSyBO22QDV4lWW3qtivA2vXBXVcqFZxQgN9Y";
      console.log("Using fallback API Key. Make sure to set GEMINI_API_KEY in production!");
      return new GoogleGenerativeAI(fallbackKey);
    }

    return new GoogleGenerativeAI(apiKey);
  };

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      console.log("Chat request received:", message?.substring(0, 50));
      const genAI = getAi();
      // Using gemini-3-flash-preview as it has active quota on this key
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `You are a helpful Class 10 CBSE study assistant. 
      A student asks: "${message}". 
      Explain in simple Hinglish (mix of Hindi and English). 
      Keep the answer short, clear, and focused on Class 10 level. 
      Use examples if needed.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log("AI Response success");
      res.json({ text });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      if (error.message?.includes("429") || error.message?.includes("quota")) {
        return res.status(429).json({ 
          error: "AI Quota Exceeded. Please try again in a few minutes or use a different API key." 
        });
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  app.post("/api/generate-notes", async (req, res) => {
    try {
      const { topic } = req.body;
      const genAI = getAi();
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `Generate detailed study notes for Class 10 CBSE student on the topic: "${topic}". 
      Include:
      1. Short Summary
      2. Key Definitions
      3. Important Points (Bullet points)
      4. Important Formulas (if applicable)
      5. 3-5 Important Questions for Exams
      Format the output in clean Markdown.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      res.json({ text: response.text() });
    } catch (error: any) {
      console.error("Notes API Error:", error);
      if (error.message?.includes("429") || error.message?.includes("quota")) {
        return res.status(429).json({ 
          error: "AI Quota Exceeded. Please try again later." 
        });
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
