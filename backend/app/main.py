import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.pipeline.orchestrator import AnalysisPipeline

DATA_PATH = Path(__file__).parent.parent / "data" / "articles.json"

app = FastAPI(
    title="Article Reputation Analyzer",
    description="FSE Technical Challenge — reputation analysis API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_articles() -> list[dict]:
    with open(DATA_PATH) as f:
        return json.load(f)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "service": "article-reputation-analyzer"}


@app.get("/articles")
async def list_articles() -> list[dict]:
    """Return all subjects for the dropdown — id, subject_name, subject_type only."""
    articles = load_articles()
    return [
        {
            "id": a["id"],
            "subject_name": a["subject_name"],
            "subject_type": a["subject_type"],
        }
        for a in articles
    ]


@app.get("/articles/{article_id}")
async def get_article(article_id: str) -> dict:
    """Return a single article by id for form population."""
    articles = load_articles()
    article = next((a for a in articles if a["id"] == article_id), None)
    if not article:
        raise HTTPException(status_code=404, detail=f"Article '{article_id}' not found")
    return article


@app.post("/analyse/{article_id}")
async def analyse_article(article_id: str) -> dict:
    """
    TODO: implement AnalysisPipeline.analyse() in app/pipeline/orchestrator.py

    This endpoint is wired up — it loads the article and passes it to your pipeline.
    You do not need to modify this file.
    """
    articles = load_articles()
    article = next((a for a in articles if a["id"] == article_id), None)
    if not article:
        raise HTTPException(status_code=404, detail=f"Article '{article_id}' not found")

    result = await AnalysisPipeline().analyse(article)
    return result
