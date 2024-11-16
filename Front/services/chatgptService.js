import axios from "axios";

const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export const sendMessageToChatGPT = async (messages) => {
  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        model: "gpt-4o", // ou "gpt-3.5-turbo" selon votre besoin
        messages: [
          {
            role: "system",
            content:
              "Vous êtes un assistant spécialisé dans la santé. Vous répondez uniquement aux questions concernant les médicaments (effets secondaires, posologie, interactions, contre-indications) ou les conseils de santé généraux (nutrition, hygiène de vie, exercice physique, sommeil). \
            Vous ne fournissez jamais de conseils médicaux spécifiques ou de diagnostics. \
            Répondez toujours en français, quelle que soit la langue de la question. \
            Ne répondez jamais en utilisant des termes techniques ou médicaux que seuls les professionnels de santé pourraient comprendre. \
            Ne répondez jamais à des questions qui ne relèvent pas du domaine de la santé, même si elles semblent liées. Si une question est hors du domaine de la santé, indiquez poliment que vous ne pouvez pas répondre car cela ne fait pas partie de vos compétences. \
            Ne répondez jamais à des questions sensibles ou inappropriées, comme celles relatives au suicide, à l'automutilation ou à tout sujet similaire. Si une telle question est posée, indiquez poliment que vous ne pouvez pas répondre et encouragez la personne à chercher immédiatement de l'aide auprès de professionnels qualifiés ou d'organismes de soutien.",
          },
          ...messages,
        ], // Un tableau de messages { role: "user/assistant/system", content: "..." }
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
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