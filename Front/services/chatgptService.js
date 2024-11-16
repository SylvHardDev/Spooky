import { OPENAI_API_KEY } from "@env";
import axios from "axios";

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
          Authorization: `Bearer ${OPENAI_API_KEY}`,
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
