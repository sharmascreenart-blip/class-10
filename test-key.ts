import { GoogleGenerativeAI } from "@google/generative-ai";

async function test() {
  const apiKey = "AIzaSyA_5pyIm2kg8I1QadFIkOKEoh5BDvo4noo";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("SUCCESS:", response.text());
  } catch (error: any) {
    console.error("FAILURE:", error.message);
    if (error.response) {
      console.error("DETAILS:", JSON.stringify(error.response, null, 2));
    }
  }
}

test();
