from app.config import settings


class AnalysisPipeline:
    """
    Analyse a single article for reputation signals about a named subject.

    You have full freedom in how you implement this — a single LLM call,
    multiple calls, chained prompts, whatever you think works best.

    The article dict passed to analyse() has these fields:
        id, subject_name, subject_type, title, source, author,
        published_date, url, content

    Your analyse() method must return a dict that the frontend can render.
    At minimum include:
        - sentiment: overall label + numeric score
        - themes: list of topics in the article
        - reputation_signals: what's positive, negative, neutral about the subject
        - reasoning: a short explanation of your assessment

    You decide the exact shape — just make sure your frontend can consume it.
    """

    def __init__(self):
        # TODO: initialise the OpenAI client using settings.openai_api_key
        # Hint: from openai import AsyncOpenAI
        raise NotImplementedError

    async def analyse(self, article: dict) -> dict:
        # TODO: implement analysis
        #
        # 1. Build a prompt using article["content"], article["subject_name"],
        #    and article["subject_type"]
        # 2. Call OpenAI — settings.openai_model is pre-configured ("gpt-4o-mini")
        # 3. Parse the response and return a dict
        #
        # Tip: use response_format={"type": "json_object"} to get structured output
        raise NotImplementedError
