
import { GoogleGenAI, Type } from "@google/genai";
import { RecommendedGame } from "../types";

// Fixed: Initializing GoogleGenAI using strictly process.env.API_KEY as per the rules.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGameRecommendations(prompt: string): Promise<RecommendedGame[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User wants Roblox game suggestions based on this request: "${prompt}". Suggest 4 real or highly thematic game types found on Roblox.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              reason: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["name", "reason", "category"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
