import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
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