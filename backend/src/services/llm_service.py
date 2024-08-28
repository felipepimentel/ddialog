import httpx
import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

async def get_llm_response(message: str, context: str) -> str:
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": f"You are an AI assistant. Use the following context to answer the user's question: {context}"},
            {"role": "user", "content": message}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(OPENROUTER_URL, json=data, headers=headers)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]