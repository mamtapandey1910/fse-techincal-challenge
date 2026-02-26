import asyncio

from fastapi import HTTPException
from openai import (
    AsyncOpenAI,
    APIConnectionError,
    APITimeoutError,
    AuthenticationError,
    BadRequestError,
    RateLimitError,
)

from pydantic import ValidationError

from app.models.responses import CoreAnalysisResponse
from app.config.config import settings

_client = AsyncOpenAI(api_key=settings.openai_api_key)

_RETRYABLE = (RateLimitError, APIConnectionError, APITimeoutError)
_MAX_RETRIES = 3
_BASE_DELAY = 1.0


async def analyse_with_retry(article: dict) -> CoreAnalysisResponse:
    """Call the OpenAI structured-output endpoint with exponential-backoff retries."""
    for attempt in range(1, _MAX_RETRIES + 1):
        try:
            resp = await _client.responses.parse(
                model=settings.openai_model,
                input=[
                    {
                        "role": "system",
                        "content": (
                            "You are an expert reputation analyst engine. "
                            "Given an article, produce a JSON object that exactly "
                            "matches the CoreAnalysisResponse schema."
                        ),
                    },
                    {
                        "role": "user",
                        "content": f"Produce the JSON now for the article {article}",
                    },
                ],
                temperature=0.1,
                text_format=CoreAnalysisResponse,
            )
            parsed = resp.output_parsed
            if parsed is None:
                raise HTTPException(status_code=500, detail="OpenAI returned an empty response.")
            try:
                return CoreAnalysisResponse.model_validate(parsed.model_dump(), strict=True)
            except ValidationError as exc:
                raise HTTPException(status_code=500, detail=f"OpenAI response failed schema validation: {exc.errors()}")

        except AuthenticationError:
            raise HTTPException(status_code=500, detail="Invalid OpenAI API key — check your configuration.")

        except BadRequestError as exc:
            raise HTTPException(status_code=422, detail=f"OpenAI rejected the request: {exc.message}")

        except RateLimitError:
            if attempt == _MAX_RETRIES:
                raise HTTPException(status_code=429, detail="OpenAI rate limit exceeded — try again later.")
            await asyncio.sleep(_BASE_DELAY * (2 ** (attempt - 1)))

        except (APIConnectionError, APITimeoutError):
            if attempt == _MAX_RETRIES:
                raise HTTPException(status_code=503, detail="Could not reach OpenAI — check your network and try again.")
            await asyncio.sleep(_BASE_DELAY * (2 ** (attempt - 1)))
