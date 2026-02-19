import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter()

DATA_PATH = Path(__file__).parent.parent.parent / "data" / "articles.json"


def load_articles() -> list[dict]:
    with open(DATA_PATH) as f:
        return json.load(f)


def get_article_by_id(article_id: str) -> dict:
    article = next((a for a in load_articles() if a["id"] == article_id), None)
    if not article:
        raise HTTPException(status_code=404, detail=f"Article '{article_id}' not found")
    return article


@router.get("/articles")
async def list_articles() -> list[dict]:
    """Return all subjects for the dropdown — id, subject_name, subject_type only."""
    return [
        {
            "id": a["id"],
            "subject_name": a["subject_name"],
            "subject_type": a["subject_type"],
        }
        for a in load_articles()
    ]


@router.get("/articles/{article_id}")
async def get_article(article_id: str) -> dict:
    """Return a single article by id for form population."""
    return get_article_by_id(article_id)


@router.post("/analyse/{article_id}")
async def analyse_article(article_id: str) -> dict:
    article = get_article_by_id(article_id)

    # TODO: implement your analysis here
    # `article` is a dict with: id, subject_name, subject_type, title,
    #  source, author, published_date, content
    #
    # Use settings.openai_api_key and settings.openai_model from app/config/config.py
    # Return a dict — you decide the shape, just make sure your frontend can render it

    raise HTTPException(status_code=501, detail="Not implemented")
