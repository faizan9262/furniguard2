import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getMeaningOfLife(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [{ role: "user", content: message }],
    });

    return completion.choices[0].message?.content || "No response.";
  } catch (error) {
    console.error(error);
  }
}

export default openai;