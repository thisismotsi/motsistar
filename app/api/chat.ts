import type { NextApiRequest, NextApiResponse } from "next";

interface ChatRequestBody {
  message?: string;
}

interface OpenRouterResponse {
  choices?: {
    message?: { content?: string };
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ reply?: string; error?: string }>
) {
  const { message }: ChatRequestBody = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided." });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY ?? ""}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // update with your production domain
          "X-Title": "MOTSISTAR Chatbot Widget",
        },
        body: JSON.stringify({
          model: "mistral/mistral-7b-instruct",
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(response.status)
        .json({ error: errorText || "API request failed." });
    }

    const data: OpenRouterResponse = await response.json();
    const reply =
      data.choices?.[0]?.message?.content || "No response from model.";

    res.status(200).json({ reply });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred.";
    res.status(500).json({ error: message });
  }
}
