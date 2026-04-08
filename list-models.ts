import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const apiKey = "AIzaSyA_5pyIm2kg8I1QadFIkOKEoh5BDvo4noo";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // There isn't a direct listModels in the simple SDK, but we can try a different model name
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const m of models) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        const result = await model.generateContent("Hi");
        console.log(`Model ${m} works!`);
        return;
      } catch (e: any) {
        console.log(`Model ${m} failed: ${e.message}`);
      }
    }
  } catch (error: any) {
    console.error("General failure:", error.message);
  }
}

listModels();
