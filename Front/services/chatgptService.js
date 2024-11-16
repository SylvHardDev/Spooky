// import { OPENAI_API_KEY } from "@env";
import axios from "axios";
const apiKey =
  "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";
const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

export const sendMessageToChatGPT = async (messages) => {
  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        model: "gpt-4o",
        messages: messages, // Un tableau de messages { role: "user/assistant/system", content: "..." }
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error calling ChatGPT API:",
      error.response?.data || error.message
    );
    throw error;
  }
};
